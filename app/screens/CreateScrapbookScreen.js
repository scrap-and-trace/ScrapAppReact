import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import Checkbox from "expo-checkbox";
import ScrapbookAPI from "../api/ScrapbookAPI";

export default function CreateScrapbookScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [friendsOnly, setFriendsOnly] = React.useState(false);
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  // Fetch the user's account details from the API.
  const fetchAccountDetails = React.useCallback(() => {
    AccountsAPI.getAccount().then((details) => {
      setAuthor(details.id);
    });
  }, []);

  // When the page is focused, fetch the user's account details from the API.
  React.useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  // When the user presses the "Create" button, create the scrapbook.
  const onCreate = () => {
    ScrapbookAPI.createScrapbook(title, author, friendsOnly).then(() => {
      // Create a toast to confirm the scrapbook was created.
      ToastAndroid.show("Scrapbook was created!", ToastAndroid.SHORT);
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Checkbox
        style={styles.checkbox}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
      <Text>Friends only</Text>
      <Button mode="contained" onPress={onCreate} style={styles.button}>
        Create
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    width: "80%",
    textAlign: "left",
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#e96b37",
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width - 20,
  },
});
