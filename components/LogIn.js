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
                placeholderTextColor={globals.colors.text.secondary}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.formbg}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                placeholderTextColor={globals.colors.text.secondary}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={styles.loginfield}>
            <TouchableOpacity
              style={styles.loginbutton}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.logintext}>Log In</Text>
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
    backgroundColor: globals.colors.base.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  centerbox: {
    width: "100%",
    height: "100%",
  },
  appname: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  instagram: {
    fontWeight: "bold",
    fontSize: 40,
    color: globals.colors.text.primary,
  },
  sumessage: {
    height: "5%",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    color: globals.colors.text.secondary,
  },
  formfield: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  formbg: {
    backgroundColor: globals.colors.base.secondary,
    width: "75%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginfield: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginbutton: {
    marginTop: "25%",
    backgroundColor: globals.colors.base.accent,
    width: "75%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  logintext: {
    textAlign: "center",
    color: globals.colors.text.accent,
    fontWeight: "bold",
  },
  textinput: {
    color: globals.colors.text.primary
  },
});
