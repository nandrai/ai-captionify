import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,

} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/warmUpBrowser";
// import { isLoaded } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const GoogleOauth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
  const [loading, setLoading] = useState(false);

  const googleSignupHandler = React.useCallback(async () => {
    try {
      setLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TouchableOpacity onPress={googleSignupHandler} style={styles.oAuthButtons}>
      <AntDesign
        style={{ color: "blue" }}
        name="googleplus"
        size={24}
        color="black"
      />
      <Text style={{ fontSize: 13, fontFamily: "RalewayRegular" }}>
        Sign up with Google
      </Text>
    </TouchableOpacity>
  );
};
export default GoogleOauth;

const styles = StyleSheet.create({
  oAuthButtons: {
    borderWidth: 0.2,
    padding: 15,
    borderColor: "white",
    borderRadius: 10,
    gap: 10,
    backgroundColor: "white",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
});
