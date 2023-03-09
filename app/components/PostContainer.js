/*
 * This component is used to display a post
 * Arguments to the component:
 *   - title: the title of the post
 *   - description: the description of the post
 *   - image: the image to display in the post
 *   - author: the author of the post
 *   - onPress: the function to call when the post is pressed (usually to navigate to the post screen)
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const PostContainer = ({ title, description, image, author, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.postAuthor}>{author}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
  },
  postAuthor: {
    fontWeight: "bold",
    margin: 5,
    padding: 5,
  },
});

export default PostContainer;
