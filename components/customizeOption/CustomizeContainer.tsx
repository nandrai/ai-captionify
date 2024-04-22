import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  titleIcon: any;
  icon: any;
  onPress: () => void;
};

const CustomizeContainer = ({ title, titleIcon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          backgroundColor: "#1B1C20",
          justifyContent: "space-between",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <View>{titleIcon}</View>
          <Text
            style={{
              fontFamily: "RalewaySemibold",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Text style={{ color: "#0A87FF", fontSize: 18 }}>‹</Text>
          <Text style={{ color: "#0A87FF", fontSize: 18 }}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomizeContainer;
