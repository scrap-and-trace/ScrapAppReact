import React from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Main(props) {
  const Login = () => props.navigation.navigate("Login");
  const Regis = () => props.navigation.navigate("Regis");

  return (
    <ImageBackground
      source={require("../assets/Signup.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.slogan}></Text>
        <TouchableOpacity onPress={Login} style={styles.buttonIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Regis} style={styles.buttonUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    margin: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  slogan: {
    color: "white",
    marginTop: "75%",
  },
  buttonIn: {
    marginTop: "31%",
    marginBottom: "0%",
    width: 200,
    height: 55,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonUp: {
    marginTop: "5%",
    marginBottom: "40%",
    width: 200,
    height: 55,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    textAlign: "center",
    padding: 15,
    color: "#975305",
    fontWeight: "bold",
  },
});
