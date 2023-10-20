import React, { Component, useState } from "react";
import globals from "../Globals";
import SafeAreaView from 'react-native-safe-area-view';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
                Sign up to create the best playlists from scratch
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
                placeholder="Name"
                placeholderTextColor={globals.colors.text.secondary}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
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
          <View style={styles.sufield}>
            <TouchableOpacity
              style={styles.subutton}
              onPress={() => {
                navigation.navigate("LogIn");
              }}
            >
              <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tcmessage}>
            <View>
              <Text style={styles.tc}>By signing up, you agree to our</Text>
              <Text style={styles.tc}>Terms, Data Policy and Cookies</Text>
              <Text style={styles.tc}>Policy.</Text>
            </View>
          </View>
          <View style={styles.logindiv}>
            <View style={styles.flexbox}>
              <View>
                <Text style={styles.lgtext1}>Have an account? </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LogIn");
                  }}
                >
                  <Text style={styles.lgtext2}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phone: {
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
    color: globals.colors.base.accent,
  },
  textinput: {
    color: globals.colors.text.primary
  },
  sumessage: {
    height: "5%",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    color: globals.colors.text.primary,
  },
  formfield: {
    backgroundColor: globals.colors.base.primary,
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  formbg: {
    backgroundColor: globals.colors.base.secondary,
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
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  subutton: {
    backgroundColor: globals.colors.base.accent,
    width: "75%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  signup: {
    textAlign: "center",
    color: globals.colors.base.primary,
    fontWeight: "bold",
  },
  tcmessage: {
    height: "10%",
    alignItems: "center",
  },

  tc: {
    color: globals.colors.text.secondary,
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
    backgroundColor: globals.colors.base.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  lgtext2: {
    color: globals.colors.text.primary,
  },
  lgtext1: {
    color: globals.colors.text.primary,
  },
});
