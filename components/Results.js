import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import LottieView from "lottie-react-native";
import SafeAreaView from "react-native-safe-area-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import axios from "axios";
import uuid from "react-uuid";
import globals from "../Globals";

export default function Results({ route, navigation }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks([]);

    // Inital Llama2-chat connection
    const gradio = axios.create({
      baseURL: "https://huggingface-projects-llama-2-7b-chat.hf.space",
    });

    // Data sent to LLM server
    const payload = {
      data: [
        'Write an ordered list of songs in the format ["SONG NAME" (AUTHOR)] according to the prompt "' // Main prompt
        + route.params.prompt + '". Do not write descriptions or give additional commentary. Do not repeat songs.',
        null,
        '', // System prompt
        2048, // Max tokens for response
        0.1,
        0.05,
        1,
        1,
      ],
      fn_index: 11, // chat function index
      session_hash: uuid()
    }
    
    // Continually probe for finished response
    function predict(callback, lastoutput='') {
      gradio.post('/--replicas/gm5p8/api/predict/', payload).then(result => {
        if (result.data.is_generating){
          console.log(result.data.data[0]);
          predict(callback, result.data.data[0]);
        } else {
          callback(lastoutput);
        }
      });
    }

    // add a song to the list if it doesn't exist
    let songlist = [];
    function addSong(song) {
      let found = false;
      console.log(songlist.length);
      tracks.forEach((s) => {
        console.log(s.id);
        console.log(song.id);
        if (s.id == song.id) {
          found = true;
          console.log('boo');
          return;
        }
      });
      console.log(found);
      if (!found) {
        songlist.push(song);
        console.log("---------------");
        console.log(songlist);
        console.log('===============')
        if (tracks.length < songlist.length) {
          console.log('YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET')
          setTracks(songlist);
        }
      }
    }

    // Sent data to server and parse results
    predict(result => {
      const matches = result.match(/\".*?\".*?\(.*?\)/g);
      if (!matches) {
        const matches = result.match(/\".*?\" by .*?\n/g);
        if (!matches) {
          const matches = result.match(/.*?\s*\(.*?\)\n/g);
          var songs = matches.map(match => {
            const [, name, author] = /(.*?)\s*\((.*?)\)\n/g.exec(match) || '';
            return { name, author };
          }).filter(song => song.name && song.name !== 'SONG NAME');
        } else {
          var songs = matches.map(match => {
            const [, name, author] = /\"(.*?)\" by (.*?)\n/g.exec(match) || '';
            return { name, author };
          }).filter(song => song.name && song.name !== 'SONG NAME');
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
      songs.forEach(song => {
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
                  slice.artists[0].name
                    .toLowerCase()
                    .replaceAll(/\s|(the)/g, "") ===
                    song.author.toLowerCase().replaceAll(/\s|(the)/g, "")
                ) {
                  addSong(slice);
                  found = true;
                }
              });
              if (!found) {
                addSong(data.data.tracks.items[0]);
              }
            });
        });
      });
    });
  }, []);

  function makePlaylist() {
    AsyncStorage.getItem("token").then((token) => {
      AsyncStorage.getItem("SpotifyID").then((id) => {
        axios.post("https://api.spotify.com/v1/users/"+id+"/playlists", 
          {
            name: "SpotOn Generated Playlist",
            description: 'This playlist was generated with SpotOn using the prompt "' + route.params.prompt + '". Feel free to change the name and description to your liking!',
            public: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
        .then((data) => {
          axios.post("https://api.spotify.com/v1/playlists/"+data.data.id+"/tracks", 
            {
              uris: tracks.map((track) => track.uri),
              position: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
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
            <Text style={styles.text}>Say hello to your new playlist!</Text>
            <TouchableOpacity style={styles.spotifybutton} onPress={makePlaylist}>
              <Text style={{fontWeight: "bold"}}>Send to Spotify</Text>
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
              // style={styles.lottie}
              style={{
                width: 300,
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/lottie.json")}
              autoPlay
              loop
            />
            <Text style={styles.loadertext}>
              We are preparing your playlist
            </Text>
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
  text: {
    color: globals.colors.text.primary,
  },
  loadertext: {
    color: globals.colors.text.primary,
    alignSelf: "center",
  },
  text2: {
    color: globals.colors.text.secondary,
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
    marginTop: 20
  },
});
