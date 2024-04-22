import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-expo";
import React, { useState } from "react";
const image = require("../../assets/onBoardingAssets/man.png");
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import GoogleOauth from "@/components/oauthProviders/GoogleOauth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface formData {
  email: string;
  password: string;
}

const Signin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const { height, width } = useWindowDimensions();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formData>();

  const SigninHandler = async (data: formData) => {
    const { email, password } = data;
    if (!isLoaded) {
      return;
    }
    setIsLoading(!isLoading);

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password: password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      setIsLoading(!isLoading);
      alert({ ...err });
      console.log(err);
    } finally {
      setIsLoading(!isLoading);
    }
  };

  const clerAsyncStorage = () => {
    AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <SafeAreaView
        style={{ flex: 0.4, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: height - 500, width: width - 50 }}
            resizeMode="cover"
            source={image}
          />
        </View>
      </SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: "#020016",
          flex: 0.6,
        }}
      >
        <KeyboardAvoidingView>
          <View
            style={{ flex: 0.2, justifyContent: "center", marginVertical: 5 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                color: "white",
                fontWeight: "600",
                fontFamily: "RalewayBold",
              }}
            >
              Sign In
            </Text>
          </View>
          <View style={{ gap: 15, flex: 0.8, padding: 20 }}>
            <Controller
              control={control}
              rules={{
                required: "Please enter a valid email",
                minLength: {
                  value: 3,
                  message: "email should be minimum 3 characters long",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }}
              name="email"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Email"
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
                required: "Please enter your password",
                minLength: {
                  value: 3,
                  message: "password should be minimum 3 characters long",
                },
              }}
              name="password"
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
                    placeholder="Password"
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
              onPress={handleSubmit(SigninHandler)}
            >
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "RalewayBold",
                  }}
                >
                  LOG IN
                </Text>
              )}
            </TouchableOpacity>

            <GoogleOauth />
            {/* <AppleOauth /> */}

            <TouchableOpacity style={{ marginVertical: 15 }}>
              <Link
                href="/Signup"
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontFamily: "RalewayRegular",
                }}
              >
                Don't have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
                {/* <TouchableOpacity onPress={clerAsyncStorage}>
                  <Text style={{ color: "white" }}>Clear Storage</Text>
                </TouchableOpacity> */}
              </Link>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "white",
    fontFamily: "RalewayRegular",
    borderRadius: 10,
  },
  oAuthButtons: {
    alignItems: "center",
    borderWidth: 0.2,
    padding: 15,
    borderColor: "white",
    borderRadius: 10,
    gap: 2,
    backgroundColor: "white",
  },
});
