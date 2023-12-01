// Settings.js
import { useSpotify } from "./SpotifyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <Text>Settings</Text>
      {spotifyData.photo && (
        <View style={styles.profile}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{ uri: spotifyData.photo }}
          />
        </View>
      )}
      {spotifyData.token ? (
        <TouchableOpacity style={styles.spotifyButton} onPress={logout}>
          <Text style={{ fontWeight: "bold" }}>Disconnect</Text>
        </TouchableOpacity>
      ) : null}
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
    justifyContent: "center",
    alignItems: "center",
  },
  spotifyButton: {
    backgroundColor: globals.colors.base.accent,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 10,
  },
});
