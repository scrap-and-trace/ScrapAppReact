import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import PostContainer from "../components/PostContainer";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={() => alert("Post Pressed")}>
          <PostContainer
            title="Post Title"
            description="Post Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Post Author"
          />
        </Pressable>
        <Pressable onPress={() => alert("Post Pressed")}>
          <PostContainer
            title="Post Title"
            description="Post Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Post Author"
          />
        </Pressable>
        <Pressable onPress={() => alert("Post Pressed")}>
          <PostContainer
            title="Post Title"
            description="Post Description"
            image={{ uri: "https://picsum.photos/200/300" }}
            author="Post Author"
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
