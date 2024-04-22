import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

interface Props {
  item: any;
}

const OnboardingItem = ({ item }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Image
          source={item.image}
          style={[styles.image, { resizeMode: "contain" }]} //can also set { width, resizeMode: "contain" } for dynamic width "consider small image though"
        />
      </View>
      <View style={{ flex: 0.3, gap: 5 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    // height: 200,
    width: 200,
  },
  title: {
    fontWeight: "800",
    fontFamily: "RalewayBold",
    fontSize: 28,
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    fontFamily: "RalewayRegular",
    color: "black",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
