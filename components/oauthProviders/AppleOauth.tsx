import React, { useState } from "react";
import {
  //   View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  //   SafeAreaView,
  //   TextInput,
} from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { Button } from "react-native";
// import AppleIcon from "react-native-vector-icons/FontAwesome";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/warmUpBrowser";
// import { isLoaded } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const AppleOauth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
  const [loading, setLoading] = useState(false);

  const appleSignupHandler = React.useCallback(async () => {
    try {
      setLoading(true);
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({});

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TouchableOpacity onPress={appleSignupHandler} style={styles.oAuthButtons}>
      <AntDesign
        style={{ color: "silver" }}
        name="apple1"
        size={24}
        color="black"
      />
      <Text style={{ fontSize: 13, fontFamily: "RalewayRegular" }}>
        Sign up with Apple
      </Text>
    </TouchableOpacity>
  );
};
export default AppleOauth;

const styles = StyleSheet.create({
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
