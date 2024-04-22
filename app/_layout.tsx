import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useAuth, ClerkProvider } from "@clerk/clerk-expo";
import DataContext from "@/components/hooks/DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err: any) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err: any) {
      return;
    }
  },
};

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    RalewayRegular: require("../assets/fonts/Raleway-Static/Raleway-Regular.ttf"),
    RalewaySemibold: require("../assets/fonts/Raleway-Static/Raleway-SemiBold.ttf"),
    RalewayBold: require("../assets/fonts/Raleway-Static/Raleway-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <DataContext>
          <RootLayoutNav />
        </DataContext>
      </ClerkProvider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (!value) {
        router.replace("/onboarding");
      }
    } catch (err: any) {
      console.log("error in onboarding", err);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace("/(tabs)/");
      } else if (!isSignedIn) {
        router.replace("/(auth)/Signin");
        checkOnboarding();
        // router.replace("/onboarding");
      }
    }
  }, [isSignedIn]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Signin" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
