import React from "react";
import {
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
import LikesAPI from "../api/LikesAPI";
import CommentsContainer from "../components/CommentsContainer";
import LikeContainer from "../components/LikeContainer";
import PostContainer from "../components/PostContainer";
import LoadingContainer from "../components/LoadingContainer";

// Allow for navigation to this screen from a nested stack navigator
export default function PostViewScreen({ route, navigation }) {
  const [post, setPost] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);

  const fetchDetails = React.useCallback(() => {
    PageAPI.getPage(route.params.id).then((post) => {
      setPost(post);
    });
    PageAPI.getComments(route.params.id).then((comments) => {
      setComments(comments);
    });
    LikesAPI.getLikesByPage(route.params.id).then((likes) => {
      setLikes(likes);
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
    fetchDetails();
    fetchAccountDetails();
  }, [fetchDetails, fetchAccountDetails]);

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDetails();
    fetchAccountDetails();
    setRefreshing(false);
  }, [fetchDetails, fetchAccountDetails]);

  const handleLike = () => {
    // Allow user to like and unlike a post
    if (liked) {
      LikesAPI.deleteLike(id, post.id).then(() => {
        setLiked(false);
        fetchDetails();
      });
    }
    if (!liked) {
      LikesAPI.createLike(id, post.id).then(() => {
        setLiked(true);
        fetchDetails();
      });
    }
  };

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
            image={post.image}
          />
        )}
        <SafeAreaView style={styles.container}>
          <LikeContainer user_id={id} post_id={post.id} likes={likes} />
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
