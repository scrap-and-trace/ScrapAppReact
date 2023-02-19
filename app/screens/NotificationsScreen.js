import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import NotificationContainer from "../components/NotificationContainer";

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={() => alert("Notification Pressed")}>
          <NotificationContainer
            title="Notification Title"
            description="Notification Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Notification Author"
          />
        </Pressable>
        <Pressable onPress={() => alert("Notification Pressed")}>
          <NotificationContainer
            title="Notification Title"
            description="Notification Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Notification Author"
          />
        </Pressable>
        <Pressable onPress={() => alert("Notification Pressed")}>
          <NotificationContainer
            title="Notification Title"
            description="Notification Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Notification Author"
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
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
