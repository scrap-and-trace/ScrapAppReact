/*
 * This screen displays a post and its comments.
 * The user should be able to add a comment to the post.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PostContainer from "../components/PostContainer";
import PostAPI from "../api/PostAPI";
import CommentsAPI from "../api/CommentsAPI";
import CommentsContainer from "../components/CommentsContainer";

export default function PostViewScreen({ navigation, route }) {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    PostAPI.getPost(route.params.id).then((post) => {
      setPost(post);
    });
    CommentsAPI.getCommentsByPostId(route.params.id).then((comments) => {
      setComments(comments);
    });
  }, []);

  // When the page is first loaded, fetch the post and comments from the API.
  useFocusEffect(
    React.useCallback(() => {
      PostAPI.getPost(route.params.id).then((post) => {
        setPost(post);
      });
      CommentsAPI.getCommentsByPostId(route.params.id).then((comments) => {
        setComments(comments);
      });
    }, [])
  );

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PostAPI.getPost(route.params.id).then((post) => {
      setPost(post);
      setRefreshing(false);
    });
    CommentsAPI.getCommentsByPostId(route.params.id).then((comments) => {
      setComments(comments);
      setRefreshing(false);
    });
  }, []);

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
            description={post.body}
            image={{
              uri:
                "https://picsum.photos/" +
                (400 + Math.floor(Math.random() * 400)) +
                "/" +
                (400 + Math.floor(Math.random() * 400)),
            }}
            author="Kieran Gordon"
            onPress={() => alert("Post Pressed")}
          />
        )}
        <SafeAreaView style={styles.container}>
          <TextInput style={styles.commentBox} placeholder="Add a comment..." />
          {post &&
            comments.map((comment) => (
              <CommentsContainer
                key={comment.id}
                author={comment.name}
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
});
