import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,
  Pressable,
} from "react-native";

const NotificationContainer = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Pressable>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              This is a notification
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default NotificationContainer;
