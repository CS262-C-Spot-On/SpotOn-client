import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import LottieView from "lottie-react-native";

import globals from "../Globals";

export default function SignUp({ navigation }) {
  const animationRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    // Check if the email is in the right format
    setIsLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Error: Please enter a valid email address");
      return;
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      alert("Error: Password must be at least 8 characters long");
      return;
    }

    // Create a user object with the entered data
    const user = {
      users_name: name,
      emailAddress: email,
      password,
    };

    try {
      // Send a POST request to your API endpoint

      const response = await fetch("https://spot-on.azurewebsites.net/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // User registration was successful
        navigation.navigate("LogIn"); // Redirect to the login screen
      } else {
        alert("Error: Registration failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error: Registration failed");
      setIsLoading(false);
    }
  };
  if (isLoading) {
    // Show only loader when loading
    return (
      <SafeAreaView style={styles.phone}>
        <View style={styles.c_parent}>
          {/* <ActivityIndicator></ActivityIndicator> */}
          <LottieView
            ref={animationRef}
            source={require("../assets/lottie.json")}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  }
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
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={styles.sufield}>
            <TouchableOpacity
              style={styles.subutton}
              onPress={() => {
                handleSignup(); // Corrected
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
              {/* <View>
                <Text style={styles.lgtext1}>Have an account? </Text>
              </View> */}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LogIn");
                  }}
                >
                  <Text style={styles.lgtext2}>Have an account? Login</Text>
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
  c_parent: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerbox: {
    width: "100%",
    height: "100%",
  },
  border: {
    marginTop: "50%",
    width: "100%",
    alignItems: "center",
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
    color: globals.colors.text.primary,
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
