/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { useSpotify } from "./SpotifyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globals from "../Globals";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Settings({ navigation }) {
  const { spotifyData, setSpotifyData } = useSpotify();

  const logout = () => {
    setSpotifyData({ token: "", photo: "", url: "" });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("SpotifyName");
    AsyncStorage.removeItem("SpotifyUrl");
    AsyncStorage.removeItem("SpotifyID");
    AsyncStorage.removeItem("SpotifyPhoto");
  };

  return (
    <SafeAreaView style={styles.container}>
      {spotifyData.photo && (
        <View style={styles.profile}>
          <Image style={styles.photo} source={{ uri: spotifyData.photo }} />
        </View>
      )}
      {spotifyData.token ? (
        <TouchableOpacity style={styles.option} onPress={logout}>
          <Text style={{ color: globals.colors.text.primary }}>Disconnect</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          navigation.navigate("History");
        }}
      >
        <View>
          <Text style={styles.text}>History</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phone: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: globals.colors.base.primary,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: globals.colors.base.primary,
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },

  spotifyButton: {
    backgroundColor: globals.colors.base.secondary,
    width: "50%",
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 10,
  },

  option: {
    display: "flex",
    flexDirection: "row", // Arrange image and text in a row
    justifyContent: "center",
    alignItems: "center", // Vertically center items
    marginVertical: 10, // Add margin for each track
    backgroundColor: globals.colors.base.secondary,
    borderRadius: 10,
    padding: 7,
    width: "50%",
    height: "7.5%",
    // marginLeft: 10,
    // marginRight: 10,
  },
  text: {
    color: globals.colors.text.primary,
    alignSelf: "center",
  },
  profile: {
    padding: "5%",
    marginTop: "15%",
    marginBottom: "10%",
  },
});
