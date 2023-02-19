import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import AccountScreen from "../screens/AccountScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <NavigationContainer>
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
          name="Post"
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
          component={AccountScreen}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    tabBarShowLabel: false,
    tabBarActiveTintColor: "red",
    tabBarInactiveTintColor: "gray",
  },
});

export default NavBar;
