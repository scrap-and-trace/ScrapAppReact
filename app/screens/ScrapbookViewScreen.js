import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { get } from "react-native-clipboard";
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
  const [scrapbookOwner, setScrapbookOwner] = React.useState("");
  const [following, setFollowing] = React.useState(false);

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
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });
  };

  // If the user owns the scrapbook, then disable the follow button.
  const isOwner = async () => {
    const account = await AccountsAPI.getAccount();
    const scrapbook = await ScrapbookAPI.getScrapbook(route.params.scrapbookId);
    if (account.id === scrapbook.author) {
      setScrapbookOwner(true);
    } else {
      setScrapbookOwner(false);
    }
  };

  // Get the posts when the screen loads.
  React.useEffect(() => {
    getPosts();
    getAccountId();
    isOwner();
    isFollowing();
  }, []);

  // Get the posts when the user pulls down to refresh.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    getAccountId();
    isOwner();
    isFollowing();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* If the user is the owner of the scrapbook, don't display any buttons. */}
        {/* If the user is not the owner of the scrapbook, display either:
        - The follow button if the user is not already following the scrapbook.
        - The unfollow button if the user is already following the scrapbook. */}
        {!scrapbookOwner ? (
          !following ? (
            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                await AccountsAPI.followScrapbook(id, route.params.scrapbookId);
                setFollowing(true);
              }}
            >
              Follow
            </Button>
          ) : (
            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                await AccountsAPI.unfollowScrapbook(route.params.scrapbookId);
                setFollowing(false);
              }}
            >
              Unfollow
            </Button>
          )
        ) : (
          // If the user is the owner of the scrapbook, display the edit button.
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              Alert.alert(
                "Delete Scrapbook",
                "Are you sure you want to delete this scrapbook?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    onPress: async () => {
                      await ScrapbookAPI.deleteScrapbook(
                        route.params.scrapbookId
                      );
                      navigation.navigate("Account");
                    },
                  },
                ]
              );
            }}
          >
            Delete Scrapbook
          </Button>
        )}

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
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#e96b37",
  },
});
