import {
  ScrollView,
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Results({ route, navigation }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: route.params.prompt,
            type: "track",
          },
        })
        .then((data) => {
          setTracks(data.data.tracks.items);
        });
    });
  }, []);

  return (
    <SafeAreaView style={styles.phone}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.view}>
        {tracks.map((track) => (
          <View key={track.id} style={styles.trackContainer}>
            {track.album.images.length ? (
              <View style={styles.conatiner1}>
                <Image
                  // style={{ width: "10%", height: "20%" }}
                  style={styles.image}
                  source={{ uri: track.album.images[0].url }}
                />
              </View>
            ) : (
              <View style={styles.container1}>
                <Text>No Image</Text>
              </View>
            )}
            <View style={styles.container2}>
              <Text style={styles.text}>{track.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phone: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#222831",
    paddingHorizontal: 10,
  },
  text: {
    color: "#00FFF5",
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  container1: {
    height: "20%",
  },
  view: {
    marginLeft: 20,
  },
  trackContainer: {
    flexDirection: "row", // Arrange image and text in a row
    alignItems: "center", // Vertically center items
    marginVertical: 10, // Add margin for each track
  },
});
