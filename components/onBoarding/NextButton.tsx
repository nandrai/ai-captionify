import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  percentage: number;
  scrollTo: () => void;
}

const NextButton = ({ percentage, scrollTo }: Props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.button}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
  },
});
