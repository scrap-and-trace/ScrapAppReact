import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import ScrapbookAPI from "../api/ScrapbookAPI";
import PostContainer from "../components/PostContainer";

// Display the posts from a scrapbook in a flat list. The user can get to this screen by tapping a scrapbook in the AccountViewScreen or OtherAccountViewScreen.
export default function ScrapbookViewScreen({ route, navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = React.useState("");

  // Match the page's scrapbook id to the scrapbook id in the route params. If the scrapbook id matches, then add the page to the posts array.
  const getPosts = async () => {
    const scrapbook = await ScrapbookAPI.getScrapbook(route.params.scrapbookId);
    const pages = await PageAPI.getPages(route.params.scrapbookId);
    const posts = [];
    pages.forEach((page) => {
      if (page.scrapbook === scrapbook.id) {
        posts.push(page);
      }
    });
    setPosts(posts);
  };

  // Get user id from account api
  const getAccountId = async () => {
    const account = await AccountsAPI.getAccount();
    setId(account.id);
  };

  // Check if the scrapbook is already being followed by the user. If it is, then disable the follow button.
  const isFollowing = async () => {
    const account = await AccountsAPI.getAccount();
    const scrapbook = await ScrapbookAPI.getScrapbook(route.params.scrapbookId);
    const following = await AccountsAPI.getFollowing(account.id);
    following.forEach((followedScrapbook) => {
      if (followedScrapbook.id === scrapbook.id) {
        console.log("following");
        return true;
      }
    });
    console.log("not following");
    return false;
  };

  // If the user owns the scrapbook, then disable the follow button.
  const isOwner = async () => {
    const account = await AccountsAPI.getAccount();
    const scrapbook = await ScrapbookAPI.getScrapbook(route.params.scrapbookId);
    if (account.id === scrapbook.author) {
      console.log("owner");
      return true;
    }
    console.log("not owner");
    return false;
  };

  // Get the posts when the screen loads.
  React.useEffect(() => {
    getPosts();
    getAccountId();
  }, []);

  // Get the posts when the user pulls down to refresh.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* If the user is the owner of the scrapbook, then disable the follow button. */}
        {/* Similarly, if the user is following the scrapbook, then show the unfollow button. */}
        {/* if isOwner is true, don't show anything, otherwise display a follow or unfollow button depending on the state */}
        {isOwner() === false ? (
          isFollowing() === false ? (
            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                const account = await AccountsAPI.getAccount();
                const scrapbook = await ScrapbookAPI.getScrapbook(
                  route.params.scrapbookId
                );
                await AccountsAPI.followScrapbook(account.id, scrapbook.id);
                await getPosts();
              }}
            >
              Follow
            </Button>
          ) : (
            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                const account = await AccountsAPI.getAccount();
                const scrapbook = await ScrapbookAPI.getScrapbook(
                  route.params.scrapbookId
                );
                await AccountsAPI.unfollowScrapbook(account.id, scrapbook.id);
                await getPosts();
              }}
            >
              Unfollow
            </Button>
          )
        ) : null}

        {/* Display the posts in a flat list. */}
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostContainer
              title={item.title}
              body={item.body}
              image={
                item.image_url
                  ? { uri: item.image_url }
                  : require("../assets/default_img.png")
              }
              date_created={item.date_created}
              onPress={() => {
                // Navigate to the page view screen.
                navigation.navigate("Post View", {
                  id: item.id,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    margin: 10,
    backgroundColor: "#e96b37",
  },
});
