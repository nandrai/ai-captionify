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
  ActivityIndicator,
} from "react-native";
import increaseGenCountDb from "@/components/database/IncreaseCountDb";
import createUserRecord from "@/components/database/CreateUserRecord";
import CaptionContainerModal from "@/components/CaptionContainer";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomizeContainer from "@/components/customizeOption/CustomizeContainer";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import TargetAudienceModal from "@/components/customizeOption/customModals/TargetAudienceModal";
import LengthModal from "@/components/customizeOption/customModals/LengthModal";
import ToneStyleModal from "@/components/customizeOption/customModals/ToneStyleModal";
import {
  useLengthContext,
  useToneContext,
  useTargetContext,
} from "@/components/hooks/DataContext";
import { imageUploader } from "@/components/imageUpload/Upload";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

export default function TabOneScreen() {
  const [image, setImage] = useState(null);
  const [serverImage, setServerImage] = useState("");
  const [modalVisible, setModalVisible] = useState(null);
  const [captionData, setCaptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const [description, setDescription] = useState("");
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const userEmail = user?.emailAddresses[0].emailAddress;
  //@ts-ignore
  const { lengthData } = useLengthContext();
  //@ts-ignore
  const { targetData } = useTargetContext();
  //@ts-ignore
  const { toneData } = useToneContext();

  const openModal = (modal: any) => {
    setModalVisible(modal);
  };

  const descriptionHandler = (cb: any, delay: any) => {
    let timeout: any;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const debounceFunction = descriptionHandler((value: any) => {
    setDescription(value);
  }, 250);

  const extractedToneData = toneData?.map((el: any) => el.value).toString();
  const extractedTargetData = targetData?.map((el: any) => el.value).toString();
  const extractedLengthData = lengthData?.value;

  const closeModal = () => {
    setModalVisible(null);
  };

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 6],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error: any) {
      alert("Error while uploading image" + error);
    }
  };

  const saveImage = async (image: any) => {
    const userEmail = user?.emailAddresses[0].emailAddress;

    try {
      setImage(image);
      if (userEmail) {
        const response = await imageUploader({
          image: image,
          setIsLoading: setIsLoading,
          email: userEmail,
        });
        if (response) {
          setServerImage(response.photoUrl[0]);
        }
      }
    } catch (err: any) {
      console.log("error while setting state to image");
    } finally {
    }
  };
  const clearImage = async () => {
    //@ts-ignore
    const filename = image.split("/").pop();
    try {
      setIsLoading(!isLoading);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/upload/deletephoto`,
        {
          email: userEmail,
          fileName: filename,
        }
      );

      if (res.data) {
        setIsLoading(!isLoading);
      }

      if (res?.data) {
        setImage(null);
      }
    } catch (err: any) {
      alert("Try again removing photo");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCaptionHandler = async () => {
    if (!image) {
      return alert("Please provide the image first!");
    }
    try {
      setIsCaptionLoading(true);
      if (serverImage) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/ai/photo-ai`,
          {
            imageUrl: serverImage,
            tone: extractedToneData,
            targetAudience: extractedTargetData,
            length: extractedLengthData,
            description: description,
          }
        );
        increaseGenCountDb(userEmail);
        setIsCaptionLoading(false);

        const data = response.data.response;
        const dataArray = data.split("\n").filter(Boolean);

        if (dataArray) {
          setCaptionData(dataArray);
        }
        if (captionData) {
          openModal("captioncontainer");
        }
      }
    } catch (err: any) {
      alert("Retry Generating");
      setIsCaptionLoading(false);
    }
  };

  const createUserInDb = useCallback(async () => {
    const res = await createUserRecord(userEmail);
  }, [user]);

  useEffect(() => {
    createUserInDb();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView
        style={{
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <View>
            {isLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    right: 10,
                    top: 10,
                    borderRadius: 100,
                    borderWidth: 1,
                    backgroundColor: "red",
                    opacity: 0.7,
                  }}
                  onPress={clearImage}
                >
                  <Entypo name="cross" size={40} color="black" />
                </TouchableOpacity>
                <Image
                  style={{ flex: 1, width: width, height: height }}
                  source={{ uri: image }}
                />
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={uploadImage}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={30} color="#0A87FF" />
              <Text
                style={{
                  fontFamily: "RalewayBold",
                  fontSize: 25,
                  color: "#0A87FF",
                }}
              >
                Add Photos
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
        {isCaptionLoading ? (
          <ActivityIndicator
            style={{ flex: 0.7 }}
            size={"large"}
            color={"white"}
          />
        ) : (
          <ScrollView bounces={false}>
            <KeyboardAvoidingView>
              <View
                style={{
                  marginTop: 20,
                  // alignItems: "flex-start",
                  gap: 8,
                  marginHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "RalewaySemibold",
                    marginLeft: 3,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Add Details
                </Text>
                <Text
                  style={{
                    fontFamily: "RalewayRegular",
                    marginLeft: 3,
                    color: "#a2aba5",
                  }}
                >
                  Helps Ai to come with relevant captions
                </Text>
                <View
                  style={{
                    backgroundColor: "#1B1C20",
                    padding: 30,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    numberOfLines={4}
                    style={{ color: "white" }}
                    onChangeText={(value) => debounceFunction(value)}
                    placeholderTextColor="#a2aba5"
                    placeholder="Describe the photo..."
                  />
                </View>
              </View>
              {/* <View style={styles.separator} /> */}
              <View
                style={{ marginHorizontal: 20, marginVertical: 10, gap: 5 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RalewaySemibold",
                      fontSize: 15,
                      color: "white",
                    }}
                  >
                    Customize
                  </Text>
                  <Text
                    style={{
                      fontFamily: "RalewayRegular",
                      color: "#a2aba5",
                    }}
                  >
                    Optional
                  </Text>
                </View>
                <View style={{ gap: 6 }}>
                  <CustomizeContainer
                    title="Length"
                    onPress={() => openModal("length")}
                    titleIcon={
                      <FontAwesome6
                        name="lines-leaning"
                        size={24}
                        color="white"
                      />
                    }
                    icon={
                      <Feather name="arrow-up-circle" size={24} color="white" />
                    }
                  />

                  <CustomizeContainer
                    title="Tone & Style"
                    onPress={() => openModal("toneStyle")}
                    titleIcon={
                      <Ionicons
                        name="color-palette-outline"
                        size={24}
                        color="white"
                      />
                    }
                    icon={
                      <Feather name="arrow-up-circle" size={24} color="white" />
                    }
                  />

                  <CustomizeContainer
                    title="Target Audience"
                    onPress={() => openModal("audience")}
                    icon={
                      <Feather name="arrow-up-circle" size={24} color="white" />
                    }
                    titleIcon={
                      <Ionicons name="people" size={24} color="white" />
                    }
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{ alignItems: "center", marginVertical: 30 }}
                onPress={generateCaptionHandler}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 5,
                    backgroundColor: "#0A87FF",
                    borderRadius: 10,
                    shadowColor: "#0A87FF",
                    shadowOffset: {
                      width: 6,
                      height: 6,
                    },
                    shadowOpacity: 0.6,
                    shadowRadius: 10,
                  }}
                >
                  <MaterialIcons name="flare" size={24} color="white" />
                  <Text style={{ color: "white", fontFamily: "RalewayBold" }}>
                    Generate Captions
                  </Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "length"}
          onRequestClose={closeModal}
        >
          <LengthModal onClose={closeModal} />
        </Modal>

        <Modal
          animationType="slide"
          visible={modalVisible === "toneStyle"}
          onRequestClose={closeModal}
          transparent={true}
        >
          <ToneStyleModal onClose={closeModal} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "audience"}
          onRequestClose={closeModal}
        >
          <TargetAudienceModal onClose={closeModal} />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "captioncontainer"}
          onRequestClose={closeModal}
        >
          <CaptionContainerModal data={captionData} onClose={closeModal} />
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
