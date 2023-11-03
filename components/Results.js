import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import SafeAreaView from "react-native-safe-area-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import * as Linking from "expo-linking";
import axios from "axios";
import uuid from "react-uuid";
import globals from "../Globals";

export default function Results({ route, navigation }) {
  const animationRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [info, setInfo] = useState({
    name: "SpotOn Generated Playlist",
    description:
      'This playlist was generated with SpotOn using the prompt "' +
      route.params.prompt +
      '". Feel free to change the name and description to your liking!',
  });

  useEffect(() => {
    setTracks([]);

    // Inital Llama2-chat connection
    const gradio = axios.create({
      baseURL: "https://huggingface-projects-llama-2-7b-chat.hf.space",
    });

    // Continually probe for finished response
    function predict(payload, callback, lastoutput = "") {
      gradio.post("/--replicas/gm5p8/api/predict/", payload).then((result) => {
        if (result.data.is_generating) {
          console.log(result.data.data[0]);
          predict(payload, callback, result.data.data[0]);
        } else {
          callback(lastoutput);
        }
      });
    }

    // Data sent to LLM server
    const songPayload = {
      data: [
        'Write an ordered list of songs in the format ["SONG NAME" (AUTHOR)] according to the prompt "' + // Main prompt
          route.params.prompt +
          '". Do not write descriptions or give additional commentary. Do not repeat songs.' +
          " Use the full length name of the song, and ensure that the author is correct." +
          " Only supply the main author, do not include additional. Do not make up or imagine songs.",
        null,
        "", // System prompt
        2048, // Max tokens for response
        0.9, // Temperature
        0.05, // Top-P
        1, // Top-K
        1, // Repitition Penalty
      ],
      fn_index: 11, // chat function index
      session_hash: uuid(),
    };

    // Sent data to server and parse results
    predict(songPayload, (result) => {
      const matches = result.match(/\".*?\".*?\(.*?\)/g);
      if (!matches) {
        const matches = result.match(/\".*?\" by .*?\n/g);
        if (!matches) {
          const matches = result.match(/.*?\s*\(.*?\)\n/g);
          var songs = matches
            .map((match) => {
              const [, name, author] = /(.*?)\s*\((.*?)\)\n/g.exec(match) || "";
              return { name, author };
            })
            .filter((song) => song.name && song.name !== "SONG NAME");
        } else {
          var songs = matches
            .map((match) => {
              const [, name, author] =
                /\"(.*?)\" by (.*?)\n/g.exec(match) || "";
              return { name, author };
            })
            .filter((song) => song.name && song.name !== "SONG NAME");
        }
      } else {
        var songs = matches
          .map((match) => {
            const [, name, author] = /\"(.*?)\".*?\((.*?)\)/g.exec(match) || "";
            return { name, author };
          })
          .filter((song) => song.name && song.name !== "SONG NAME");
      }

      // Lookup each song on spotify
      songs.forEach((song) => {
        console.log(song.name);
        AsyncStorage.getItem("token").then((token) => {
          axios
            .get("https://api.spotify.com/v1/search", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                q: song.name,
                type: "track",
              },
            })
            .then((data) => {
              let found = false;
              data.data.tracks.items.forEach((slice) => {
                if (
                  !found &&
                  song.author
                    .toLowerCase()
                    .includes(
                      slice.artists[0].name
                        .toLowerCase()
                        .replaceAll(/the/g, "")
                        .split(" ")[0]
                    )
                ) {
                  setTracks((old) => {
                    let f = false;
                    old.forEach((s) => {
                      if (!f && s.id == slice.id) {
                        f = true;
                      }
                    });
                    if (f) {
                      return old;
                    }
                    return [...old, slice];
                  });
                  found = true;
                }
              });
              if (!found) {
                setTracks((old) => {
                  let f = false;
                  old.forEach((s) => {
                    if (!f && s.id == data.data.tracks.items[0].id) {
                      f = true;
                    }
                  });
                  if (f) {
                    return old;
                  }
                  return [...old, data.data.tracks.items[0]];
                });
              }
            });
        });
      });
    });

    // Data sent to LLM server
    const infoPayload = {
      data: [
        'Write a creatively accurate name and description for a playlist that was made according to the prompt "' + // Main prompt
          route.params.prompt +
          '". Please response in a JSON format, i.e. {"name": "[NAME]", description: "[DESCRIPTION]"}.' +
          " Do not give additional commentary besides the requested info. Limit the name to less than 7 words, and the" +
          ' description to less than 50. However, also ensure the description does not cut off, and is complete. Avoid using cheesy terms like "Jams" or "Vibes".',
        null,
        "", // System prompt
        1024, // Max tokens for response
        0.9, // Temperature
        0.05, // Top-P
        1, // Top-K
        1, // Repitition Penalty
      ],
      fn_index: 11, // chat function index
      session_hash: uuid(),
    };

    predict(infoPayload, (result) => {
      let out = JSON.parse("{" + result.split("{")[1].split("}")[0] + "}");
      if (out.name && out.description) {
        setInfo(out);
      }
    });
  }, []);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  function makePlaylist() {
    AsyncStorage.getItem("token").then((token) => {
      AsyncStorage.getItem("SpotifyID").then((id) => {
        axios
          .post(
            "https://api.spotify.com/v1/users/" + id + "/playlists",
            {
              name: info.name,
              description: info.description,
              public: false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((data) => {
            axios
              .post(
                "https://api.spotify.com/v1/playlists/" +
                  data.data.id +
                  "/tracks",
                {
                  uris: tracks.map((track) => track.uri),
                  position: 0,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((trackdata) => {
                Linking.openURL(data.data.external_urls.spotify);
              });
          });
      });
    });
  }

  return (
    <SafeAreaView style={styles.phone}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {tracks.length > 0 ? (
          <View style={styles.header}>
            <Text style={styles.maintext}>{info.name}</Text>
            <Text style={styles.desctext}>{info.description}</Text>
            <TouchableOpacity
              style={styles.spotifybutton}
              onPress={makePlaylist}
            >
              <Text style={{ fontWeight: "bold" }}>Send to Spotify</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <View key={track.id} style={styles.trackContainer}>
              {track.album.images.length ? (
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: track.album.images[0].url }}
                  />
                </View>
              ) : (
                <View>
                  <Text>No Image</Text>
                </View>
              )}
              <View style={styles.container2}>
                <Text style={styles.text}>{track.name}</Text>
                <Text style={styles.text2}>{track.artists[0].name}</Text>
                <Text style={styles.text2}>
                  {track.album.release_date.split("-")[0]}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.border}>
            <LottieView
              ref={animationRef}
              source={require("../assets/lottie.json")}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.loadertext}>
                Hold tight! Making your new playlist...
              </Text>
              <ActivityIndicator></ActivityIndicator>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phone: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: globals.colors.base.primary,
    paddingHorizontal: 5,
  },
  maintext: {
    color: globals.colors.text.primary,
    flex: 1,
    flexWrap: "wrap",
    fontSize: 20,
    marginBottom: 10,
  },
  desctext: {
    color: globals.colors.text.secondary,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
  text: {
    color: globals.colors.text.primary,
    flex: 1,
    flexWrap: "wrap",
  },
  loadertext: {
    color: globals.colors.text.primary,
    alignSelf: "center",
  },
  text2: {
    color: globals.colors.text.secondary,
    flex: 1,
    flexWrap: "wrap",
  },
  container2: {
    width: "75%",
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  trackContainer: {
    flexDirection: "row", // Arrange image and text in a row
    alignItems: "center", // Vertically center items
    marginVertical: 10, // Add margin for each track
    backgroundColor: globals.colors.base.secondary,
    borderRadius: 10,
    padding: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  group: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  border: {
    marginTop: "50%",
    width: "100%",
    alignItems: "center",
  },
  spotifybutton: {
    backgroundColor: globals.colors.base.accent,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 20,
  },
});
