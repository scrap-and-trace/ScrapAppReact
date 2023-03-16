import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CanvasScreen() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  // Create new independently draggable box on button press at the center of the screen by assinging an individual pan value to each box
  // Each box should be moveable independently of the other boxes and the canvas
  const [boxes, setBoxes] = useState([]);
  const addBox = () => {
    setBoxes([
      ...boxes,
      {
        pan: new Animated.ValueXY({ x: 0, y: 0 }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Canvas</Text>
      <Pressable onPress={addBox}>
        <Text>Add Box</Text>
      </Pressable>
      <Animated.View
        style={[pan.getLayout(), styles.box]}
        {...panResponder.panHandlers}
      />
      {boxes.map((box, index) => (
        <Animated.View
          key={index}
          style={[box.pan.getLayout(), styles.box]}
          {...panResponder.panHandlers}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});
