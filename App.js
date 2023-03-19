import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./app/navigation/NavBar";
import Login from "./app/login/Login";
import Main from "./app/login/Main";
import Regis from "./app/login/Regis";
import AccountsAPI from "./app/api/AccountsAPI";

const { Navigator, Screen } = createStackNavigator();

const isAuthenicated = () => {
  AccountsAPI.getIsAuthenticated()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        initialRouteName="Main"
        style={styles.container}
      >
        {/* Keep registration, login and main screen in a separate view so that user's cant access the main app without an account */}
        <Screen name="Main" component={Main} />
        <Screen name="Login" component={Login} />
        <Screen name="Regis" component={Regis} />

        {/* Main app view */}
        <Screen name="NavBar" component={NavBar} />
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
