import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function LoadingContainer() {
  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#e96b37" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // align at bottom of container
    flexWrap: "wrap",
    textAlign: "center",
    textAlignVertical: "bottom",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    margin: 10,
  },
});
