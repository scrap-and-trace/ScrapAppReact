import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Searchbar } from "react-native-paper";

const MapScreen = (props) => {
  const [region, setRegion] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

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

  // When the user presses the search button, we want to navigate to that location on the map
  React.useEffect(() => {
    if (searchQuery === "") return;
    (async () => {
      let location = await Location.geocodeAsync(searchQuery);
      setRegion({
        latitude: location[0].latitude,
        longitude: location[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [searchQuery]);

  if (region === null) return null;

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      <MapView
        style={styles.container}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
      />
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
