import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import PageAPI from "../api/PageAPI";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingContainer from "../components/LoadingContainer";
import WebView from "react-native-webview";

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
    return <LoadingContainer />;
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
        provider={PROVIDER_GOOGLE}
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
                  <View>
                    {/* If the user is using android, use a WebView, else use a regular image */}
                    {Platform.OS === "android" ? (
                      <WebView
                        style={styles.image}
                        // if image not found, show a placeholder image
                        source={{
                          uri: post.image_url
                            ? post.image_url
                            : require("../assets/default_img.png"),
                        }}
                      />
                    ) : (
                      <Image
                        style={styles.image}
                        // if image not found, show a placeholder image
                        source={
                          post.image_url
                            ? { uri: post.image_url }
                            : require("../assets/default_img.png")
                        }
                      />
                    )}
                  </View>
                  <Text style={styles.bubbleTitle}>
                    {post.title.substring(0, 20)}
                  </Text>
                  <Text style={styles.bubbleDescription}>
                    {post.body.substring(0, 50)}
                  </Text>
                  <Text style={styles.bubbleDate}>
                    {/* Convert date created to user's locale, without time */}
                    {new Date(post.date_created).toLocaleDateString()}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ) : null
        )}
      </MapView>
      {/* Add button at bottom left of the screen to allow users to refresh the view */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#e96b37" : "#fff",
          },
          styles.refreshButton,
        ]}
        onPress={() => {
          fetchPosts();
        }}
      >
        <MaterialIcons name="refresh" size={30} color="#e96b37" />
      </Pressable>
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
    width: Dimensions.get("window").width * 0.8,
  },
  bubbleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    marginTop: 5,
  },
  bubbleDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  bubbleDate: {
    fontSize: 12,
    textAlign: "center",
  },
  refreshButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 16,
    borderRadius: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: "center",
    resizeMode: "cover",
    padding: 10,
    margin: 10,
  },
});
