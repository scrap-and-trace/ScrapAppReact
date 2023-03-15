/*
 * This component is used to display a user search result in the UserSearchScreen.js
 * Arguments for the component:
 * - first_name: the first name of the user
 * - last_name: the last name of the user
 * - username: the username of the user
 * - authorImage: the image of the author of the notification
 * - onPress: the function to call when the notification is pressed
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
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

export default function UserSearchContainer({
  first_name,
  last_name,
  username,
  authorImage,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.usernameAndImage}>
          <Image source={authorImage} style={styles.image} />
          <View>
            <Text style={styles.title}>{first_name + " " + last_name}</Text>
            <Text>@{username}</Text>
          </View>
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
    borderWidth: 1,
    borderColor: "grey",
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

  usernameAndImage: {
    flexDirection: "row",
    flexWrap: "wrap",
    // make sure the username and image are on the same line
    alignItems: "center",
    marginBottom: 5,
  },
});
