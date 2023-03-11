import * as React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

/**
 * This component is used to display the comments for a post
 * Arguments for the component:
 * - author: the author of the comment
 * - comment: the comment
 * - image: profile image of the author
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */
export default function CommentsContainer({ author, comment, email, image }) {
  return (
    <View style={styles.container}>
      <View style={styles.authorAndImage}>
        <Image source={image} style={styles.image} />
        <Text style={styles.commentAuthor}>{author}</Text>
      </View>
      <View>
        <Text>{comment}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    borderRadius: Dimensions.get("window").width * 0.1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  commentAuthor: {
    fontWeight: "bold",
  },
  authorAndImage: {
    flexDirection: "row",
    flexWrap: "wrap",
    // make sure the author and image are on the same line
    alignItems: "center",
    marginBottom: 5,
  },
});
