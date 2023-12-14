/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

// export default History
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globals from "../Globals";

export default function History({ navigation }) {
  const [prompts, setPrompts] = useState([]);

  const loadPromptsLocally = async () => {
    try {
      // Get prompts from AsyncStorage
      const promptsString = await AsyncStorage.getItem("prompts");
      const savedPrompts = promptsString ? JSON.parse(promptsString) : [];

      // Update the state with the loaded prompts
      setPrompts(savedPrompts);
    } catch (error) {
      console.error("Error loading prompts locally:", error);
    }
  };

  // Call loadPromptsLocally when the component mounts
  useEffect(() => {
    loadPromptsLocally();
  }, []);

  return (
    <SafeAreaView style={styles.phone}>
      <View style={styles.container}>
        <FlatList
          style={{width: "100%"}}
          data={prompts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.promptContainer}>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Results", item.prompt);
                  }}>
                  <Text style={styles.promptText}>{`"${item.prompt}"`}</Text>
                  <Text style={styles.dateText}>{item.prompt_date == null ? "Just Now" : item.prompt_date.split('T')[0]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  promptContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promptText: {
    fontSize: 16,
    color: globals.colors.text.primary
  },
  dateText: {
    fontSize: 14,
    color: globals.colors.text.secondary
  },
});
