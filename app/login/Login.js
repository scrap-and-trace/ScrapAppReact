import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";

export default function LoginScreen(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const LoginAcc = () => {
    AccountsAPI.login(Email, Password)
      .then((response) => {
        props.navigation.navigate("NavBar");
      })
      .catch((error) => {
        Alert.alert(
          "Login Failed",
          "Please check your email and password and try again."
        );
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to{"\n"}Scrap & Trace.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email (user@mail.com)"
        onChangeText={setEmail}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity onPress={LoginAcc}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    margin: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#975305",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 70,
    marginTop: 130,
    textAlign: "center",
  },
  info1: {
    color: "#975305",
    paddingRight: 250,
    fontWeight: "bold",
    fontSize: 20,
  },
  info2: {
    color: "#975305",
    paddingRight: 210,
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    borderColor: "#975305",
  },
  button: {
    marginTop: 50,
    width: 90,
    height: 40,
    alignItems: "center",
    backgroundColor: "#975305",
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
});
