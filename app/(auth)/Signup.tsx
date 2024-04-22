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
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import React, { useState } from "react";
const image = require("../../assets/onBoardingAssets/man.png");
import { Link, useRouter } from "expo-router";
import GoogleOauth from "@/components/oauthProviders/GoogleOauth";
import { StatusBar } from "expo-status-bar";

interface formData {
  name: string;
  email: string;
  password: string;
}

interface verifyData {
  verify: string;
}

const Signup = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [pendingVerification, setPendingVerification] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formData>();
  // const verifyFormControl = useForm<verifyData>();

  const {
    handleSubmit: verifyHandleSubmit,
    control: verifyControl,
    formState: { errors: verifyError },
  } = useForm<verifyData>();

  const SignupHandler = async (data: formData) => {
    const { email, name, password } = data;

    if (!isLoaded) {
      return;
    }
    setIsLoading(!isLoading);
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsLoading(false);
      setPendingVerification(!pendingVerification);
    } catch (err: any) {
      alert(err);
      console.log({ ...err });

      setIsLoading(!isLoading);
    } finally {
      setIsLoading(!isLoading);
    }
  };

  const verifyHandler = async (data: verifyData) => {
    const { verify } = data;
    if (!isLoaded) {
      return;
    }
    setIsLoading(!isLoading);
    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code: verify,
      });
      await setActive({ session: completeSignup.createdSessionId });
      if (isSignedIn) {
        router.replace("/(tabs)/");
      }
    } catch (err: any) {
      alert(err);
    } finally {
      setIsLoading(!isLoading);
    }
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
              Register
            </Text>
          </View>

          {!pendingVerification ? (
            <View style={{ gap: 15, flex: 0.8, padding: 20 }}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Please enter your name",
                  minLength: {
                    value: 3,
                    message: "name should be minimum 3 characters long",
                  },
                }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View>
                    <TextInput
                      value={value}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      placeholder="Name"
                      style={[
                        styles.input,
                        { borderBottomColor: error ? "red" : "white" },
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
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      placeholder="Email"
                      style={[
                        styles.input,

                        { borderBottomColor: error ? "red" : "white" },
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
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      secureTextEntry
                      placeholder="Password"
                      style={[
                        styles.input,
                        { borderBottomColor: error ? "red" : "white" },
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
                  // borderWidth: 0.2,
                  padding: 15,
                  backgroundColor: "#0A87FF",
                  borderRadius: 10,
                  borderColor: "white",
                }}
                onPress={handleSubmit(SignupHandler)}
              >
                <View>
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
                      SIGN UP
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <GoogleOauth />
              {/* <AppleOauth /> */}

              <TouchableOpacity style={{ marginVertical: 15 }}>
                <Link
                  href="/Signin"
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                    fontFamily: "RalewayRegular",
                  }}
                >
                  Already have an account?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                </Link>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ gap: 15, flex: 0.8, padding: 20 }}>
              <Controller
                key={2}
                control={verifyControl}
                rules={{
                  required: "Please enter your verification code",
                }}
                name="verify"
                render={({
                  field: { value, onChange, onBlur },

                  fieldState: { error },
                }) => (
                  <View>
                    <TextInput
                      value={value}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      // secureTextEntry
                      placeholder="enter verification code"
                      style={[
                        styles.input,
                        { borderBottomColor: error ? "red" : "white" },
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
                  // borderWidth: 0.2,
                  padding: 15,
                  backgroundColor: "#0A87FF",
                  borderRadius: 10,
                  borderColor: "white",
                }}
                onPress={verifyHandleSubmit(verifyHandler)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "RalewayBold",
                  }}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
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
