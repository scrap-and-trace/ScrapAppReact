import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import ScrapbookContainer from "../components/ScrapbookContainer";

export default function SelectScrapbookScreen({ route, navigation }) {
  const { title, body, image, latitude, longitude } = route.params;
  const [scrapbooks, setScrapbooks] = React.useState([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);

  // Fetch the user's scrapbooks from the API.
  const fetchUser = async () => {
    const user = await AccountsAPI.getAccount();
    setScrapbooks(user.scrapbooks);
    setDataUpdated(true); // set dataUpdated to true
    console.log(title, body, image, longitude, latitude);
  };

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchUser();
  }, []);

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    fetchUser();
  }, []);

  // Because JSON does not support float values, we need to convert the latitude and longitude to JSON numbers.
  const convertToJSONNumber = (float) => {
    return Number(float.toFixed(6));
  };

  // Return a list of scrapbooks that the user can select from, and a button to create a new scrapbook at the bottom of the screen outside of the scrollview
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={scrapbooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ScrapbookContainer
              title={item.title}
              image={{ uri: "https://picsum.photos/700" }}
              body={item.body}
              username={item.username}
              onPress={() =>
                PageAPI.createPage(
                  title,
                  body,
                  item.id,
                  convertToJSONNumber(longitude),
                  convertToJSONNumber(latitude)
                ).then(() => {
                  navigation.navigate("Home");
                })
              }
            />
          )}
        />
      </ScrollView>
      <Button
        mode="contained"
        icon={"plus"}
        style={styles.createScrapbookButton}
        onPress={() => navigation.navigate("Create Scrapbook")}
      >
        Create a new scrapbook
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 42,
  },
  createScrapbookButton: {
    margin: 5,
    padding: 5,
    backgroundColor: "#e96b37",
  },
});
