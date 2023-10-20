import {
  Text,
  View,
<<<<<<< HEAD
=======
  SafeAreaView,
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
<<<<<<< HEAD
import * as Linking from "expo-linking";
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import React, { useState } from "react";
import globals from "../Globals";

WebBrowser.maybeCompleteAuthSession();

export default function Home({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [token, setToken] = useState("");

  AsyncStorage.getItem("token").then((t) => {
    setToken(t);
  });

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "8f0bb8f5fa3a43ceb0c4a669d403f1f1",
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: Linking.createURL(),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      setToken(response.params.access_token);
      AsyncStorage.setItem("token", response.params.access_token);
    }
  }, [response]);

  const logout = () => {
    setToken("");
    AsyncStorage.removeItem("token");
  };

=======
import React, { useState } from "react";

export default function Home({ navigation }) {
  const [prompt, setPrompt] = useState("");
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
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
<<<<<<< HEAD
                placeholderTextColor={globals.colors.text.secondary}
=======
                placeholderTextColor="#00FFF5"
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.gobutton}
              onPress={() => {
<<<<<<< HEAD
                navigation.navigate("Results", { prompt: prompt });
              }}
            >
              <Text style={{fontWeight: "bold"}}>Go</Text>
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
                  <Text style={{fontWeight: "bold"}}>Connect</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.spotifybutton} onPress={logout}>
                  <Text style={{fontWeight: "bold"}}>Disconnect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
=======
                navigation.navigate("Results");
              }}
            >
              <Text>Go</Text>
            </TouchableOpacity>
          </View>
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  phone: {
    height: "100%",
    width: "100%",
    flex: 1,
<<<<<<< HEAD
    backgroundColor: globals.colors.base.primary,
=======
    backgroundColor: "#222831",
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
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
<<<<<<< HEAD
    color: globals.colors.text.primary,
=======
    color: "#00FFF5",
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
    textAlign: "center",
    marginBottom: "5%",
  },
  formbg: {
<<<<<<< HEAD
    backgroundColor: globals.colors.base.secondary,
=======
    backgroundColor: "#393E46",
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
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
<<<<<<< HEAD
    color: globals.colors.text.primary,
  },
  gobutton: {
    backgroundColor: globals.colors.base.accent,
=======
  },
  gobutton: {
    backgroundColor: "#00FFF5",
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
    height: 50,
    width: 40,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
<<<<<<< HEAD
  spotifybutton: {
    backgroundColor: globals.colors.base.accent,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },
  smallparent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sltext: {
    color: globals.colors.text.primary,
    textAlign: "center",
=======
  smallparent: {
    flexDirection: "row",
>>>>>>> 359684e65892a58094e62304bb4ceb837110a57e
  },
});
