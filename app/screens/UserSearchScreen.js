import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import UserSearchContainer from "../components/UserSearchContainer";

export default function UserSearchScreen({ navigation }) {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchUsers = async () => {
    const users = await AccountsAPI.getAllUsers();
    setUsers(users);
    setIsLoading(false);
  };

  const fetchOwnId = async () => {
    const id = await AccountsAPI.getAccount();
    setId(id);
  };

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    fetchUsers();
    fetchOwnId();
    setIsLoading(false);
  }, []);

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
      fetchUsers();
      setSearch(text);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
      fetchOwnId();
    }, [])
  );

  const getHeader = () => {
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Users"
      />
    </View>;
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
        ListHeaderComponent={getHeader}
      />
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
    borderRadius: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
