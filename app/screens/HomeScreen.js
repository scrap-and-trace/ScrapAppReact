/*
 * This is the Home Screen of the App.
 * It displays a list of posts from the Scrap & Trace API.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import PostContainer from "../components/PostContainer";
import PostAPI from "../api/PostAPI";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PostAPI.getPosts().then((posts) => {
      setPosts(posts);
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    PostAPI.getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post) => {
          return (
            <PostContainer
              key={post.id}
              title={post.title}
              description={post.body}
              // get random image size from 400x400 to 800x800
              image={{
                uri:
                  "https://picsum.photos/" +
                  (400 + Math.floor(Math.random() * 400)) +
                  "/" +
                  (400 + Math.floor(Math.random() * 400)),
              }}
              author="Kieran Gordon"
              onPress={() => navigation.push("MapScreen")}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
