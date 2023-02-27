import * as React from "react";
import { View, StyleSheet} from "react-native";
import NavBar from "./app/navigation/NavBar";
import Login from "./app/login/Login";
import Main from "./app/login/Main";
import Regis from "./app/login/Regis";
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen} = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Navigator headerMode="none" initialRouteName='Main'>
          <Screen name='Login' component={Login}></Screen>
          <Screen name='Main' component={Main}></Screen>
          <Screen name='NavBar' component={NavBar} independent={true}></Screen>
          <Screen name='Regis' component={Regis}></Screen>
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
