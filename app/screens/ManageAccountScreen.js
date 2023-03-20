import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import { Avatar } from "react-native-elements";

export default function ManageAccountScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [PhoneNum, setPhoneNum] = React.useState("");
  const [Dob, setDob] = React.useState("");

  const [username1, setUsername1] = React.useState("");
  const [email1, setEmail1] = React.useState("");
  const [FirstName1, setFirstName1] = React.useState("");
  const [LastName1, setLastName1] = React.useState("");
  const [Password1, setPassword1] = React.useState("");
  const [PhoneNum1, setPhoneNum1] = React.useState("");
  const [Dob1, setDob1] = React.useState("");
  const [id1, setId1] = React.useState("");

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.getAccount();
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPassword(user.Password);
      setPhoneNum(user.phone);
      setDob(user.dob);
      setId1(user.id);
      console.log(user.id);
    };
    fetchUser();
  }, []);

  const changeInfo = async () => {
    AccountsAPI.changeInfo(id1, username1)
      .then((response) => {
        Alert.alert("Information Changed");
      })
      .catch((error) => {
        Alert.alert("Change Failed");
      });
  };

  return (
    <View style={styles.accountDetails}>
      <View style={styles.avatar}>
        <Avatar
          size="large"
          rounded
          source={require("../assets/Signup.png")}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.content} />
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.info}>username</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={username}
            onChangeText={setUsername1}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>email</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={email}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>FirstName</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={FirstName}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>LastName</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={LastName}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>PhoneNum</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={PhoneNum}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Birthday</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={Dob}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Password</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={Password}
            onChangeText={""}
          ></TextInput>
        </View>
      </View>

      <View style={styles.buttonPositon}>
        <TouchableOpacity style={styles.button} onPress={changeInfo}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accountDetails: {
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  account: {
    justifyContent: "flex-start",
    marginLeft: "5%",
  },
  buttonPositon: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "7%",
    marginTop: "5%",
  },
  row: {
    flexDirection: "row",
  },
  info: {
    color: "#e96b37",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "4%",
    textAlign: "left",
    width: 110,
  },
  chginfo: {
    color: "#000000",
    fontSize: 15,
    width: 150,
    marginTop: "4%",
    marginLeft: "10%",
    textAlign: "center",
    selectionColor: "black",
  },
  button: {
    marginTop: "20%",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e96b37",
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
  line: {
    height: 0,
    marginLeft: "5%",
    marginRight: "5%",
    borderColor: "#e96b37",
    borderWidth: 0.5,
  },
});
