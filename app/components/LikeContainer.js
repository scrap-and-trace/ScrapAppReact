import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LikesAPI from "../api/LikesAPI";
import PageAPI from "../api/PageAPI";
import AccountsAPI from "../api/AccountsAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";

// Display the number of likes and a like button on the left side of the screen for the respective post
export default function LikeContainer({ post_id, user_id, likes }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [userId, setUserId] = useState(user_id);

  // When the user presses the like button, send a request to the API to like the post. Store the like ID in AsyncStorage and prevent the user from liking the post again.
  const like = () => {
    if (liked) {
      LikesAPI.deleteLike(userId, post_id).then(() => {
        setLiked(false);
        setLikeCount(likeCount - 1);
        AsyncStorage.removeItem(post_id);
      });
    } else {
      LikesAPI.createLike(userId, post_id).then((like) => {
        setLiked(true);
        setLikeCount(likeCount + 1);
        AsyncStorage.setItem(post_id, like.id.toString());
      });
    }
  };

  const share = () => {
    // Get the post's image URL from the API.
    PageAPI.getPage(post_id).then((page) => {
      // Share the image.
      Sharing.shareAsync(page.image);
    });
  };

  const getLikes = () => {
    LikesAPI.getLikesByPage(post_id).then((likes) => {
      setLikeCount(likes);
    });
  };

  // Fetch the user's account details from the API.
  const fetchAccountDetails = React.useCallback(() => {
    AccountsAPI.getAccount().then((account) => {
      setUserId(account.id);
    });
  }, []);

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchAccountDetails();
    getLikes();
  }, [fetchAccountDetails]);

  return (
    <View style={styles.container}>
      <Pressable onPress={like}>
        <MaterialIcons
          name={liked ? "favorite" : "favorite-border"}
          size={30}
          color={liked ? "red" : "black"}
        />
      </Pressable>
      <Text style={styles.likes}>{likeCount}</Text>
      {/* Add share button */}
      <Pressable onPress={share}>
        <MaterialIcons
          name="share"
          size={30}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  likes: {
    marginLeft: 5,
  },
});
