import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../fontScale";

const TitleText = ({ titleText }) => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>{titleText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 48,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize:
      Dimensions.get("window").width > 500 ? getFontSize(84) : getFontSize(42),
    fontFamily: "DBHeaventRounded-Bold",
    textAlign: "center",
    color: "white",
    shadowColor: "#603",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
});

export default TitleText;
