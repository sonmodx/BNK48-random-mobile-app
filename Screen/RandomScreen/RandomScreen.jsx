import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import Card from "../../components/Card/Card";
import { getFontSize } from "../../fontScale";

const RandomScreen = ({ navigation }) => {
  const [bgImageUri, setBgImageUri] = useState(null);
  return (
    <ImageBackground
      source={
        bgImageUri ? { uri: bgImageUri } : require("../../assets/random-bg.png")
      }
    >
      <View style={styles.randomApp}>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>&copy; iAM</Text>
        </View>
        <View style={styles.blackfadeTop}>
          <Image
            source={require("../../assets/blackfade-bottom.png")}
            resizeMode="cover"
            style={styles.blackfadeImageTop}
          />
        </View>
        <View style={styles.container} showsVerticalScrollIndicator={false}>
          <Card
            navigation={navigation}
            bgImageUri={bgImageUri}
            setBgImageUri={setBgImageUri}
          />
        </View>
        <View style={styles.blackfade}>
          <Image
            source={require("../../assets/blackfade-bottom.png")}
            resizeMode="cover"
            style={styles.blackfadeImage}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  randomApp: {
    minHeight: "100%",
    fontSize: getFontSize(18),
    fontWeight: "400",
    color: "#000",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",
    display: "flex",
    alignItems: "center",
  },
  copyright: {
    position: "absolute",
    zIndex: 99,
    top: 20,
    left: 20,
  },

  copyrightText: {
    fontSize: getFontSize(20),
    color: "white",
  },
  container: {
    width: "90%",
    marginHorizontal: "auto",
  },

  blackfade: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  blackfadeImage: {
    width: "100%",
  },
  blackfadeTop: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    transform: [{ rotate: "180deg" }],
    opacity: 0.45,
  },
  blackfadeImageTop: {
    width: "100%",
  },
});

export default RandomScreen;
