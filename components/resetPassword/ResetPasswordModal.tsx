import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Controller, useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
};

interface resetPasswordData {
  currentPassword: string;
  newPassword: string;
}

const ResetPasswordModal = ({ onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoaded } = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<resetPasswordData>();

  if (!isLoaded) {
    return;
  }

  const resetPasswordHandler = async (data: resetPasswordData) => {
    const { currentPassword, newPassword } = data;
    try {
      setIsLoading(!isLoading);
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      setIsLoading(false);
      alert("Password upadted!");
    } catch (err: any) {
      setIsLoading(false);
      alert("failed updating password");
    } finally {
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}></View>
      <ScrollView
        bounces={false}
        style={{ flex: 0.6, backgroundColor: "#1B1C20" }}
      >
        <KeyboardAvoidingView>
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
                <Entypo name="lock" size={30} color="#a2aba5" />
              </View>
              <TouchableOpacity onPress={onClose}>
                <Text
                  style={{
                    color: "#f55347",
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
                Reset Password{" "}
              </Text>
            </View>
            {/* Data here */}
            <Controller
              control={control}
              rules={{
                required: "Please enter a valid password",
                minLength: {
                  value: 3,
                  message: "password should be minimum 3 characters long",
                },
              }}
              name="currentPassword"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="current password"
                    style={[
                      styles.input,
                      {
                        borderBottomColor: error ? "red" : "white",
                        color: "white",
                      },
                    ]}
                    placeholderTextColor={"white"}
                  />
                  {error && (
                    <Text style={{ color: "red" }}>
                      {error.message || "error"}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              rules={{
                required: "Please enter a valid new password",
                minLength: {
                  value: 3,
                  message: "password should be minimum 3 characters long",
                },
              }}
              name="newPassword"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="new password"
                    style={[
                      styles.input,
                      {
                        borderBottomColor: error ? "red" : "white",
                        color: "white",
                      },
                    ]}
                    placeholderTextColor={"white"}
                  />
                  {error && (
                    <Text style={{ color: "red" }}>
                      {error.message || "error"}
                    </Text>
                  )}
                </View>
              )}
            />
            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: "#0A87FF",
                borderRadius: 10,
                borderColor: "white",
              }}
              onPress={handleSubmit(resetPasswordHandler)}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "RalewayBold",
                  }}
                >
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "white",
    fontFamily: "RalewayRegular",
    borderRadius: 10,
  },
});
