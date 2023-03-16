import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";

export default function ManageAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => AccountsAPI.logout()}>
        Logout
      </Button>
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
