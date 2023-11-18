import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";

import * as Linking from "expo-linking";
import SafeAreaView from "react-native-safe-area-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import React, { useState } from "react";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";

 origin/feature/eslint
import globals from "../Globals";

WebBrowser.maybeCompleteAuthSession();

export default function Home({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [token, setToken] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setURL] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  AsyncStorage.getItem("token").then((t) => {
    setToken(t);
    setModalVisible(!t);
  });

  AsyncStorage.getItem("SpotifyPhoto").then((p) => {
    setPhoto(p);
  });

  AsyncStorage.getItem("SpotifyUrl").then((u) => {
    setURL(u);
  });

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "8f0bb8f5fa3a43ceb0c4a669d403f1f1",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "playlist-modify-private",
      ],
      usePKCE: false,
      redirectUri: Linking.createURL(),
    },
    discovery,
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      setToken(response.params.access_token);
      AsyncStorage.setItem("token", response.params.access_token);
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${response.params.access_token}`,
          },
          params: {},
        })
        .then((data) => {
          AsyncStorage.setItem("SpotifyName", data.data.display_name);
          AsyncStorage.setItem("SpotifyUrl", data.data.external_urls.spotify);
          AsyncStorage.setItem("SpotifyID", data.data.id);
          AsyncStorage.setItem("SpotifyPhoto", data.data.images[0].url);
          setPhoto(data.data.images[0].url);
          setURL(data.data.external_urls.spotify);
        });
    }
  }, [response]);

  const logout = () => {
<<<<<<< HEAD
    setToken('');
    setPhoto('');
    setURL('');
=======
    setToken("");
    setPhoto("");
    setURL("");
>>>>>>> origin/feature/eslint
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("SpotifyName");
    AsyncStorage.removeItem("SpotifyUrl");
    AsyncStorage.removeItem("SpotifyID");
    AsyncStorage.removeItem("SpotifyPhoto");
  };

  return (
    <SafeAreaView style={styles.phone}>
      <View style={styles.parent}>
        <View styele={styles.child}>
          <Text style={styles.spoton}>SpotOn</Text>
          <View style={styles.smallparent}>
            <View style={styles.formbg}>
              <TextInput
                style={styles.textinput}
                placeholder="What do you feel like listening to today?"
                placeholderTextColor={globals.colors.text.secondary}
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.gobutton}
              onPress={() => {
                navigation.navigate("Results", { prompt });
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Go</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.smallparent}>
            <View>
              {!token ? (
                <TouchableOpacity
                  style={styles.spotifybutton}
                  onPress={() => {
                    promptAsync();
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Connect</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.spotifybutton} onPress={logout}>
                  <Text style={{ fontWeight: "bold" }}>Disconnect</Text>
                </TouchableOpacity>
              )}
            </View>
            {!photo ? (
              <></>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(url);
                }}
              >
                <Image style={styles.image} source={{ uri: photo }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {/* Modal for Spotify Connection */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Connect to Spotify to continue</Text>
            <TouchableOpacity
              style={styles.spotifybutton}
              onPress={() => {
                promptAsync();
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Connect to Spotify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  parent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  spoton: {
    fontWeight: "bold",
    fontSize: 40,
    color: globals.colors.text.primary,
    textAlign: "center",
    marginBottom: "5%",
  },
  formbg: {
    backgroundColor: globals.colors.base.secondary,
    borderColor: "grey",
    borderStyle: "solid",
    width: 300,
    height: 50,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textinput: {
    width: "100%",
    color: globals.colors.text.primary,
  },
  gobutton: {
    backgroundColor: globals.colors.base.accent,
    height: 50,
    width: 40,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
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
  },
  smallparent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sltext: {
    color: globals.colors.text.primary,
    textAlign: "center",
  },
  image: {
    height: 30,
    width: 30,
    marginLeft: 10,
    borderRadius: 25,
  },
  navbar: {
    backgroundColor: globals.colors.base.secondary,
  },

  // Modal stuff
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  spotifybutton: {
    backgroundColor: globals.colors.base.accent,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});
