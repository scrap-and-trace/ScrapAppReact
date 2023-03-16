/*
 * This file contains the code for the bottom navigation bar.
 * The navigation bar is used to navigate between the different screens in the app.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CreateScrapbookScreen from "../screens/CreateScrapbookScreen";
import HomeScreen from "../screens/HomeScreen";
import ManageAccountScreen from "../screens/ManageAccountScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import OtherUserAccountScreen from "../screens/OtherUserAccountScreen";
import PostScreen from "../screens/PostScreen";
import PostViewScreen from "../screens/PostViewScreen";
import ScrapbookViewScreen from "../screens/ScrapbookViewScreen";
import SelectScrapbookScreen from "../screens/SelectScrapbookScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import SearchScreen from "./SearchScreen";
const Tab = createBottomTabNavigator();

export default function NavBar({ route, navigation }) {
  return (
    <Tab.Navigator screenOptions={styles.tabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload an Image"
        component={PostScreen}
        options={{
          tabBarLabel: "New Post",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-a-photo" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
          headerRight: () => (
            <MaterialIcons
              name="account-circle"
              color="black"
              size={30}
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("Manage Account")}
            />
          ),
        }}
      />
      {/* The following screens are used to pass data between screens. */}
      <Tab.Screen
        name="Post View"
        component={PostViewScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="User Account"
        component={OtherUserAccountScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Manage Account"
        component={ManageAccountScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Select Scrapbook"
        component={SelectScrapbookScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Scrapbook View"
        component={ScrapbookViewScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Create Scrapbook"
        component={CreateScrapbookScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    tabBarActiveTintColor: "#e96b37",
    tabBarInactiveTintColor: "gray",
  },
});
