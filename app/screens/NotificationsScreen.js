/*
 * This is the Notifications Screen of the App, it displays a list of notifications.
 * Heavily WIP.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import NotificationContainer from "../components/NotificationContainer";

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <NotificationContainer
          title="Notification Title"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl."
          authorImage={{ uri: "https://picsum.photos/200/300" }}
          onPress={() => alert("Notification Pressed")}
          author="Notification Author"
        />
        <NotificationContainer
          title="Notification Title"
          body="Test"
          authorImage={{ uri: "https://picsum.photos/200/300" }}
          onPress={() => alert("Notification Pressed")}
          author="Notification Author"
        />
        <NotificationContainer
          title="Notification Title"
          body="Test"
          authorImage={{ uri: "https://picsum.photos/200/300" }}
          onPress={() => alert("Notification Pressed")}
          author="Notification Author"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default NotificationsScreen;
