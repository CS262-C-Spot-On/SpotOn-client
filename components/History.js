// import { Text, View, SafeAreaView, StyleSheet } from "react-native";
// import React, { Component } from "react";
// import globals from "../Globals";

// export default function History() {
//   return (
//     <SafeAreaView style={styles.phone}>
//       <Text>History</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   phone: {
//     height: "100%",
//     width: "100%",
//     flex: 1,
//     backgroundColor: globals.colors.base.primary,
//   },
// });

// export default History
import { Text, View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globals from "../Globals";

export default function History() {
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
        <Text style={styles.title}>History</Text>
        <FlatList
          data={prompts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.promptContainer}>
              <View style={styles.row}>
                <Text style={styles.promptText}>{item.prompt}</Text>
                <Text style={styles.dateText}>{item.prompt_date}</Text>
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
    backgroundColor: "#fff",
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
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
});
