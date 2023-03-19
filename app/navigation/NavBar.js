/*
 * This file contains the code for the bottom navigation bar.
 * The navigation bar is used to navigate between the different screens in the app.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post View" component={PostViewScreen} />
      <Stack.Screen name="Scrapbook View" component={ScrapbookViewScreen} />
      <Stack.Screen name="User Account" component={OtherUserAccountScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Post View" component={PostViewScreen} />
      <Stack.Screen name="User Account" component={OtherUserAccountScreen} />
      <Stack.Screen name="Scrapbook View" component={ScrapbookViewScreen} />
    </Stack.Navigator>
  );
}

function PostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Upload an Image" component={PostScreen} />
      <Stack.Screen name="Select Scrapbook" component={SelectScrapbookScreen} />
      <Stack.Screen name="Create Scrapbook" component={CreateScrapbookScreen} />
    </Stack.Navigator>
  );
}

function AccountStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={UserAccountScreen}
        options={{
          // add material icon button to header to allow user to modify account details
          headerRight: () => (
            <MaterialIcons
              name="account-circle"
              color="black"
              size={30}
              onPress={() => navigation.navigate("Manage Account")}
            />
          ),
        }}
      />
      <Stack.Screen name="Manage Account" component={ManageAccountScreen} />
      <Stack.Screen name="Scrapbook View" component={ScrapbookViewScreen} />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e96b37",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarLabel: "Post",
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
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
