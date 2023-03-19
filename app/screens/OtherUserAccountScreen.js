/*
 * This screen displays a list of scrapbooks belonging to the user, including the title, number of pages, and a thumbnail image.
 * The user should be able to tap a scrapbook to view it in more detail by navigating to the ScrapbookViewScreen.
 * The user should be able to create a new scrapbook by tapping the "Create Scrapbook" button.
 * The page should also display the user's profile picture and name. at the top of the page, including the option to edit the profile and sign out.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  LogBox,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import AccountDetailContainer from "../components/AccountDetailContainer";
import LoadingContainer from "../components/LoadingContainer";
import ScrapbookContainer from "../components/ScrapbookContainer";

const Tab = createMaterialTopTabNavigator();

export default function OtherUserAccountScreen({ route, navigation }) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [followedScrapbooks, setFollowedScrapbooks] = React.useState([]);
  const [scrapbooks, setScrapbooks] = React.useState([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);

  const fetchUser = async () => {
    const user = await AccountsAPI.getAccountById(route.params.id);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setScrapbooks(user.scrapbooks);
    setFollowedScrapbooks(user.following);
    setDataUpdated(true); // set dataUpdated to true
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    fetchUser();
  }, []);

  // While the data is being fetched, display a loading message.
  if (!dataUpdated) {
    return <LoadingContainer />;
  }

  return (
    <Tab.Navigator
      dataUpdated={dataUpdated}
      key={dataUpdated}
      tabBarOptions={{
        indicatorStyle: { backgroundColor: "#e96b37" },
      }}
    >
      <Tab.Screen name="Scrapbooks">
        {() => (
          <SafeAreaView style={styles.container}>
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }
            >
              <AccountDetailContainer
                navigation={navigation}
                username={username}
                first_name={first_name}
                last_name={last_name}
              />
              <View style={styles.scrapbookList}>
                <FlatList
                  data={scrapbooks}
                  renderItem={({ item }) => (
                    <ScrapbookContainer
                      title={item.title}
                      username={item.username}
                      onPress={() =>
                        navigation.navigate("Scrapbook View", {
                          scrapbookId: item.id,
                        })
                      }
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.grid}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Tab.Screen>
      <Tab.Screen name="Following">
        {() => (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
          >
            <View style={styles.container}>
              <FlatList
                data={followedScrapbooks}
                renderItem={({ item }) => (
                  <ScrapbookContainer
                    title={item.title}
                    username={item.username}
                    onPress={() =>
                      navigation.navigate("Scrapbook View", {
                        scrapbookId: item.id,
                      })
                    }
                  />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.grid}
              />
            </View>
          </ScrollView>
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
  },
  usernameAndImage: {
    flexDirection: "row",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
