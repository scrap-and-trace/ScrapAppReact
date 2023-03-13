/*
 * This screen displays a list of scrapbooks belonging to the user, including the title, number of pages, and a thumbnail image.
 * The user should be able to tap a scrapbook to view it in more detail by navigating to the ScrapbookViewScreen.
 * The user should be able to create a new scrapbook by tapping the "Create Scrapbook" button.
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
import ScrapbookAPI from "../api/ScrapbookAPI";
import AccountsAPI from "../api/AccountsAPI";

export default function UserAccountScreen() {
  const [scrapbook, setScrapbook] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.getAccount();
      console.log(user);
      setUsername(user.username);
      setTitle(user.title);
      setEmail(user.email);
    };
    fetchUser();
  }, []);

  // Fetch scrapbooks from API
  React.useEffect(() => {
    const fetchScrapbooks = async () => {
      const scrapbooks = await ScrapbookAPI.getScrapbooks();
      setScrapbook(scrapbooks);
    };
    fetchScrapbooks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.accountDetails}>
        {/* Use Account API to get user's first and last name + email */}
        <Text>{username}</Text>
        <Text>{email}</Text>
      </View>
      <FlatList
        data={scrapbook}
        // Reverse the order of the list
        renderItem={({ item }) => (
          <ScrapbookContainer
            title={item.title}
            image={{ uri: "https://picsum.photos/200/300" }}
            username={item.username}
            onPress={() => console.log("Scrapbook selected")}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  accountDetails: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
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
});
