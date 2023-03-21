import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Clipboard,
} from "react-native";
import "react-native-clipboard/RNClipboard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PageAPI from "../api/PageAPI";
import AccountsAPI from "../api/AccountsAPI";
import * as Sharing from "expo-sharing";

// Display the number of likes and a like button on the left side of the screen for the respective post
export default function LikeContainer({ post_id, user_id, likes,Liked }) {
  const [likeCount, setLikeCount] = useState(likes);
  const [userId, setUserId] = useState(user_id);
  const [liked, setLiked] = useState(Liked);

  // When the user presses the like button, send a request to the API to like the post. Store the like ID in AsyncStorage and prevent the user from liking the post again.
  const like = () => {
    if(liked==true) {
      AccountsAPI.deleteLike(post_id).then(() => {
        setLiked(true);
        setLikeCount(likeCount - 1);
      });
    } else {
      AccountsAPI.createLike(user_id, post_id).then(() => {
        setLiked(false);
        setLikeCount(likeCount + 1);
      });
    }
  };

  //when a like is creAted it is sent away to the AIP, it is also updated locally
  const share = () => {
    // Get the post's image URL from the API.
    PageAPI.getPage(post_id).then((page) => {
      // Share the image.
      Clipboard.setString(
        "http://94.173.211.21:8000/page/?id=" + post_id.toString()
      );
    });
  };

  const getLikes = () => {
    AccountsAPI.getLikesByPage(post_id).then((likes) => {
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
  image: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    marginRight: 10,
    padding: 2,
  },
  imageRight: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    padding: 2,
    //position: "absolute",
    marginRight: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 10,
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
  share: {
    floar: "right",
    imageRight: 1000,
  },
});
