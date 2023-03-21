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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

export default function ManageAccountScreen() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [PhoneNum, setPhoneNum] = React.useState("");
  const [Dob, setDob] = React.useState("");

  const [username1, setUsername1] = React.useState("");
  const [FirstName1, setFirstName1] = React.useState("");
  const [LastName1, setLastName1] = React.useState("");
  const [authorImage, setAuthorImage] = React.useState("");
  const [PhoneNum1, setPhoneNum1] = React.useState("");
  const [Dob1, setDob1] = React.useState("");
  const [id1, setId1] = React.useState("");

  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
  const [imgBase64, setImgBase64] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [deleteUrl, setDeleteUrl] = React.useState(null);

  const imgBB = require("../json/imgbb-key.json").key;

  // Check if user has permission to access camera roll
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(status === "granted");
      })();
    }, [])
  );

  // Request permissions for the camera.
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
      })();
    }, [])
  );

  // Get the image from the camera roll and set it as the image to be uploaded.
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      resizeMode: "contain",
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setImgBase64(result.assets[i].base64);
      }
    }
  };

  // Select a photo from the gallery. Allow for base64 encoding.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      resizeMode: "contain",
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setImgBase64(result.assets[i].base64);
      }
    }
  };

  // Upload image to imgBB
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imgBase64);
    formData.append("key", imgBB);
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    setImageUrl(result.data.url);
    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result);
      }
      reject(result);
    });
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await AccountsAPI.getAccount();
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setAuthorImage(user.image_url);
      setPassword(user.Password);
      setPhoneNum(user.phone);
      setDob(user.dob);
      setId1(user.id);
    };
    fetchUser();
  }, []);

  const changeUsername = async () => {
    AccountsAPI.changeUsername(id1, username1)
      .then((response) => {
        Alert.alert("Your username has been changed.");
      })
      .catch((error) => {
        Alert.alert(
          "Change failed.",
          "Either the username is already taken or the username is invalid. Error: " +
            error
        );
      });
  };

  const changeFirstName = async () => {
    AccountsAPI.changeFirstName(id1, FirstName1)
      .then((response) => {
        Alert.alert("Your first name has been changed.");
      })
      .catch((error) => {
        Alert.alert("Change failed.", "Error: " + error);
      });
  };

  const changeLastName = async () => {
    AccountsAPI.changeLastName(id1, LastName1)
      .then((response) => {
        Alert.alert("Your last name has been changed.");
      })
      .catch((error) => {
        Alert.alert("Change failed.", "Error: " + error);
      });
  };

  const changePhoneNum = async () => {
    AccountsAPI.changePhoneNum(id1, PhoneNum1)
      .then((response) => {
        Alert.alert("Your phone number has been changed.");
      })
      .catch((error) => {
        Alert.alert(
          "Change failed.",
          "Either the phone number is already taken or the phone number is invalid. Error: " +
            error
        );
      });
  };

  const changeBirthday = async () => {
    AccountsAPI.changeBirthday(id1, Dob1)
      .then((response) => {
        Alert.alert("Your birthday has been changed.");
      })
      .catch((error) => {
        Alert.alert("Change failed.", "Error: " + error);
      });
  };

  return (
    <View style={styles.accountDetails}>
      <View style={styles.avatar}>
        <Avatar
          size="large"
          rounded
          source={{ uri: authorImage }}
          // allow user to change profile picture from either camera roll or camera and then upload to imgBB and then put the url in the database
          onPress={() => {
            Alert.alert(
              "Change Profile Picture",
              "Select an image from your camera roll or take a new photo.",
              [
                {
                  text: "Camera Roll",
                  onPress: () => {
                    pickImage().then(() => {
                      uploadImage().then(() => {
                        AccountsAPI.changeProfilePic(id1, imageUrl)
                          .then((response) => {
                            Alert.alert("Image changed!");
                          })
                          .catch((error) => {
                            Alert.alert(
                              "Change failed. Please try again.",
                              "Error: " + error
                            );
                          });
                      });
                    });
                  },
                },
                {
                  text: "Take a Photo",
                  onPress: () => {
                    takePhoto().then(() => {
                      uploadImage().then(() => {
                        AccountsAPI.changeProfilePic(id1, imageUrl)
                          .then((response) => {
                            Alert.alert("Image changed!");
                          })
                          .catch((error) => {
                            Alert.alert(
                              "Change failed. Please try again.",
                              "Error: " + error
                            );
                          });
                      });
                    });
                  },
                },
              ]
            );
          }}
          showEditButton
          activeOpacity={0.7}
        />
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.content} />
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.info}>Username</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={username}
            onChangeText={setUsername1}
          ></TextInput>
          <MaterialIcons
            name="edit"
            color="#7c7c7c"
            size={25}
            style={styles.chgicon}
            onPress={changeUsername}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Email</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={email}
            onChangeText={""}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>First Name</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={FirstName}
            onChangeText={setFirstName1}
          ></TextInput>
          <MaterialIcons
            name="edit"
            color="#7c7c7c"
            size={25}
            style={styles.chgicon}
            onPress={changeFirstName}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Surname</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={LastName}
            onChangeText={setLastName1}
          ></TextInput>
          <MaterialIcons
            name="edit"
            color="#7c7c7c"
            size={25}
            style={styles.chgicon}
            onPress={changeLastName}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Phone No.</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={PhoneNum}
            onChangeText={setPhoneNum1}
          ></TextInput>
          <MaterialIcons
            name="edit"
            color="#7c7c7c"
            size={25}
            style={styles.chgicon}
            onPress={changePhoneNum}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.info}>Birthday</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={Dob}
            onChangeText={setDob1}
          ></TextInput>
          <MaterialIcons
            name="edit"
            color="#7c7c7c"
            size={25}
            style={styles.chgicon}
            onPress={changeBirthday}
          />
        </View>
        {/* <View style={styles.row}>
          <Text style={styles.info}>Password</Text>
          <TextInput
            style={styles.chginfo}
            placeholder={Password}
            onChangeText={""}
          ></TextInput>
        </View> */}
      </View>

      <View style={styles.buttonPositon}>
        <TouchableOpacity style={styles.button} onPress={changeUsername}>
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
    textAlign: "right",
    selectionColor: "black",
  },
  chgicon: {
    fontSize: 20,
    marginTop: "5%",
    marginLeft: "2%",
    textAlign: "center",
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
  buttonSmall: {
    marginTop: "20%",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e96b37",
    borderRadius: 30,
  },
});
