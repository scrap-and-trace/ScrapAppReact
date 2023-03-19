import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import MapScreen from "../screens/MapScreen";
import UserSearchScreen from "../screens/UserSearchScreen";

const Tab = createMaterialTopTabNavigator();

// Change colour of the indicator on the tab navigator to orange
export default function SearchScreen({ route, navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: "#e96b37" },
      }}
    >
      <Tab.Screen name="Map">
        {() => <MapScreen navigation={navigation} route={route} />}
      </Tab.Screen>
      <Tab.Screen name="Users">
        {() => <UserSearchScreen navigation={navigation} route={route} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
