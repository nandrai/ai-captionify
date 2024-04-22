import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Modal,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ResetPasswordModal from "@/components/resetPassword/ResetPasswordModal";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function UserProfile() {
  const [modalVisible, setModalVisible] = React.useState(null);
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const userImageUrl = user?.imageUrl;

  const openModal = (modal: any) => {
    setModalVisible(modal);
  };

  const closeModal = () => {
    setModalVisible(null);
  };

  if (!isLoaded) {
    return;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Image
            height={80}
            width={80}
            source={{ uri: userImageUrl }}
            style={{ borderRadius: 100 }}
          />

          <View>
            <Text style={{ fontFamily: "RalewayBold", fontSize: 18 }}>
              {user ? user.firstName : "User"}
            </Text>
            <Text style={{ fontFamily: "RalewaySemibold" }}>
              {user ? user.emailAddresses[0].emailAddress : ""}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 0.7,
          backgroundColor: "#020016",
          // borderTopLeftRadius: 40,
          // padding: 10,
          // borderTopRightRadius: 40,
          shadowColor: "#333333",
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.6,
          shadowRadius: 10,
        }}
      >
        <ScrollView bounces={false}>
          <KeyboardAvoidingView>
            <View>
              <View
                style={{
                  marginTop: 20,
                  // alignItems: "flex-start",
                  gap: 10,
                  marginHorizontal: 20,
                }}
              >
                {/* CHANGE PASSWORD */}
                {/* <Text
                  style={{
                    fontFamily: "RalewaySemibold",
                    marginLeft: 3,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Change Password
                </Text> */}
                <TouchableOpacity onPress={() => signOut()}>
                  <View
                    style={{
                      backgroundColor: "#1B1C20",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <AntDesign name="logout" size={30} color="#a2aba5" />
                    <Text
                      style={{ color: "#a2aba5", fontFamily: "RalewayBold" }}
                    >
                      Log out
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal("resetPassword")}>
                  <View
                    style={{
                      backgroundColor: "#1B1C20",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <Entypo name="lock" size={30} color="#a2aba5" />
                    <Text
                      style={{ color: "#a2aba5", fontFamily: "RalewayBold" }}
                    >
                      Change Password
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* CHANGE PASSWORD */}
                <Text
                  style={{
                    fontFamily: "RalewaySemibold",
                    marginLeft: 3,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Feedback
                </Text>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#1B1C20",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <MaterialIcons
                      name="support-agent"
                      size={30}
                      color="#a2aba5"
                    />
                    <Text
                      style={{ color: "#a2aba5", fontFamily: "RalewayBold" }}
                    >
                      Contact Support{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* UPGRADE */}
                <Text
                  style={{
                    fontFamily: "RalewaySemibold",
                    marginLeft: 3,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Subscription
                </Text>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#1B1C20",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesome name="star" size={30} color="#a2aba5" />
                    <Text
                      style={{ color: "#a2aba5", fontFamily: "RalewayBold" }}
                    >
                      Upgrade
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* UPGRADE */}
                {/* PRIVACY POLICY */}
                <Text
                  style={{
                    fontFamily: "RalewaySemibold",
                    marginLeft: 3,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Privacy & Legal
                </Text>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#1B1C20",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesome6
                      name="clipboard-list"
                      size={30}
                      color="#a2aba5"
                    />

                    <Text
                      style={{ color: "#a2aba5", fontFamily: "RalewayBold" }}
                    >
                      Privacy Policy
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* PRIVACY POLICY */}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "resetPassword"}
          onRequestClose={closeModal}
        >
          <ResetPasswordModal onClose={closeModal} />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    // marginVertical: 30,
    height: 1,

    width: "100%",
    backgroundColor: "#eee",
  },
});
