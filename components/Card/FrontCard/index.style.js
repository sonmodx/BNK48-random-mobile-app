import { Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../../../fontScale";

const MAIN_COLOR = "#603";

export const styles = StyleSheet.create({
  frontCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 5,
    borderColor: MAIN_COLOR,
    paddingHorizontal: 48,
    marginBottom: 96,
  },

  headerText: {
    fontSize: getFontSize(62),
    textAlign: "center",
    color: MAIN_COLOR,
    marginTop: 16,
    fontFamily: "DBHeaventRounded-Bold",
  },

  form: {
    marginTop: 16,
  },
  inputField: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: {
    fontSize: getFontSize(32),

    lineHeight: 32,
    color: MAIN_COLOR,
    fontFamily: "DBHeaventRounded-Bold",
  },
  labelCondition: {
    fontSize: getFontSize(24),
    color: MAIN_COLOR,
    fontFamily: "DBHeaventRounded-Bold",
  },
  input: {
    height: 50,
    width: Dimensions.get("window").width * 0.3,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#E2E2E2",
    fontWeight: "bold",
    fontSize: getFontSize(32),
    fontFamily: "DBHeaventRounded-Bold",
  },
  chooseFileBtn: {
    backgroundColor: MAIN_COLOR,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },

  chooseFileText: {
    fontSize: getFontSize(20),
    color: "white",
    fontFamily: "DBHeaventRounded-Bold",
  },
  groupBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    gap: 10,
    flexWrap: "wrap",
  },
  primaryBtn: {
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 32,
    borderWidth: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
  primaryText: {
    color: "#fff",
    fontSize:
      Dimensions.get("window").width > 500 ? getFontSize(28) : getFontSize(24),
    letterSpacing: 1.2,
    fontFamily: "DBHeaventRounded-Bold",
    textAlign: "center",
  },
  confirmBtn: {
    backgroundColor: "#00CC00",
  },
  clearBtn: { backgroundColor: "red" },
  historyBtn: {
    backgroundColor: "yellow",
  },
  historyBtnText: {
    color: "#603",
  },
  error: {
    color: "red",
    fontSize: getFontSize(28),
    textAlign: "center",
    fontFamily: "DBHeaventRounded-Bold",
  },
});
