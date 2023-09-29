import { Text, View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import React, { Component, useState } from "react";

export default function Home({ navigation }) {
  const [prompt, setPrompt] = useState("");
  return (
    <SafeAreaView style={styles.phone}>
      <View style={styles.parent}>
        <View styele={styles.child}>
          <Text style={styles.spoton}>SpotOn</Text>
          <View style={styles.formbg}>
            <TextInput
              style={styles.textinput}
              placeholder="What do you feel like listening to today?"
              placeholderTextColor="#00FFF5"
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
            />
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
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textinput: {
    width: "100%",
  },
});
