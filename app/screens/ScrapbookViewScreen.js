import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import PostContainer from "../components/PostContainer";

// Display the posts from a scrapbook in a flat list. The user can get to this screen by tapping a scrapbook in the AccountViewScreen or OtherAccountViewScreen.
export default function ScrapbookViewScreen({ navigation, route }) {
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // When first loading the screen, fetch the posts from the API. Only show the posts from the scrapbook that was passed in as a parameter.
  React.useEffect(() => {
    PageAPI.getPages(route.params.scrapbookId).then((pages) => {
      setPosts(pages);
    });
  }, []);

  // When the screen is focused, fetch the posts from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PageAPI.getPages(route.params.scrapbookId).then((pages) => {
      setPosts(pages);
      setRefreshing(false);
    });
  }, []);

  // Show a loading indicator while the posts are being fetched.
  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#e96b37"
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
        {posts
          .map((post) => (
            // Sort by most recent post first.
            <PostContainer
              key={post.id}
              title={post.title}
              body={post.body}
              image={{
                uri:
                  "https://picsum.photos/" +
                  Math.floor(Math.random() * 1000) +
                  "/400",
              }}
              onPress={() => {
                navigation.navigate("Post View", {
                  postId: post.id,
                });
              }}
            />
          ))
          .reverse()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
