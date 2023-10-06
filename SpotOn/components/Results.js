import { ScrollView, Image, View, Text, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import axios from 'axios';

export default function Results({ route, navigation }) {

  const [artists, setArtists] = useState([]);

  AsyncStorage.getItem('token').then(token => {
    axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: route.params.prompt,
          type: "artist"
      }
    }).then(data => {
      setArtists(data.data.artists.items);
    });
  });

  return <SafeAreaView>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    {
    artists.map(artist => (
      <View key={artist.id}>
          {artist.images.length ?
          <Image
            style={{width: '10%', height: '20%'}}
            source={{uri: artist.images[0].url}}
          />
          : <Text>No Image</Text>}
          <Text>{artist.name}</Text>
      </View>
    ))
    }
    </ScrollView>
  </SafeAreaView>
}
