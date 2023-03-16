import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import CommentsContainer from "../components/CommentsContainer";
import PostContainer from "../components/PostContainer";

// Allow for navigation to this screen from a nested stack navigator
export default function PostViewScreen({ route, navigation }) {
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");

  const fetchPostAndComments = React.useCallback(() => {
    PageAPI.getPage(route.params.id).then((post) => {
      setPost(post);
    });
    PageAPI.getComments(route.params.id).then((comments) => {
      setComments(comments);
    });
  }, [route.params.id]);

  // Fetch the user's account details from the API.
  const fetchAccountDetails = React.useCallback(() => {
    AccountsAPI.getAccount().then((account) => {
      setUsername(account.username);
      setEmail(account.email);
      setId(account.id);
    });
  }, []);

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchPostAndComments();
    fetchAccountDetails();
  }, [fetchPostAndComments, fetchAccountDetails]);

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPostAndComments();
    fetchAccountDetails();
    setRefreshing(false);
  }, [fetchPostAndComments, fetchAccountDetails]);

  // Show a loading indicator while the post and comments are being fetched.
  if (post === null) {
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
        {post && (
          <PostContainer
            title={post.title}
            body={post.body}
            image={{
              uri:
                "https://picsum.photos/" +
                (400 + Math.floor(Math.random() * 400)) +
                "/" +
                (400 + Math.floor(Math.random() * 400)),
            }}
            authorImage={{
              uri:
                "https://picsum.photos/" +
                (400 + Math.floor(Math.random() * 400)) +
                "/" +
                (400 + Math.floor(Math.random() * 400)),
            }}
            // Go to scrapbook containing the post
            onPress={() => {
              navigation.navigate("Scrapbook View", {
                id: post.id,
              });
            }}
          />
        )}
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.commentBox}
            placeholder="Add a comment..."
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <Button
            icon={"plus"}
            style={styles.button}
            mode="contained"
            onPress={() => {
              PageAPI.createComment(id, route.params.id, comment);
              ToastAndroid.show("Comment Added", ToastAndroid.SHORT);
              fetchPostAndComments();
              setComment("");
            }}
          >
            Add Comment
          </Button>
          {post &&
            comments
              .map((comment) => (
                <CommentsContainer
                  key={comment.id}
                  username={comment.author_username}
                  body={comment.body}
                  authorImage={{
                    uri:
                      "https://picsum.photos/" +
                      (400 + Math.floor(Math.random() * 400)) +
                      "/" +
                      (400 + Math.floor(Math.random() * 400)),
                  }}
                  onPress={() => {
                    navigation.navigate("User Account", {
                      id: comment.author_id,
                    });
                  }}
                />
              ))
              .reverse()}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  commentBox: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "#e96b37",
  },
});
