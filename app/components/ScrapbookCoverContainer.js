/*
 * This component is used to display a scrapbook cover to be displayed on the home screen.
 * Arguments for the component:
 *  - title: the title of the scrapbook
 * - pages: the number of pages in the scrapbook
 * - image: the image to display in the scrapbook cover
 * - author: the author of the scrapbook
 * - onPress: the function to call when the scrapbook cover is pressed (usually to navigate to the scrapbook screen)
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

export default function ScrapbookCoverContainer({
  title,
  pages,
  image,
  author,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.pages}>{author}</Text>
        <Text style={styles.pages}>{pages} pages</Text>
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
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pages: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
