/*
 * This component is used to display the likes on a page
 * It will display the curent number of likes that the page has 
 * A Button that allows a user to add or remove their like fromthe page
 * 
 *
 * 
 */

//import * as React from "react";
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Clipboard,
} from "react-native";
import "react-native-clipboard/RNClipboard"

const isLiked = true;
const likes = 10;

/* Comments for kieran
 * This container should be able to now be pluged into the api and should funcation correctly.
 * The constant likes is the number of like that the page has
 * Isliked should be true if the user has already liked the page
 * isLiked should be populated before the first if under this comment.
 * if you could implement the API I am more than happy to complete this section cause I really need to contribute to the project xD
 * We will get a list of users, we need to check if our user is on the list. if they are then set is liked to true, if not then break
 * take the list of users and the lnegue of that list will be the amount of likes
 * 
*/

/*
if(isLiked == true){
    likes = likes -1;
}
*/
const copyToClipboard = () => {
  Clipboard.setString('hello world');
};


export default function LikeContainter({
    onPress,
}) {
    const [isLiked, setIsLiked] = useState(false);
    
      const toggleLike = () => {
        setIsLiked(!isLiked);
        
      }

      
      

    return (
      <View style={styles.container}>
        
          <Pressable onPress={toggleLike} >
            <View style={styles.like}>
              <Image source={isLiked ? require('../assets/like_Full.png') : require('../assets/like_Empty.png')} style ={styles.image} />
              <Text style = {styles.text}>
                  {isLiked ? likes+1  : likes}
              </Text>
            </View>
          </Pressable>
        
        <View style ={styles.share}>
          <Pressable onPress={copyToClipboard} >  
            <Image source={require('../assets/share.png')} style ={styles.image} />
          </Pressable>  
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    marginRight: 10,
    padding:2,
  },
  imageRight: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    padding:2,
    //position: "absolute",
    marginRight: 100,
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "bold",
  },
  like: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 5,
  },
  share: {
    floar: "right",
    imageRight:1000,
    
  },
});
