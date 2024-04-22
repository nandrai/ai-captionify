import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

type Props = {
  title: string;
  id: string;
  selectedIds: string[];
  onPress: (item: any) => void;
};

const CustomizeCells = ({ title, id, onPress, selectedIds }: Props) => {
  const isSelected = selectedIds?.includes(id);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderColor: "#9F2B68",
          alignItems: "center",
          marginTop: 10,
          paddingVertical: 8,
          backgroundColor: isSelected ? "#9F2B68" : "#1B1C20",
          borderRadius: 20,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#a2aba5",
            fontFamily: "RalewaySemibold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        {isSelected ? (
          <Entypo name="cross" size={24} color="black" />
        ) : (
          <Entypo name="plus" size={24} color="#a2aba5" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomizeCells;
