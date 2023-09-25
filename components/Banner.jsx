import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getFontSize } from "../fontScale";

const Banner = ({ imageUri, isBackCard }) => {
  if (isBackCard && !imageUri) return;
  return (
    <View style={styles.banner}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={
            isBackCard
              ? [styles.imageBanner, styles.border]
              : styles.imageBanner
          }
        />
      ) : (
        <Text style={styles.addBanner}>+</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    aspectRatio: 13 / 5,
    backgroundColor: "#E2E2E2",
    borderRadius: 16,
    justifyContent: "center",
    marginTop: 16,
  },
  addBanner: {
    textAlign: "center",
    fontSize: getFontSize(48),
    color: "#603",
  },
  imageBanner: {
    width: "100%",
    aspectRatio: 13 / 5,
    borderRadius: 16,
  },
  border: {
    borderWidth: 4,
    borderColor: "#603",
  },
});

export default Banner;
