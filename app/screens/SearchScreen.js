import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
