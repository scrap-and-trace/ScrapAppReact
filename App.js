import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./app/navigation/NavBar";
import Login from "./app/login/Login";
import Main from "./app/login/Main";
import Regis from "./app/login/Regis";
import CanvasScreen from "./app/screens/CanvasScreen";
import PostViewScreen from "./app/screens/PostViewScreen";

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        initialRouteName="Main"
        style={styles.container}
      >
        <Screen name="Login" component={Login}></Screen>
        <Screen name="Main" component={Main}></Screen>
        <Screen name="NavBar" component={NavBar} independent={true}></Screen>
        <Screen name="Regis" component={Regis}></Screen>
        <Screen name="PostView" component={PostViewScreen}></Screen>
        <Screen name="Canvas" component={CanvasScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
