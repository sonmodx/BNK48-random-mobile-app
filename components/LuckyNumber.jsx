import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { getFontSize } from "../fontScale";

const LuckyNumber = ({ value, status, isHide }) => {
  return (
    <View
      style={
        status === "none" ? [styles.circle, styles.greyCircle] : styles.circle
      }
    >
      {isHide ? (
        <Image
          source={require("../assets/Emoji-Lucky.png")}
          style={styles.image}
        />
      ) : (
        <Text
          style={
            status === "none"
              ? [styles.circleText, styles.whilteText]
              : styles.circleText
          }
        >
          {value}
        </Text>
      )}
    </View>
  );
};
const BASE_MODERATE = Dimensions.get("window").width > 500 ? 52 : 38;

const styles = StyleSheet.create({
  circle: {
    width: BASE_MODERATE,
    height: BASE_MODERATE,
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: "#660033",
    backgroundColor: "#FFFF00",
    alignItems: "center",
    justifyContent: "center",
  },
  greyCircle: {
    backgroundColor: "#666666",
  },
  circleText: {
    color: "#660033",
    fontWeight: "bold",
    fontSize: getFontSize(28),
    fontFamily: "DBHeaventRounded-Bold",
  },
  whilteText: {
    color: "white",
  },
  image: {
    height: (BASE_MODERATE / 4) * 3,
    aspectRatio: 1,
  },
});

export default LuckyNumber;
