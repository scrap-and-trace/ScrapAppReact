import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import PostContainer from "../components/PostContainer";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PostContainer />
    </View>
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
