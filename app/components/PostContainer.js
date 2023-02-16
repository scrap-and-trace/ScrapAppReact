import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

const PostContainer = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200/300" }}
          />
          <Text>Post 1</Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200/300" }}
          />
          <Text>Post 2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  image: {
    width: 350,
    height: 350,
  },
});

export default PostContainer;
