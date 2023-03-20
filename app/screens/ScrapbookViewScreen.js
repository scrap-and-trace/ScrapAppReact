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
export default function ScrapbookViewScreen({ navigation, route }) {
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

  // Get the posts when the screen loads.
  React.useEffect(() => {
    getPosts();
    getAccountId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getPosts();
      getAccountId();
    }, [])
  );

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
        <Button
          mode="contained"
          style={styles.button}
          onPress={() =>
            AccountsAPI.followScrapbook(id, route.params.scrapbookId)
          }
        >
          Follow
        </Button>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostContainer
              title={item.title}
              body={item.body}
              image={item.image}
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
