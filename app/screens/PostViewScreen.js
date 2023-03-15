
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  View,
  ToastAndroid,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PostContainer from "../components/PostContainer";
import PostAPI from "../api/PostAPI";
import CommentsAPI from "../api/CommentsAPI";
import AccountsAPI from "../api/AccountsAPI";
import CommentsContainer from "../components/CommentsContainer";
import { Button } from "react-native-paper";

// Allow for navigation to this screen from a nested stack navigator
export default function PostViewScreen({ route }) {
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const fetchPostAndComments = React.useCallback(() => {
    PostAPI.getPost(route.params.id).then((post) => {
      setPost(post);
    });
    CommentsAPI.getCommentsByPostId(route.params.id).then((comments) => {
      setComments(comments);
    });
  }, [route.params.id]);

  // Fetch the account details from the API.
  const fetchAccountDetails = React.useCallback(() => {
    AccountsAPI.getAccount().then((account) => {
      setUsername(account.username);
      setEmail(account.email);
    });
  }, []);

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPostAndComments();
    fetchAccountDetails();
    setRefreshing(false);
  }, [fetchPostAndComments]);

  // Show a loading indicator while the post and comments are being fetched.
  if (post === null) {
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
            username="Kieran Gordon"
            onPress={() => alert("Post Pressed")}
          />
        )}
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.commentBox}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
          />
          <Button
            icon={"plus"}
            style={styles.button}
            mode="contained"
            onPress={() => {
              // Get account details
              CommentsAPI.createComment({
                postId: route.params.id,
                name: username,
                email: email,
                body: comment,
              });
              setComment("");
              fetchPostAndComments();
              ToastAndroid.show("Comment Added", ToastAndroid.SHORT);
            }}
          >
            Add Comment
          </Button>
          {post &&
            comments.map((comment) => (
              <CommentsContainer
                key={comment.id}
                username={comment.name}
                comment={comment.body}
                email={comment.email}
                image={{
                  uri:
                    "https://picsum.photos/" +
                    (400 + Math.floor(Math.random() * 400)) +
                    "/" +
                    (400 + Math.floor(Math.random() * 400)),
                }}
              />
            ))}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
