/*
 * This file contains the code for the bottom navigation bar.
 * The navigation bar is used to navigate between the different screens in the app.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import MapScreen from "../screens/MapScreen";
import PostViewScreen from "../screens/PostViewScreen";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={styles.tabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={MapScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload an Image"
        component={PostScreen}
        options={{
          tabBarLabel: "New Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PostView"
        component={PostViewScreen}
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
