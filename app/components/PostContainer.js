/*
  This component is used to display a post
  Arguments to the component:
    - title: the title of the post
    - description: the description of the post
    - image: the image to display in the post
    - author: the author of the post
*/

import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PostContainer = ({ title, description, image, author }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <Text>{author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default PostContainer;
