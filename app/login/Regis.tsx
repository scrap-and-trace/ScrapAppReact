import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";

interface RegisScreenProps {
  navigation: any;
}

const Regis = (props: RegisScreenProps) => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [Dob, setDob] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [UserName, setUserName] = useState("");

  /*
  {
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "dob": null,
    "phone": "",
    "password": ""
}
*/
  const data = {
    username: UserName,
    first_name: FirstName,
    last_name: LastName,
    email: Email,
    dob: Dob,
    phone: PhoneNum,
    password: Password,
  };

  const RegisterAcc = () => {
    if (Password != Password2) {
      Alert.alert("Passwords do not match");
    } else {
      AccountsAPI.register(data)
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            Alert.alert("Account Created");
            props.navigation.navigate("Login");
          } else {
            Alert.alert("Account Creation Failed");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(data);
        });
    }
  };

  //const  Regis = () => props.navigation.navigate("Login");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.subtitle}>Welcome to Scrap</Text>

      <TextInput
        style={styles.input}
        placeholder=" User Name"
        onChangeText={setUserName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" First Name"
        onChangeText={setFirstName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" Second Name"
        onChangeText={setLastName}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" Birthday"
        onChangeText={setDob}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" Email"
        onChangeText={setEmail}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" Phone Number"
        onChangeText={setPhoneNum}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder=" Set Your Password"
        onChangeText={setPassword}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder=" Enter Your Password Again"
        onChangeText={setPassword2}
      ></TextInput>

      <TouchableOpacity onPress={RegisterAcc}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
    fontSize: 40,
    marginBottom: "4%",
    marginTop: "20%",
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

export default Regis;
