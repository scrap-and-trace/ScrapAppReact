import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import Checkbox from "expo-checkbox";
import PageAPI from "../api/PageAPI";

export default function CreateScrapbookScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [friendsOnly, setFriendsOnly] = React.useState(false);
  const [id, setId] = React.useState("");
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  // Fetch the user's account details from the API.
  const fetchAccountDetails = React.useCallback(() => {
    AccountsAPI.getAccount().then((account) => {
      setId(account.id);
    });
  }, []);

  // When the page is focused, fetch the user's account details from the API.
  React.useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  // When the user presses the "Create" button, create the scrapbook.
  const onCreate = () => {
    PageAPI.createScrapbook(id, title, friendsOnly).then(() => {
      navigation.navigate("Home");
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
      <Button mode="contained" onPress={onCreate}>
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
});
