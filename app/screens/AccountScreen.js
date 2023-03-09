import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
