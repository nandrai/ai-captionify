import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { LengthData } from "../CustomDropdownData";
import CustomizeCells from "../CustomizeCells";
import { useLengthContext } from "@/components/hooks/DataContext";
type Props = {
  onClose: () => void;
};

const LengthModal = ({ onClose }: Props) => {
  // @ts-ignore
  const { setLengthData, lengthData } = useLengthContext();
  const seletedIds = lengthData?.id;

  const selectOnPressHandler = useCallback(
    (item: any) => {
      setLengthData(item);
    },
    [lengthData]
  );
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}>{/* <Text>This is Top View</Text> */}</View>
      <View style={{ flex: 0.6, backgroundColor: "#1B1C20" }}>
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#2e2b2b",
                padding: 5,
                borderRadius: 100,
              }}
            >
              <FontAwesome6 name="lines-leaning" size={24} color="#e8c3c1" />
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text
                style={{
                  color: "#e8c3c1",
                  fontFamily: "RalewayBold",
                  fontSize: 20,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            <Text
              style={{
                color: "white",
                fontFamily: "RalewayBold",
                fontSize: 20,
              }}
            >
              Length
            </Text>
            <Text style={{ color: "#a2aba5", fontFamily: "RalewaySemibold" }}>
              Choose length of your caption.
            </Text>
          </View>
          <FlatList
            data={LengthData}
            bounces={false}
            renderItem={({ item }) => (
              <CustomizeCells
                selectedIds={seletedIds}
                onPress={() => selectOnPressHandler(item)}
                id={item.id}
                title={item.value}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default LengthModal;
