import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./app/navigation/NavBar";
import Login from "./app/login/Login";
import Main from "./app/login/Main";
import Regis from "./app/login/Regis";
import AccountsAPI from "./app/api/AccountsAPI";
import { LogBox } from "react-native";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Check if the user is logged in when the app is first loaded.
  React.useEffect(() => {
    AccountsAPI.isLoggedIn().then((loggedIn) => {
      setLoggedIn(loggedIn);
    });
  }, []);

  // In actual production, we wouldn't actually do this, but we're doing this just for the expo so that its easier to fix something if anything goes wrong.
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  // Constantly check if the user is logged in.
  React.useEffect(() => {
    const interval = setInterval(() => {
      AccountsAPI.isLoggedIn().then((loggedIn) => {
        setLoggedIn(loggedIn);
      });
    }, 1000); // Wait 1 second before checking again.
    return () => clearInterval(interval);
  }, []);

  // If the user is logged in, show the main app. Otherwise, show the login screen.
  if (loggedIn) {
    return (
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Screen name="NavBar" component={NavBar} />
        </Navigator>
      </NavigationContainer>
    );
  }

  // If the user is not logged in, show the login screen.
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          initialRouteName: "Main",
        }}
      >
        <Screen name="Main" component={Main} />
        <Screen name="Login" component={Login} />
        <Screen name="Regis" component={Regis} />
      </Navigator>
    </NavigationContainer>
  );
}
