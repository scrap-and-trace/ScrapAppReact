/*
  This component is used to display a notification in the NotificationsScreen.js
  Arguments to the component:
    - title: the title of the notification
    - date: the date of the notification
    - body: the body of the notification
    - image: the image to display in the notification
    - onPress: the function to call when the notification is pressed
*/

import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

const NotificationContainer = ({ title, date, body, image, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Image source={image} style={styles.image} />
        <View style={styles.container}>
          <Text>{title}</Text>
          <Text>{date}</Text>
          <Text>{body}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 0,
    margin: 0,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
});

export default NotificationContainer;
