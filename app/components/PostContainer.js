import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

/**
 * This component is used to display a post
 * Arguments for the component:
 *   - title: the title of the post
 *   - description: the description of the post
 *   - image: the image to display in the post
 *   - author: the author of the post
 *   - onPress: the function to call when the post is pressed (usually to navigate to the post screen)
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */
export default function PostContainer({
  title,
  description,
  image,
  author,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>
          {title.length > 50 ? title.substring(0, 50) + "..." : title}
        </Text>
        <Text style={styles.description}>
          {description.length > 50
            ? description.substring(0, 50) + "..."
            : description}
        </Text>
        <Text style={styles.postAuthor}>{author}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 350,
    height: 350,
    resizeMode: "cover",
    // add some padding at the top to make the image look like a polaroid photo
    paddingTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },
  description: {
    // make the description text wrap
    flexWrap: "wrap",
    textAlign: "center",
  },
  postAuthor: {
    fontWeight: "bold",
    margin: 5,
    padding: 5,
  },
});
