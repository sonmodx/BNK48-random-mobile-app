import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getFontSize } from "../fontScale";

const PreviewHistory = ({ setShowPreviewHistory, luckyHistory }) => {
  const handleExportTXT = async () => {
    const txtData = formattedData(luckyHistory);
    const path = `${FileSystem.cacheDirectory}randomHistory.txt`; // Use cacheDirectory for temporary files

    try {
      await FileSystem.writeAsStringAsync(path, txtData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const sharingResult = await Sharing.shareAsync(path);

      if (Sharing.isAvailableAsync()) {
        console.log("TEXT file shared successfully.");
      }
    } catch (error) {
      console.error("Error sharing TEXT file:", error);
    }
  };
  const formattedData = (luckyHistory) => {
    let res = "";
    const equalSign = "=".repeat(52);
    const dashSign = "-".repeat(70);
    const slashSign = "/".repeat(104);
    const startRound = `${equalSign}\n${slashSign}\n${slashSign}\n${slashSign}\n${equalSign}`;

    for (let i = 0; i < luckyHistory.length; i++) {
      if (luckyHistory[i].hasOwnProperty("confirmDateTime")) {
        res += `${startRound}\n>>> ${luckyHistory[i].titleText} <<<\n${equalSign}\nTotal Eggs : ${luckyHistory[i].totalEggs}\nTotal Lucky Number(s) : ${luckyHistory[i].totalLuckyNumbers}\nLucky Number(s) : ${luckyHistory[i].luckyNumbers}\nConfirmation Date/Time : ${luckyHistory[i].confirmDateTime}\n${equalSign}\nCount || Number Get || Result || Date/Time || Lucky Left || Egg Left\n${dashSign}\n`;
      } else {
        res += `${luckyHistory[i].count.padEnd(3)} || ${luckyHistory[
          i
        ].number.padEnd(3)} || ${luckyHistory[i].isLucky.padEnd(6)} || ${
          luckyHistory[i].timestamp
        } || ${luckyHistory[i].luckyLeft} || ${luckyHistory[i].eggLeft}\n`;
      }
    }

    return res;
  };
  return (
    <View>
      <View style={styles.rowBtn}>
        <TouchableOpacity
          onPress={() => {
            setShowPreviewHistory(false);
          }}
          style={styles.btn}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleExportTXT}
          style={[styles.btn, styles.exportBtn]}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>Export History</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.previewHistory}>
        <View style={styles.previewHistoryContent}>
          <Text>{formattedData(luckyHistory)}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  previewHistory: {
    flex: 1,
    minHeight: (Dimensions.get("window").height / 3) * 2,
    borderWidth: 3,
    borderRadius: 36,
    borderColor: "#603",
    backgroundColor: "#FFFFFFFF",
  },
  previewHistoryContent: {
    padding: 16,
  },
  rowBtn: {
    marginTop: 52,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 10,
    borderRadius: 28,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "white",
  },
  exportBtn: {
    backgroundColor: "yellow",
  },
  btnText: {
    color: "#603",
    fontSize:
      Dimensions.get("window").width > 500 ? getFontSize(28) : getFontSize(16),
    letterSpacing: 1.2,
    fontFamily: "DBHeaventRounded-Bold",
  },
});

export default PreviewHistory;
