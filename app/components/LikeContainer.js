/*
 * This component is used to display the likes on a page
 * It will display the curent number of likes that the page has
 * A Button that allows a user to add or remove their like fromthe page
 *
 *
 *
 */

//import * as React from "react";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const isLiked = true;
const likes = 10;

/* Comments for kieran
 * This container should be able to now be pluged into the api and should funcation correctly.
 * The constant likes is the number of like that the page has
 * Isliked should be true if the user has already liked the page
 * isLiked should be populated before the first if under this comment.
 * if you could implement the API I am more than happy to complete this section cause I really need to contribute to the project xD
 * We will get a list of users, we need to check if our user is on the list. if they are then set is liked to true, if not then break
 * take the list of users and the lnegue of that list will be the amount of likes
 *
 */

/*
if(isLiked == true){
    likes = likes -1;
}
*/
const copyToClipboard = () => {
  Clipboard.setString("hello world");
};

export default function LikeContainter({ onPress }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Pressable onPress={toggleLike}>
      <View style={styles.container}>
        <View style={styles.usernameAndImage}>
          <Image
            source={
              isLiked
                ? require("../assets/like_Full.png")
                : require("../assets/like_Empty.png")
            }
            style={styles.image}
          />
          <Text style={styles.text}>{isLiked ? likes + 1 : likes}</Text>
          <Image source={require("../assets/share.png")} style={styles.image} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 8,
    padding: 8,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
