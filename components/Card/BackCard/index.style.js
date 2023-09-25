import { StyleSheet } from "react-native";
import { getFontSize } from "../../../fontScale";
export const styles = StyleSheet.create({
  // Add styles here, copying from the previous styles constant
  backCard: {
    // Add other common styles here
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  reset: {
    position: "absolute",
    zIndex: 99,
    top: 20,
    right: -10,

    // Add styles for reset button
  },
  iconReset: {
    height: 38,
    aspectRatio: 1,
  },

  refNumber: {
    position: "absolute",
    zIndex: 99,
    bottom: 10,
    left: 10,
  },

  refNumberText: {
    color: "grey",
    fontSize: getFontSize(28),
    fontFamily: "DBHeaventRounded-Bold",
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  section: {
    alignItems: "center",
  },
  tabBox: {
    marginTop: 12,
  },
  tab: {
    backgroundColor: "blanchedalmond",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 20,
    borderStyle: "dashed",
  },
  newDraw: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#121212",

    marginTop: 25,
  },

  newDrawText: {
    fontSize: getFontSize(32),
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "DBHeaventRounded-Bold",
  },

  blueText: {
    color: "#00bfff",
    fontFamily: "DBHeaventRounded-Bold",
  },

  lottery: {
    alignItems: "center",
    backgroundColor: "blanchedalmond",
    padding: 8,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  luckyNumbers: {
    gap: 16,
    width: "100%",
    marginHorizontal: "auto",
  },

  headerLuckyNumbers: {
    alignItems: "center",
  },

  headerLuckyNumbersText: {
    fontSize: getFontSize(32),
    color: "white",
    shadowColor: "#603",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    fontFamily: "DBHeaventRounded-Bold",
  },

  luckyNumbersFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
