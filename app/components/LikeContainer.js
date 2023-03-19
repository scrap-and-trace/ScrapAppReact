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

export default function LikeContainer({liked, likes, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        {/* Change icon depending on how the like / unlike state from the PostViewScreen */}
        {liked === 0 ? (
          <MaterialIcons name="favorite-border" size={30} color="#000" />
        ) : (
          <MaterialIcons name="favorite" size={30} color="#000" />
        )}
      </Pressable>
      <Text style={styles.title}>{likes}</Text>
    </View>
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
