import { ScrollView, Image, View, Text, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Results({ route, navigation }) {

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: route.params.prompt,
            type: "track"
        }
      }).then(data => {
        setTracks(data.data.tracks.items);
        console.log(data.data.tracks.items[0]);
      });
    });
  }, []);

  return <SafeAreaView>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    {
    tracks.map(track => (
      <View key={track.id}>
          {track.album.images.length ?
          <Image
            style={{width: '10%', height: '20%'}}
            source={{uri: track.album.images[0].url}}
          />
          : <Text>No Image</Text>}
          <Text>{track.name}</Text>
      </View>
    ))
    }
    </ScrollView>
  </SafeAreaView>
}
