import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = (props) => {
  // GET https://jsonplaceholder.typicode.com/posts
  const [region, setRegion] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [fakeLocation, setFakeLocation] = React.useState(false);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

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
            title={post.title}
            description={post.body}
          />
        ))}
      </MapView>
    </View>
  );
};

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

export default MapScreen;
