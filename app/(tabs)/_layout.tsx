import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          // height: 60,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "#020016",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black" ? "white" : "white",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => <TabBarIcon name="photo" color={color} />,
        }}
      />
      <Tabs.Screen
        name="UserProfile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
