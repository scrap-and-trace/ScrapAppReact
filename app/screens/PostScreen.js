/*
 * This is the screen that allows the user to post a new image to the app.
 * It should allow the user to take a photo or select one from their gallery.
 * Additionally, the user should be able to add a title and description to the post.
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
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
} from "react-native";
import { Button } from "react-native-paper";
import PostAPI from "../api/PostAPI";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PostScreen({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

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

  // Take a photo with the camera.
  const takePhoto = async () => {
    if (hasCameraPermission === null) {
      alert("Requesting camera permissions");
    } else if (hasCameraPermission === false) {
      alert("No access to camera");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        for (let i = 0; i < result.assets.length; i++) {
          setImage(result.assets[i].uri);
        }
      }
    }
    console.log(image);
  };

  // Select a photo from the gallery.
  const pickImage = async () => {
    if (hasGalleryPermission === null) {
      alert("Requesting gallery permissions");
    } else if (hasGalleryPermission === false) {
      alert("No access to gallery");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        for (let i = 0; i < result.assets.length; i++) {
          setImage(result.assets[i].uri);
        }
      }
    }
    console.log(image);
  };

  // Upload the post to the database.
  const uploadPost = async () => {
    if (image && title && description) {
      const response = PostAPI.createPost(image, title, description);
      if (response) {
        alert("Post uploaded successfully!");
        navigation.navigate("Home");
      } else if (response === false) {
        alert("Post failed to upload. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const removeImageFromState = () => {
    setImage(null);
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
                source={require("../assets/icon.png")}
                style={styles.image}
              />
            )}
            {image && (
              <Pressable
                onPress={removeImageFromState}
                style={styles.removeImageButton}
              >
                <Ionicons name="close-circle" size={30} color="red" />
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
            style={styles.textInputDescription}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Description"
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
              icon={"upload"}
              mode="contained"
              onPress={uploadPost}
              style={styles.button}
              compact={true}
            >
              Upload Post
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
    width: 350,
    height: 350,
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
  textInputDescription: {
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
