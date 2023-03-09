import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

/**
 * This component is used to display a notification in the NotificationsScreen.js
 * Arguments for the component:
 * - title: the title of the notification
 * - body: the body of the notification
 * - authorImage: the image of the author of the notification
 * - onPress: the function to call when the notification is pressed
 * - author: the author of the notification
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */
export default function NotificationContainer({
  title,
  body,
  authorImage,
  onPress,
  author,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={authorImage} style={styles.image} />
        <View>
          <Text style={styles.title}>
            {title} from {author}
          </Text>
          <Text>{body}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    borderRadius: Dimensions.get("window").width * 0.1,
    marginRight: 10,
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "bold",
  },
});
