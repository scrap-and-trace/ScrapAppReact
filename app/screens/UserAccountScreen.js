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
import AccountsAPI from "../api/AccountsAPI";
import AccountDetailContainer from "../components/AccountDetailContainer";
import ScrapbookContainer from "../components/ScrapbookContainer";
import LoadingContainer from "../components/LoadingContainer";

const Tab = createMaterialTopTabNavigator();

export default function UserAccountScreen({ navigation }) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [authorImage, setAuthorImage] = React.useState("");
  const [id, setId] = React.useState("");
  const [followedScrapbooks, setFollowedScrapbooks] = React.useState([]);
  const [scrapbooks, setScrapbooks] = React.useState([]);

  const fetchUser = async () => {
    const user = await AccountsAPI.getAccount();
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setId(user.id);
    setAuthorImage(user.image_url);
    setScrapbooks(user.scrapbooks);
  };

  const getFollowing = async () => {
    const user = await AccountsAPI.getFollowing(id);
    setFollowedScrapbooks(user);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
      getFollowing();
    }, [])
  );

  React.useEffect(() => {
    fetchUser();
    getFollowing();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchUser();
    getFollowing();
  }, []);

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // While the data is being fetched, display a loading indicator
  if (!scrapbooks) {
    return <LoadingContainer />;
  }

  return (
    // Add a tab navigator to the screen to switch between the user's scrapbooks and the scrapbooks they follow
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: "#e96b37" },
      }}
    >
      <Tab.Screen name="Scrapbooks">
        {() => (
          // Add a refresh control to the screen to allow the user to refresh the page
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
                authorImage={{ uri: authorImage }}
                id={id}
              />
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
                    title={item.scrapbook.title}
                    username={item.scrapbook.username}
                    onPress={() =>
                      navigation.navigate("Scrapbook View", {
                        scrapbookId: item.scrapbook.id,
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
});
