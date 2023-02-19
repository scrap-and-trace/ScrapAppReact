import * as React from "react";
import { View, StyleSheet } from "react-native";
import NavBar from "./app/components/NavBar";

const App = () => {
  return (
    <View style={styles.container}>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
