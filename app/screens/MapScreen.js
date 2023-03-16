import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import PageAPI from "../api/PageAPI";

export default function MapScreen({ navigation }) {
  const [posts, setPosts] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch the posts from the API.
  const fetchPosts = () => {
    PageAPI.getPages().then((pages) => {
      setPosts(pages);
      console.log(pages);
    });
  };

  // Get the user's location.
  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    })();
  };

  // Call fetchPosts and getLocation when the component is mounted.
  React.useEffect(() => {
    fetchPosts();
    getLocation();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchPosts();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

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
  // Allow the user to refresh the posts by pulling down on the screen.
  if (region === null || isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#e96b37"
          style={styles.loading}
        />
      </View>
    );
  }

  // Return a tab navigator with the map and a screen to search for users.
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
      >
        {posts.map((post) =>
          post.latitude && post.longitude ? ( // Only show markers for posts with a location.
            <Marker
              key={post.id}
              coordinate={{
                latitude: parseFloat(post.latitude), // Convert the latitude and longitude to floats, as they are stored as decimals in the database.
                longitude: parseFloat(post.longitude), // Convert the latitude and longitude to floats, as they are stored as decimals in the database.
              }}
              title={post.title.substring(0, 20)}
              description={post.body.substring(0, 50)}
            >
              <Callout
                tooltip
                onPress={() => {
                  navigation.navigate("Post View", {
                    id: post.id,
                  });
                }}
              >
                <View style={styles.bubble}>
                  <Image
                    source={{ uri: post.image }}
                    style={styles.bubbleImage}
                  />
                  <Text style={styles.bubbleTitle}>
                    {post.title.substring(0, 20)}
                  </Text>
                  <Text style={styles.bubbleDescription}>
                    {post.body.substring(0, 50)}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ) : null
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
