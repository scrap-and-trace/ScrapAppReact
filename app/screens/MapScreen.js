import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import PostAPI from "../api/PostAPI";

export default function MapScreen({ navigation }) {
  const [posts, setPosts] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch the posts from the API.
  const fetchPosts = () => {
    PostAPI.getPosts().then((posts) => {
      setPosts(posts);
    });
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    })();
  };

  // Call fetchPosts when the screen is focused.
  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Get the user's location.
  React.useEffect(() => {
    getLocation();
  }, []);

  // When the user's location is available, set the region.
  React.useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsLoading(false);
    })();
  }, []);

  // If the region is null or isLoading is true, show a loading indicator.
  if (region === null || isLoading) {
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
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
      >
        {posts?.map(
          (
            post // If posts is null, don't render the markers.
          ) => (
            <Marker
              key={post.id}
              coordinate={{
                latitude: region.latitude + Math.random() / 100,
                longitude: region.longitude + Math.random() / 100,
              }}
              title={post.title.substring(0, 20)}
              description={post.body.substring(0, 50)}
            >
              <Callout
                tooltip
                onPress={() => {
                  navigation.navigate("PostView", { id: post.id });
                }}
              >
                <View style={styles.bubble}>
                  {/* display image above title and description */}
                  <Image
                    style={styles.bubbleImage}
                    source={{ uri: "https://picsum.photos/200/300" }}
                  />
                  <Text style={styles.bubbleTitle}>{post.title}</Text>
                  <Text style={styles.bubbleDescription}>
                    {post.body.substring(0, 50)}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 200,
  },
  bubbleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  bubbleDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  bubbleImage: {
    width: Dimensions.get("window").width * 0.8,
  },
  // display in the center of the screen
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
