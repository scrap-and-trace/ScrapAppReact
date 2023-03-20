/*
 * This is the Home Screen of the App.
 * It displays a list of posts from the Scrap & Trace API.
 * The user should be able to tap a post to view it in more detail by navigating to the ScrapbookViewScreen.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import PageAPI from "../api/PageAPI";
import PostContainer from "../components/PostContainer";
import { useFocusEffect } from "@react-navigation/native";
import LoadingContainer from "../components/LoadingContainer";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // When first loading the screen, fetch the posts from the API.
  React.useEffect(() => {
    PageAPI.getPages().then((pages) => {
      setPosts(pages);
    });
  }, []);

  // When the screen is focused, fetch the posts from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PageAPI.getPages().then((pages) => {
      setPosts(pages);
      setRefreshing(false);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      PageAPI.getPages().then((pages) => {
        setPosts(pages);
      });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // Show a loading indicator while the posts are being fetched.
  if (posts.length === 0) {
    return <LoadingContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts
          .map((post) => (
            // Sort by most recent post first.
            <PostContainer
              key={post.id}
              title={post.title}
              body={post.body}
              image={{ uri: "https://i.imgur.com/JGlBzqE.jpeg" }}
              // Navigate to post title screen when the post is tapped.
              onPress={() => navigation.navigate("Post View", { id: post.id })}
            />
          ))
          // Sort by most recent post first.
          .sort((a, b) => b.key - a.key)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
