import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import PhoneInput from "react-native-phone-input";

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
          Alert.alert("Account created successfully!");
          props.navigation.navigate("Login");
        })
        .catch((error) => {
          Alert.alert(
            "Account creation failed.",
            "Please check your details and try again. \n\nError: " +
              error.message
          );
        });
    }
  };

  const data = [
    { id: 1, name: 'Password must be a minimum of 8 characters long' },
    { id: 2, name: 'Password must not be similar to first name, last name, or username' },
    { id: 3, name: 'Password must not only consist of numbers' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
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

      <PhoneInput
        style={styles.input}
        onChangeText={setPhoneNum}
        autoComplete="tel"
        keyboardType="phone-pad"
        initialCountry="gb"
        textProps={{ placeholder: "Phone Number" }}
      ></PhoneInput>

      <TextInput
        style={styles.input1}
        placeholder="Set your password"
        onChangeText={setPassword}
        secureTextEntry={true}
      ></TextInput>
      <Text style={styles.pasrole}>Password must       1.Be minimum of 8 characters long</Text>
      <Text style={styles.pasrole}>2.Not be similar to first name, last name, or username</Text>
      <Text style={styles.pasrole1}>3.Not only consist of numbers</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password again"
        onChangeText={setPassword2}
        secureTextEntry={true}
      ></TextInput>
      {/* Test */}
      

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
    color: "#e96b37",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: "4%",
    marginTop: "20%",
    textAlign: "center",
  },
  pasrole: {
    color: "#e96b37",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  pasrole1: {
    color: "#e96b37",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    marginBottom: "2%",
  },
  subtitle: {
    color: "#e96b37",
    fontSize: 15,
    marginBottom: "11%",
  },
  info1: {
    color: "#e96b37",
    paddingRight: 250,
    fontWeight: "bold",
    fontSize: 20,
  },
  info2: {
    color: "#e96b37",
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
    borderColor: "#e96b37",
    borderRadius: 30,
  },
  input1: {
    height: 40,
    marginBottom: "1%",
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderColor: "#e96b37",
    borderRadius: 30,
  },
  button: {
    marginTop: "5%",
    width: 100,
    height: 50,
    alignItems: "center",
    backgroundColor: "#e96b37",
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    padding: 15,
    color: "white",
  },
});
