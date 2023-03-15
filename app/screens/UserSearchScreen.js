import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TextInput,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import UserSearchContainer from "../components/UserSearchContainer";

export default function UserSearchScreen({ navigation }) {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const users = await AccountsAPI.getAllUsers();
      setUsers(users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const onRefresh = React.useCallback(() => {
    const fetchUsers = async () => {
      const users = await AccountsAPI.getAllUsers();
      setUsers(users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  // Dynamic search bar. Ensure that the search bar is not case sensitive.
  // Update the search bar when the user types. Reset the search bar when all characters are deleted.
  // Allow use of first name, last name, and username to search for users.
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = users.filter((item) => {
        const itemData = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()} ${item.username.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setUsers(newData);
      setSearch(text);
    } else {
      const fetchUsers = async () => {
        const users = await AccountsAPI.getAllUsers();
        setUsers(users);
      };
      fetchUsers();
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Users"
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserSearchContainer
              first_name={item.first_name}
              last_name={item.last_name}
              username={item.username}
              id={item.id}
              onPress={() => {
                navigation.navigate("User Account", {
                  id: item.id,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    margin: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
