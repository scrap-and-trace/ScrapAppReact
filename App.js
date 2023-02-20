import * as React from "react";
import { View, StyleSheet } from "react-native";
import NavBar from "./app/navigation/NavBar";

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
