/*
 * This component is used to display a post
 * Arguments for the component:
 *   - title: the title of the post
 *   - body: the body of the post
 *   - image: the image to display in the post
 *   - username: the username of the post
 *   - onPress: the function to call when the post is pressed (usually to navigate to the post screen)
 *
 * Username: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import * as React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostContainer({
  title,
  body,
  image,
  first_name,
  last_name,
  username,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>
          {title.length > 50 ? title.substring(0, 50) + "..." : title}
        </Text>
        <Text style={styles.body}>
          {body.length > 50 ? body.substring(0, 50) + "..." : body}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 30,
    resizeMode: "cover",
    margin: 5,
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    margin: 5,
    flexWrap: "wrap",
    textAlign: "center",
  },
  body: {
    flexWrap: "wrap",
    textAlign: "center",
  },
  postUsername: {
    fontWeight: "bold",
    margin: 5,
    padding: 5,
  },
});
