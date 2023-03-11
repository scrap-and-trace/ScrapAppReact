/*
 * This screen shows a map with markers for each post.
 * When the user taps a marker, they should be navigated to the PostViewScreen.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({ navigation }) {
  const [region, setRegion] = React.useState(null);
  const [posts, setPosts] = React.useState([]);

  // When first loading the screen, fetch the posts from the API.
  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
  };

  // Call fetchPosts when the screen is focused.
  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Get the user's location.
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // If the region is null, don't render the map.
  if (region === null) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
      >
        {posts.map((post) => (
          <Marker
            key={post.id}
            coordinate={{
              latitude: region.latitude + Math.random() / 100,
              longitude: region.longitude + Math.random() / 100,
            }}
            title={post.title.substring(0, 20)}
            description={post.body.substring(0, 50)}
            onPress={() => navigation.navigate("PostView", { id: post.id })}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
});
