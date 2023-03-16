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

export default function RegisScreen(props) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [Dob, setDob] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [UserName, setUserName] = useState("");

  const RegisterAcc = () => {
    if (Password != Password2) {
      Alert.alert("Passwords do not match");
    } else {
      AccountsAPI.register(
        UserName,
        FirstName,
        LastName,
        Email,
        Dob,
        PhoneNum,
        Password
      )
        .then((response) => {
          console.log(response);
          Alert.alert("Account Created");
          props.navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Account Creation Failed");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.subtitle}>Welcome to Scrap & Trace</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUserName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Birthday (YYYY-MM-DD)"
        onChangeText={setDob}
        autoComplete="birthdate-full"
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Email (john@mail.com)"
        onChangeText={setEmail}
        autoComplete="email"
        keyboardType="email-address"
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Phone Number (International format)"
        onChangeText={setPhoneNum}
        autoComplete="tel-country-code"
        keyboardType="phone-pad"
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Set your password"
        onChangeText={setPassword}
        secureTextEntry={true}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter your password again"
        onChangeText={setPassword2}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity onPress={RegisterAcc}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
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
    marginBottom: "4%",
    marginTop: "20%",
    textAlign: "center",
  },
  subtitle: {
    color: "#975305",
    fontSize: 15,
    marginBottom: "14%",
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
    marginBottom: 10,
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderColor: "#975305",
    borderRadius: 30,
  },
  button: {
    marginTop: "10%",
    width: 100,
    height: 50,
    alignItems: "center",
    backgroundColor: "#975305",
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    padding: 15,
    color: "white",
  },
});
