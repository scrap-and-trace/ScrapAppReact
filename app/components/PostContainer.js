import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";

const GetCurrentDate = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  return date + "/" + month + "/" + year;
};

const PostContainer = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            This is a post
          </Text>
          <Text style={{ fontSize: 15, color: "grey" }}>
            Date: {GetCurrentDate()}
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            This is a post
          </Text>
          <Text style={{ fontSize: 15, color: "grey" }}>
            Date: {GetCurrentDate()}
          </Text>
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
    borderRadius: 10,
    // add shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
});

export default PostContainer;
