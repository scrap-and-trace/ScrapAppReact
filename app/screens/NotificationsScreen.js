import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import NotificationContainer from "../components/NotificationContainer";

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <NotificationContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationsScreen;
