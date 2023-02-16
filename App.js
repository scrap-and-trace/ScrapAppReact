import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Navbar from "./app/components/Navbar";

const App = () => {
  return (
    <View style={styles.container}>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
