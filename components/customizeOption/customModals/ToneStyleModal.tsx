import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomizeCells from "../CustomizeCells";
import { Ionicons } from "@expo/vector-icons";
import { useToneContext } from "@/components/hooks/DataContext";
import { ToneData } from "../CustomDropdownData";
type Props = {
  onClose: () => void;
};

const ToneStyleModal = ({ onClose }: Props) => {
  //@ts-ignore
  const { toneData, setToneData } = useToneContext();
  const selectedIds = toneData?.map((el: any) => el.id);

  const selectOnPressHandler = useCallback(
    (item: any) => {
      if (!toneData.some((tone: any) => tone.id === item.id)) {
        setToneData([...toneData, item]);
      } else {
        const updatedToneData = toneData.filter(
          (tone: any) => tone.id !== item.id
        );
        setToneData(updatedToneData);
      }
    },
    [toneData, setToneData]
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.3 }}>{/* <Text>This is Top View</Text> */}</View>
      <View
        style={{
          flex: 0.7,
          backgroundColor: "#1B1C20",
          // borderTopLeftRadius: 40,
          // borderTopRightRadius: 40,
        }}
      >
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
              <Ionicons name="color-palette" size={34} color="#e8c3c1" />
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
              Tone
            </Text>
            <Text style={{ color: "#a2aba5", fontFamily: "RalewaySemibold" }}>
              Choose your caption tone.
            </Text>
            <View
              style={{
                backgroundColor: "#2a2b2b",
                padding: 30,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{ color: "white" }}
                placeholderTextColor="#a2aba5"
                placeholder="e.g. inspiring, educational"
              />
            </View>
          </View>
          <View style={{ maxHeight: 300 }}>
            <FlatList
              bounces={false}
              data={ToneData}
              renderItem={({ item }) => (
                <CustomizeCells
                  // selectedData={selectedData}
                  selectedIds={selectedIds}
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
    </View>
  );
};

export default ToneStyleModal;

const styles = StyleSheet.create({
  modalContainer: {},
});
