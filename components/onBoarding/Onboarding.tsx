import { View, StyleSheet, FlatList, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import onboardingSlides from "@/onboardingSlides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (slidesRef.current) {
      // Add null check here
      if (currentIndex < onboardingSlides.length - 1) {
        slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      } else {
        try {
          await AsyncStorage.setItem("@viewedOnboarding", "true");
          router.replace("/(auth)/Signin");
        } catch (err: any) {
          console.log("error setting onboarding", err);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ flex: 3 }}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          data={onboardingSlides}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={onboardingSlides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / onboardingSlides.length)}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#211134"
  },
});
