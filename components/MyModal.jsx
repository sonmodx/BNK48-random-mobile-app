import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getFontSize } from "../fontScale";

const MyModal = ({
  showModal,
  setShowModal,
  action,
  headerText,
  actionBtnText,
  cancelBtnText,
  warningText,
  informText,
  opacityBackdrop,
}) => {
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${opacityBackdrop})`,
      justifyContent: "center",
      alignItems: "center",
    },
    headerModalText: {
      color: "white",
      fontSize: getFontSize(64),
      lineHeight: 60,
      textAlign: "center",

      fontFamily: "DBHeaventRounded-Bold",
    },
    warningModalText: {
      color: "red",
      fontSize: getFontSize(48),
      fontFamily: "DBHeaventRounded-Bold",
    },
    informModalText: {
      marginTop: 24,
      color: "white",
      fontSize: getFontSize(38),

      fontFamily: "DBHeaventRounded-Bold",
    },
    colModalBtn: {
      marginTop: 48,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
    },
    modalBtnText: {
      fontSize: getFontSize(56),
      color: "white",
      textAlign: "center",
      fontFamily: "DBHeaventRounded-Bold",
    },
    resetBtn: {
      backgroundColor: "rgb(255,10,50)",
      shadowColor: "red",
      shadowOffset: { width: -2, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    cancelBtn: {
      borderWidth: 5,
      borderColor: "white",
    },
    continueBtn: {
      backgroundColor: "#00CC00",
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 24,
      borderRadius: 48,
      justifyContent: "center",
      alignSelf: "stretch",
    },
  });
  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <View style={styles.modal}>
        <Text style={styles.headerModalText}>
          {headerText}
          {"\n"}
          {warningText && (
            <Text style={styles.warningModalText}>{warningText}</Text>
          )}
        </Text>

        <View style={styles.colModalBtn}>
          <TouchableOpacity
            style={[styles.resetBtn, styles.button]}
            onPress={action}
          >
            <Text style={styles.modalBtnText}>{actionBtnText}</Text>
          </TouchableOpacity>
          {cancelBtnText && (
            <TouchableOpacity
              style={[
                cancelBtnText === "Cancel"
                  ? styles.cancelBtn
                  : styles.continueBtn,
                styles.button,
              ]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalBtnText}>{cancelBtnText}</Text>
            </TouchableOpacity>
          )}
        </View>
        {informText && <Text style={styles.informModalText}>{informText}</Text>}
      </View>
    </Modal>
  );
};

export default MyModal;
