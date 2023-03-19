import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import PageAPI from "../api/PageAPI";
import ScrapbookContainer from "../components/ScrapbookContainer";

export default function SelectScrapbookScreen({ route, navigation }) {
  const { title, body, image, imgBase64, latitude, longitude } = route.params;
  const [scrapbooks, setScrapbooks] = React.useState([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [imgBBreturnedUrl, setImgBBurl] = React.useState("");
  const imgBB = require("../json/imgbb-key.json").key;

  // Fetch the user's scrapbooks from the API.
  const fetchUser = async () => {
    const user = await AccountsAPI.getAccount();
    setScrapbooks(user.scrapbooks);
    setDataUpdated(true); // set dataUpdated to true
    console.log(title, body, image, imgBase64, latitude, longitude);
  };

  // When the page is focused, fetch the post and comments from the API.
  React.useEffect(() => {
    fetchUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  // When the user pulls down to refresh, fetch the post and comments from the API.
  const onRefresh = React.useCallback(() => {
    fetchUser();
  }, []);

  // Because JSON does not support float values, we need to convert the latitude and longitude to JSON numbers.
  const convertToJSONNumber = (float) => {
    return Number(float.toFixed(6));
  };

  // Because the backend currently does not support uploading images, we need to upload the image to imgBB and then use the returned url to create the post.
  // This might actually be a good thing, as it offloads the image hosting to imgBB, which is a lot better than hosting it on our own server.
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("image", imgBase64);
    data.append("key", imgBB);

    fetch("https://api.imgbb.com/1/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setImgBBurl(response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Return a list of scrapbooks that the user can select from, and a button to create a new scrapbook at the bottom of the screen outside of the scrollview
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={scrapbooks}
          renderItem={({ item }) => (
            <ScrapbookContainer
              title={item.title}
              body={item.body}
              username={item.username}
              onPress={() =>
                // Upload the image to imgBB then create the post with the returned url
                uploadImage(image).then(() =>
                  PageAPI.createPage(
                    title,
                    body,
                    item.id,
                    convertToJSONNumber(longitude),
                    convertToJSONNumber(latitude)
                  )
                    .then(() => {
                      ToastAndroid.show(
                        "Page created successfully!",
                        ToastAndroid.SHORT
                      );
                      navigation.navigate("Home");
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                )
              }
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.grid}
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
  grid: {
    flex: 1,
    flexDirection: "row",
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
