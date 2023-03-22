import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
  Pressable,
  Text,
  Alert,
  Clipboard,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import ScrapbookAPI from "../api/ScrapbookAPI";
import CommentsContainer from "../components/CommentsContainer";
import PostContainer from "../components/PostContainer";
import LoadingContainer from "../components/LoadingContainer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import Clipboard from "@react-native-community/clipboard";

// Allow for navigation to this screen from a nested stack navigator
export default function PostViewScreen({ route, navigation }) {
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = React.useState("");
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [scrapbookOwner, setScrapbookOwner] = React.useState("");

  const fetchDetails = React.useCallback(() => {
    PageAPI.getPage(route.params.id).then((post) => {
      setPost(post);
    });
    PageAPI.getComments(route.params.id).then((comments) => {
      setComments(comments);
    });
    PageAPI.getLikesByPage(route.params.id).then((likes) => {
      setLikes(likes);
    });
    PageAPI.getLikesByUser(route.params.id).then((liked_page) => {
      setLiked(liked_page);
    });
    AccountsAPI.getAccount().then((account) => {
      setId(account.id);
    });
    setLikes(likes);
  }, [route.params.id, likes]);

  // Add logic for liking a post and updating the like count, as well as unliking a post and updating the like count
  const like = React.useCallback(() => {
    if (!liked) {
      PageAPI.createLike(id, route.params.id);
      setLiked(true);
      setLikes(likes + 1);
    } else {
      PageAPI.deleteLike(route.params.id);
      setLiked(false);
      setLikes(likes - 1);
    }
  }, [id, liked, route.params.id, fetchDetails]);

  // Allow users to share a post by copying the link to the post to the clipboard.
  const share = React.useCallback(() => {
    Clipboard.setString(
      "http://94.173.211.21:8000/page/" + route.params.id 
    );

    ToastAndroid.show("Link copied to clipboard", ToastAndroid.SHORT);
  }, [route.params.id]);

  // If the scrapbook id matches a scrapbook owned by the user, allow the user to delete the post.
  const deletePost = React.useCallback(() => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            PageAPI.deletePage(route.params.id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }, [route.params.id, navigation]);

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDetails();
    setRefreshing(false);
  }, [fetchDetails]);

  // Show a loading indicator while the post and comments are being fetched.
  if (post === null) {
    return <LoadingContainer />;
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
            image={
              post.image_url
                ? { uri: post.image_url }
                : require("../assets/default_img.png")
            }
            date_created={post.date_created}
          />
        )}
        <SafeAreaView style={styles.container}>
          <View style={styles.likeContainer}>
            <Pressable onPress={like}>
              {/* if liked_page with id exists, show filled heart, else show empty heart */}
              {liked ? (
                <MaterialIcons
                  name="favorite"
                  size={30}
                  color="red"
                  style={{ marginLeft: 10 }}
                />
              ) : (
                <MaterialIcons
                  name="favorite-border"
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              )}
            </Pressable>
            <Text style={styles.likes}>{likes}</Text>
            <Pressable onPress={share}>
              <MaterialIcons
                name="share"
                size={30}
                color="black"
                style={{ marginLeft: 10 }}
              />
            </Pressable>
            {/* If post belongs to user, display delete button */}
            <Pressable
              onPress={() => {
                deletePost();
              }}
            >
              <MaterialIcons
                name="delete"
                size={30}
                color="black"
                // display on right side of screen
                style={{ marginLeft: 10 }}
              />
            </Pressable>
          </View>
          {/* add button to text field to submit commment */}
          <TextInput
            style={styles.commentBox}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            onSubmitEditing={() => {
              PageAPI.createComment(id, route.params.id, comment);
              ToastAndroid.show("Comment Added", ToastAndroid.SHORT);
              fetchDetails();
              setComment("");
            }}
          />
          <Button
            icon={"plus"}
            style={styles.button}
            mode="contained"
            onPress={() => {
              PageAPI.createComment(id, route.params.id, comment);
              ToastAndroid.show("Comment Added", ToastAndroid.SHORT);
              fetchDetails();
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
                    uri: comment.image_url,
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
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  likes: {
    marginLeft: 5,
  },
  like: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 5,
  },
});
