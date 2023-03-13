/*
 * This screen is used to select a scrapbook to post to from the post screen.
 * The user can select a scrapbook from a list of scrapbooks.
 * The user can also create a new scrapbook from this screen.
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
  FlatList,
} from "react-native";
import ScrapbookAPI from "../api/ScrapbookAPI";
import ScrapbookSelectContainer from "../components/ScrapbookSelectContainer";
import { useNavigation } from "@react-navigation/native";

export default function ScrapbookSelectContainer({ navigation }) {
  return (
    <FlatList
      data={ScrapbookAPI.getScrapbooks()}
      renderItem={({ item }) => (
        <ScrapbookSelectContainer
          title={item.title}
          pages={item.pages}
          image={item.image}
          author={item.author}
          onPress={() => navigation.navigate("Scrapbook", { item })}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
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
