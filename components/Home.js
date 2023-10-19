import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import React, { useState } from "react";
import Slider from "react-native-slider";

WebBrowser.maybeCompleteAuthSession();

export default function Home({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [token, setToken] = useState("");
  const [sliderValue, setSliderValue] = useState(20);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

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
      // console.log(response.params.access_token);
      AsyncStorage.setItem("token", response.params.access_token);
    }
  }, [response]);

  const logout = () => {
    setToken("");
    AsyncStorage.removeItem("token");
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
                placeholderTextColor="#00FFF5"
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.gobutton}
              onPress={() => {
                navigation.navigate("Results", { prompt: prompt });
              }}
            >
              <Text>Go</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Slider
              style={styles.slider}
              value={sliderValue}
              onValueChange={handleSliderChange}
              minimumValue={1}
              maximumValue={1000}
              step={1}
              minimumTrackTintColor="#00ADB5"
              maximumTrackTintColor="gray"
              thumbTintColor="#00FFF5"
            />
            <Text style={styles.sltext}>Duration: {sliderValue}</Text>
            <View style={styles.smallparent}>
              {!token ? (
                <TouchableOpacity
                  style={styles.logbutton}
                  onPress={() => {
                    promptAsync();
                  }}
                >
                  <Text>Connect</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.logbutton} onPress={logout}>
                  <Text>Disconnect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
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
    backgroundColor: "#222831",
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
    color: "#00FFF5",
    textAlign: "center",
    marginBottom: "5%",
  },
  formbg: {
    backgroundColor: "#393E46",
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
  },
  gobutton: {
    backgroundColor: "#00FFF5",
    height: 50,
    width: 40,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logbutton: {
    backgroundColor: "#00FFF5",
    height: 30,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallparent: {
    flexDirection: "row",
  },
  sltext: {
    color: "#00FFF5",
    textAlign: "center",
  },
});
