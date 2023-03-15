/*
 * This screen displays a list of scrapbooks belonging to the user the user is viewing, including the title, number of pages, and a thumbnail image.
 * The user should be able to tap a scrapbook to view it in more detail by navigating to the ScrapbookViewScreen.
 * The page should also display the user's profile picture and name. at the top of the page, including the option to edit the profile and sign out.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import ScrapbookContainer from "../components/ScrapbookContainer";
import AccountDetailContainer from "../components/AccountDetailContainer";
import AccountsAPI from "../api/AccountsAPI";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function UserAccountScreen({ route }) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [followedScrapbooks, setFollowedScrapbooks] = React.useState([]);
  const [scrapbooks, setScrapbooks] = React.useState([]);

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.searchUsers(route.params.id);
      setFirstName(user[0].first_name);
      setLastName(user[0].last_name);
      setUsername(user[0].username);
      setEmail(user[0].email);
      setId(user[0].id);
      setScrapbooks(user[0].scrapbooks);
      setFollowedScrapbooks(user[0].following);
    };
    fetchUser();
  }, []);

  const onRefresh = React.useCallback(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.searchUsers(route.params.id);
      // Account for the fact that we are returning an array from the API
      setFirstName(user[0].first_name);
      setLastName(user[0].last_name);
      setUsername(user[0].username);
      setEmail(user[0].email);
      setId(user[0].id);
      setScrapbooks(user[0].scrapbooks);
      setFollowedScrapbooks(user[0].following);
    };
    fetchUser();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Scrapbooks">
        {() => (
          <SafeAreaView style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }
            >
              <View style={styles.container}>
                <AccountDetailContainer
                  first_name={first_name}
                  last_name={last_name}
                  username={username}
                  email={email}
                  id={id}
                />
              </View>
              <View style={styles.grid}>
                <FlatList
                  data={scrapbooks}
                  renderItem={({ item }) => (
                    <ScrapbookContainer
                      id={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      pages={item.pages}
                      navigation={route.params.navigation}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Tab.Screen>
      <Tab.Screen name="Followed">
        {() => (
          <SafeAreaView style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }
            >
              <View style={styles.grid}>
                <FlatList
                  data={followedScrapbooks}
                  renderItem={({ item }) => (
                    <ScrapbookContainer
                      id={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      pages={item.pages}
                      navigation={route.params.navigation}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  accountDetails: {
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  usernameAndImage: {
    flexDirection: "row",
    alignItems: "center",
  },
});
