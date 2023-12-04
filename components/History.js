import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import React, { Component } from "react";
import globals from "../Globals";

export default function History() {
  return (
    <SafeAreaView style={styles.phone}>
      <Text>History</Text>
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
});

// export default History
