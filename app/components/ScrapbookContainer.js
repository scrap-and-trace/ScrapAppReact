/*
 * This component is used to display a list of scrapbooks and their details, including the number of posts in the scrapbook and a thumbnail of the most recent post.
 * User should be able to search for individual scrapbooks.
 * Scrapbooks should be displayed in a grid format.
 * The scrapbooks themselves should be brown, contain the name of the scrapbook, the number of posts in the scrapbook and a thumbnail of the most recent post.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  Dimensions,
} from "react-native";

export default function ScrapbookContainer({
  title,
  image,
  username,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.author}>{username}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2 - 10,
    height: Dimensions.get("window").width / 2 - 10,
    backgroundColor: "#8B4513",
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 10,
    position: "absolute",
    width: "85%",
    height: "85%",
  },
  name: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  pages: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
