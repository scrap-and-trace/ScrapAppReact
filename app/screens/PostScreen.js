/*
 * This is the screen that allows the user to post a new image to the app.
 * It should allow the user to take a photo or select one from their gallery.
 * Additionally, the user should be able to add a title and body to the post.
 *
 * username: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import React from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import AccountsAPI from "../api/AccountsAPI";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";

export default function PostScreen({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [hasLocationPermission, setHasLocationPermission] =
    React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imgBase64, setImgBase64] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [scrapbookId, setScrapbookId] = React.useState(1);

  // Request permissions for the camera and gallery.
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(status === "granted");
      })();
    }, [])
  );

  // Request permissions for the camera and gallery.
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
      })();
    }, [])
  );

  // Request permissions for geolocation.
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasLocationPermission(status === "granted");
      })();
    }, [])
  );

  // Get the user's current location.
  const getLocation = async () => {
    if (hasLocationPermission === null) {
      alert("Requesting location permissions");
    } else if (hasLocationPermission === false) {
      alert(
        "No access to location. You can fix this by going to Settings > Location > Allow Location Access > Allow"
      );
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  };

  // Get the user's account details.
  const getAccount = async () => {
    const response = await AccountsAPI.getAccount();
    setUsername(response.username);
    setEmail(response.email);
  };

  // Take a photo with the camera.
  const takePhoto = async () => {
    if (hasCameraPermission === null) {
      alert("Requesting camera permissions");
    } else if (hasCameraPermission === false) {
      alert(
        "No access to camera. You can fix this by going to Settings > Camera > Allow Camera Access > Allow"
      );
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        for (let i = 0; i < result.assets.length; i++) {
          setImage(result.assets[i].uri);
          setImgBase64(result.assets[i].base64);
        }
      }
    }
  };

  // Select a photo from the gallery. Allow for base64 encoding.
  const pickImage = async () => {
    if (hasGalleryPermission === null) {
      alert("Requesting gallery permissions");
    } else if (hasGalleryPermission === false) {
      alert(
        "No access to gallery. You can fix this by going to Settings > Gallery > Allow Gallery Access > Allow"
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        for (let i = 0; i < result.assets.length; i++) {
          setImage(result.assets[i].uri);
          setImgBase64(result.assets[i].base64);
        }
      }
    }
  };

  // Select the scrapbook to upload the post to.
  // Navigate to the scrapbook selection screen and pass all the data to the state.
  const selectScrapbook = (id) => {
    setScrapbookId(id);
    getLocation();
    getAccount();
    if (title && body && image && latitude && longitude !== null) {
      navigation.navigate("Select Scrapbook", {
        title: title,
        body: body,
        image: image,
        imgBase64: imgBase64,
        latitude: latitude,
        longitude: longitude,
      });
    } else if (latitude && longitude === null) {
      alert("Please enable location services.");
    }
  };

  // Remove the image from the state.
  const removeImageFromState = () => {
    setImage(null);
  };

  // Remove the title from the state.
  const removeTitleFromState = () => {
    setTitle("");
  };

  // Remove the body from the state.
  const removeBodyFromState = () => {
    setBody("");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <SafeAreaView style={styles.photoContainer}>
          <SafeAreaView>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image
                source={require("../assets/black.png")}
                style={styles.image}
              />
            )}
            {image && (
              <Pressable
                onPress={removeImageFromState}
                style={styles.removeImageButton}
              >
                <MaterialIcons name="remove-circle" size={24} color="red" />
              </Pressable>
            )}
          </SafeAreaView>
          <TextInput
            style={styles.textInputTitle}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Title"
          />
          <TextInput
            style={styles.textInputBody}
            onChangeText={(text) => setBody(text)}
            value={body}
            placeholder="Body"
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <Button
            icon={"camera"}
            mode="contained"
            onPress={takePhoto}
            style={styles.button}
            compact={true}
          >
            Take Photo
          </Button>
          <Button
            icon={"image"}
            mode="contained"
            onPress={pickImage}
            style={styles.button}
            compact={true}
          >
            Select Image
          </Button>
          {image && (
            <Button
              icon={"book"}
              mode="contained"
              onPress={selectScrapbook}
              style={styles.button}
              compact={true}
            >
              Select Scrapbook
            </Button>
          )}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  photoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 30,
    resizeMode: "cover",
    margin: 5,
    padding: 5,
  },
  textInputTitle: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    margin: 5,
    flexWrap: "wrap",
    textAlign: "center",
  },
  textInputBody: {
    flexWrap: "wrap",
    textAlign: "center",
  },
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "#e96b37",
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 5,
  },
});
