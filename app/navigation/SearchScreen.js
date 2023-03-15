import React from "react";
import MapScreen from "../screens/MapScreen";
import UserSearchScreen from "../screens/UserSearchScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen({ route, navigation }) {
  return (
    // Add a tab navigator to the screen to switch between the map and the user search
    // Allow for the map marker to be pressed to switch to the post view screen
    <Tab.Navigator>
      <Tab.Screen name="Map">
        {() => <MapScreen navigation={navigation} route={route} />}
      </Tab.Screen>
      <Tab.Screen name="Users">
        {() => <UserSearchScreen navigation={navigation} route={route} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
