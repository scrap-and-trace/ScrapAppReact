/*
 * This screen is used to view a scrapbook and its contents.
 * Each scrapbook should contain a list of posts.
 * Each post should contain a title, a body, an image.
 * The scrapbook should also have a comment section which anyone can comment on.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 *
 */

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
import ScrapbookAPI from "../api/ScrapbookAPI";
import CommentsAPI from "../api/CommentsAPI";
import CommentsContainer from "../components/CommentsContainer";
import { Button } from "react-native-paper";

export default function ScrapbookViewScreen({ route }) {
  const [scrapbook, setScrapbook] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchScrapbookAndComments = React.useCallback(() => {
    ScrapbookAPI.getScrapbook(route.params.id).then((scrapbook) => {
      setScrapbook(scrapbook);
    });
    CommentsAPI.getCommentsByScrapbookId(route.params.id).then((comments) => {
      setComments(comments);
    });
  }, [route.params.id]);

  // When the page is focused, fetch the scrapbook and comments from the API.
  React.useEffect(() => {
    fetchScrapbookAndComments();
  }, [fetchScrapbookAndComments]);

  // When the user pulls down to refresh, fetch the scrapbook and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchScrapbookAndComments();
    setRefreshing(false);
  }, [fetchScrapbookAndComments]);

  // Show a loading indicator while the scrapbook and comments are being fetched.
  if (scrapbook === null) {
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
        <View style={styles.posts}>
          {/* Create a list of pages from the PostAPI */}
          {scrapbook.pages.map((page) => (
            <PostContainer
              key={page.id}
              id={page.id}
              title={page.title}
              body={page.body}
              image={page.image}
            />
          ))}
        </View>
        <View style={styles.comments}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <View style={styles.commentsContainer}>
            {comments.map((comment) => (
              <CommentsContainer
                key={comment.id}
                id={comment.id}
                author={comment.author}
                body={comment.body}
              />
            ))}
          </View>
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder="Comment"
            />
            <Button
              mode="contained"
              onPress={() => {
                CommentsAPI.createComment(scrapbook.id, comment).then(() => {
                  ToastAndroid.show("Comment created", ToastAndroid.SHORT);
                  setComment("");
                  fetchScrapbookAndComments();
                });
              }}
            >
              Comment
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
