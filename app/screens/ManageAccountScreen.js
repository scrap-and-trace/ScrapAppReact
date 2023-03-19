import React from "react";
import { View, Text, StyleSheet,TextInput,Button,TouchableOpacity,Alert, } from "react-native";
import AccountsAPI from "../api/AccountsAPI";
import { Avatar } from 'react-native-elements';


export default function ManageAccountScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState(""); 
  const [FirstName, setFirstName] = React.useState(""); 
  const [LastName, setLastName] = React.useState(""); 
  const [Password, setPassword] = React.useState(""); 
  const [PhoneNum, setPhoneNum] = React.useState(""); 
  const [Dob, setDob] = React.useState(""); 

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.getAccount();
      console.log(user);
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPassword(user.Password);
      setPhoneNum(user.phone);
      setDob(user.dob);
    };
    fetchUser();
  }, []);

  const changeInfo = () => {
    const user = AccountsAPI.getAccount();
    AccountsAPI.changeInfo(
      user,
      username,
      FirstName,
      LastName,
      email,
      Dob,
      PhoneNum,)
      .then((response) => {
        console.log(response);
        Alert.alert("Information Changed");
      })
      .catch((error) => {
        console.log(error);
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
              onChangeText={setUsername}
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
        <TouchableOpacity style={styles.button} onPress= {changeInfo} >
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
    justifyContent: 'flex-start',
    marginLeft: "5%",
  },
  buttonPositon: {
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  avatar: {
    justifyContent: 'flex-start',
    alignItems: "center",
    marginBottom: "7%",
    marginTop: "5%",
  },
  row: {
    flexDirection: 'row',
  },
  info: {
    color: "#864904",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "4%",
    textAlign: "left",
    width:110,
  },
  chginfo: {
    color: "#000000",
    fontSize: 15,
    width:150,
    marginTop: "4%",
    marginLeft: "10%",
    textAlign: "center",
    selectionColor: "black"
  },
  button: {
    marginTop: "20%",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#693a03",
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
    borderColor: "#864904",
    borderWidth: 0.5,
  },
});
