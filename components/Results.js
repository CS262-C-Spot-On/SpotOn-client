<<<<<<< HEAD
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from 'react-uuid';
import globals from "../Globals";

export default function Results({ route, navigation }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks([]);

    const gradio = axios.create({
      baseURL: 'https://huggingface-projects-llama-2-7b-chat.hf.space',
    });

    const payload = {
      data: [
        'Write an ordered list of songs in the format ["SONG NAME" (AUTHOR)] according to the prompt "' + route.params.prompt + '". Do not write descriptions or give additional commentary.',
        null,
        '',
        1024,
        0.1,
        0.05,
        1,
        1
      ],
      fn_index: 11, // chat
      session_hash: uuid()
    }
  
    function predict(callback, lastoutput='') {
      gradio.post('/--replicas/68mtz/api/predict/', payload).then(result => {
        if (result.data.is_generating){
          console.log(result.data.data[0]);
          predict(callback, result.data.data[0]);
        } else {
          callback(lastoutput);
        }
      });
    }

    predict(result => {
      const matches = result.match(/\".*?\".*?\(.*?\)/g);
      if (!matches) {
        const matches = result.match(/\".*?\" by .*?\n/g);
        var songs = matches.map(match => {
          const [, name, author] = /\"(.*?)\" by (.*?)\n/g.exec(match) || '';
          return { name, author };
        }).filter(song => song.name && song.name !== 'SONG NAME');
      } else {
        var songs = matches.map(match => {
          const [, name, author] = /\"(.*?)\".*?\((.*?)\)/g.exec(match) || '';
          return { name, author };
        }).filter(song => song.name && song.name !== 'SONG NAME');
      }

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
              data.data.tracks.items.forEach(slice => {
                if (!found && slice.artists[0].name.toLowerCase().replaceAll(/\s|(the)/g,'') === song.author.toLowerCase().replaceAll(/\s|(the)/g,''))
                {
                  setTracks(old => [...old, slice]);
                  found = true;
                }
              })
              if (!found){
                setTracks(old => [...old, data.data.tracks.items[0]]);
              }
            });
        });
      });
    });
    
  }, []);

  return (
    <SafeAreaView style={styles.phone}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {
          tracks.length > 0 ?
          <View style={styles.header}>
            <Text style={styles.text}>Say hello to your new playlist!</Text>
          </View> : null
        }
        {
          tracks.length > 0 ?
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
                <Text style={styles.text}>{track.artists[0].name}</Text>
                <Text style={styles.text}>{track.album.release_date.split('-')[0]}</Text>
              </View>
            </View>
          ))
          :
          <View style={styles.center}>
            <View style={styles.group}>
              <Text style={styles.text}>Wait here just a sec!</Text>
              <Text style={styles.text}>We're making your really awesome playlist now!</Text>
            </View>
          </View>
        }
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
    marginBottom: 25,
    marginTop: 50
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
    flexDirection: "row",
    alignItems: "center",
  },
  group: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  }
});
=======
import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function Results({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Results</Text>
    </SafeAreaView>
  );
}
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
