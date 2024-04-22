import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TargetAudienceData } from "../CustomDropdownData";
import { useTargetContext } from "@/components/hooks/DataContext";
import React, { useCallback } from "react";
import CustomizeCells from "../CustomizeCells";
type Props = {
  onClose: () => void;
};

interface Data {
  id: string;
  value: string;
}

const TargetAudienceModal = ({ onClose }: Props) => {
  //@ts-ignore
  const { setTargetData, targetData } = useTargetContext();
  const selectedIds = targetData?.map((el: any) => el.id);

  const selectOnPressHandler = useCallback(
    (item: any) => {
      if (!targetData.some((target: any) => target.id === item.id)) {
        setTargetData([...targetData, item]);
      } else {
        const updatedTargetData = targetData.filter(
          (target: any) => target.id !== item.id
        );
        setTargetData(updatedTargetData);
      }
    },
    [targetData, setTargetData]
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
              <Ionicons name="people" size={24} color="#e8c3c1" />
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
              Target Audience
            </Text>
            <Text style={{ color: "#a2aba5", fontFamily: "RalewaySemibold" }}>
              Choose who your caption is for.
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
            <View style={{ maxHeight: 250 }}>
              <FlatList
                bounces={false}
                data={TargetAudienceData}
                renderItem={({ item }) => (
                  <CustomizeCells
                    onPress={() => selectOnPressHandler(item)}
                    selectedIds={selectedIds}
                    title={item.value}
                    id={item.id}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TargetAudienceModal;

const styles = StyleSheet.create({
  container: {},
});
