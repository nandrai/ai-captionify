import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
type Props = {
  onClose: () => void;
  data: any;
};
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const CaptionContainerModal = ({ onClose, data }: Props) => {
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
              <MaterialIcons name="format-quote" size={34} color="#e8c3c1" />
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
              Pick the perfect caption to shine!
            </Text>
            <ScrollView style={{ maxHeight: "80%" }}>
              {data?.map((el: any, i: any) => (
                <View
                  key={i + 1}
                  style={{
                    backgroundColor: "#2a2b2b",
                    padding: 30,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        color: "#a2aba5",
                        fontSize: 20,
                        fontFamily: "RalewayRegular",
                        backgroundColor: "#2a2b2b",
                        padding: 30,
                        borderRadius: 10,
                      }}
                    >
                      {el}
                    </Text>
                    <TouchableOpacity
                      style={{ alignItems: "flex-end" }}
                      onPress={() => Clipboard.setStringAsync(el)}
                    >
                      <Feather name="copy" size={24} color="#e8c3c1" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CaptionContainerModal;

const styles = StyleSheet.create({
  modalContainer: {},
});
