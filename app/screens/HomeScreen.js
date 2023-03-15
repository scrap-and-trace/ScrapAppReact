/*
 * This is the Home Screen of the App.
 * It displays a list of posts from the Scrap & Trace API.
 * The user should be able to tap a post to view it in more detail by navigating to the ScrapbookViewScreen.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
} from "react-native";
import PostContainer from "../components/PostContainer";
import PostAPI from "../api/PostAPI";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // When first loading the screen, fetch the posts from the API.
  React.useEffect(() => {
    PostAPI.getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  // When the screen is focused, fetch the posts from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PostAPI.getPosts().then((posts) => {
      setPosts(posts);
      setRefreshing(false);
    });
  }, []);

  // Show a loading indicator while the posts are being fetched.
  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post) => (
          <PostContainer
            key={post.id}
            title={post.title}
            body={post.body}
            image={{
              uri:
                "https://picsum.photos/" +
                (400 + Math.floor(Math.random() * 400)) +
                "/" +
                (400 + Math.floor(Math.random() * 400)),
            }}
            author="Kieran Gordon"
            // Navigate to post title screen when the post is tapped.
            onPress={() => navigation.navigate("Post View", { id: post.id })}
          />
        ))}
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
