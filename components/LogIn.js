import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.phone}>
      <View style={styles.container}>
        <View style={styles.centerbox}>
          <View style={styles.appname}>
            <View>
              <Text style={styles.instagram}>SpotOn</Text>
            </View>
          </View>
          <View style={styles.sumessage}>
            <View>
              <Text style={styles.message}>
                Log in to create the best playlists from scratch
              </Text>
              {/* <Text style={styles.message}>
              the best playlsits from scratch
            </Text> */}
            </View>
          </View>
          <View style={styles.formfield}>
            <View style={styles.formbg}>
              <TextInput
                style={styles.textinput}
                placeholder="Email"
                placeholderTextColor="#00FFF5"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.formbg}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                placeholderTextColor="#00FFF5"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={styles.sufield}>
            <TouchableOpacity
              style={styles.subutton}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.signup}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phone: {
    height: "100%",
    flex: 1,
    backgroundColor: "#222831",
  },
  container: {
    flex: 1,
    //backgroundColor: "dodgerblue",
    //justifyContent: "center",
    alignItems: "center",
  },
  centerbox: {
    //backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  appname: {
    width: "100%",
    height: "15%",
    //backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  instagram: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#00FFF5",
  },
  sumessage: {
    //backgroundColor: "pink",
    height: "5%",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#00ADB5",
  },
  formfield: {
    backgroundColor: "#222831",
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  formbg: {
    backgroundColor: "#393E46",
    borderColor: "grey",
    borderStyle: "solid",
    width: "75%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sufield: {
    //backgroundColor: "pink",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  subutton: {
    marginTop: "25%",
    backgroundColor: "#00FFF5",
    width: "75%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  signup: {
    textAlign: "center",
    color: "#222831",
    fontWeight: "bold",
  },
  tcmessage: {
    //backgroundColor: "orange",
    height: "10%",
    alignItems: "center",
  },

  tc: {
    color: "#00ADB5",
    textAlign: "center",
  },
  logindiv: {
    backgroundColor: "white",
    height: "10%",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  flexbox: {
    flex: 1,
    backgroundColor: "#222831",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  lgtext2: {
    color: "#00FFF5",
  },
  lgtext1: {
    color: "#00ADB5",
  },
});
