import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { styles } from "./index.style";
import { CardContext } from "../../../CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import Banner from "../../Banner";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PreviewHistory from "../../PreviewHistory";
import TitleText from "../../TitleText";

const FrontCard = () => {
  const [isError, setIsError] = useState(false);
  const {
    setIsFront,
    dispatch,
    imageUri,
    setImageUri,
    setBgImageUri,
    luckyHistory,
    setLuckyHistory,
    numberOfLot,
    setNumberOfLot,
    listLuckyNumber,
    setListLuckyNumber,
    titleText,
    setTitleText,
    checked,
    setChecked,
  } = useContext(CardContext);

  const [showPreviewHistory, setShowPreviewHistory] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImageUri = await AsyncStorage.getItem("profileImage");
        if (storedImageUri && storedImageUri !== "null") {
          setImageUri(storedImageUri);
        }
      } catch (error) {
        console.error("Error loading profile image: ", error);
      }
    };

    loadProfileImage();
  }, []);

  const handleImageUpload = async (aspectW, aspectH, setImage, name) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [aspectW, aspectH],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri);
        await AsyncStorage.setItem(name, selectedAsset.uri);
      }
    } catch (error) {
      console.error("ImagePicker Error:", error);
    }
  };

  const changeToBackCard = async () => {
    const lengthListLot = Number(numberOfLot);
    const splitLuckyNumber = listLuckyNumber
      .trim()
      .split(",")
      .map(Number)
      .sort((a, b) => a - b);
    const filterLuckyNumber = [...new Set(splitLuckyNumber)];
    if (checkError(filterLuckyNumber, lengthListLot)) {
      setIsError(true);
      return;
    }

    let listObjs = [];
    for (let numbers of filterLuckyNumber) {
      listObjs = [...listObjs, { value: numbers, status: "" }];
    }
    // console.log("listObg from frontCard", listObjs);
    dispatch({ type: "SET_LIST_LOT", payload: lengthListLot });
    dispatch({ type: "SET_LUCKY_NUMBERS", payload: listObjs });
    setIsFront(false);
    const infoHistory = {
      titleText: titleText,
      totalEggs: lengthListLot,
      totalLuckyNumbers: filterLuckyNumber.length,
      luckyNumbers: filterLuckyNumber.join(","),
      confirmDateTime: new Date().toString(),
    };
    setLuckyHistory((prev) => [...prev, infoHistory]);
    const storedInfoHistory = [...luckyHistory, infoHistory];
    console.log(storedInfoHistory);
    await AsyncStorage.setItem(
      "luckyHistory",
      JSON.stringify(storedInfoHistory)
    );
  };

  const clearInput = async () => {
    setNumberOfLot("");
    setListLuckyNumber("");
    setTitleText("");
    setImageUri(null);
    setBgImageUri(null);
    await AsyncStorage.setItem("profileImage", JSON.stringify(null));
  };

  function checkError(filterLuckyNumber, lengthListLot) {
    if (
      !numberOfLot ||
      !titleText ||
      lengthListLot > 999 ||
      filterLuckyNumber.length > 24 ||
      !listLuckyNumber ||
      !/^\d+$/.test(numberOfLot) ||
      !/^(\d+)(\s*,\s*\d+)*$/.test(listLuckyNumber) ||
      lengthListLot < filterLuckyNumber.length
    )
      return true;

    //check value in list are more than total number of lottery
    for (let i = 0; i < filterLuckyNumber.length; i++) {
      const val = Number(filterLuckyNumber[i]);
      if (val > lengthListLot) {
        return true;
      }
    }
    return false;
  }

  if (showPreviewHistory)
    return (
      <PreviewHistory
        setShowPreviewHistory={setShowPreviewHistory}
        luckyHistory={luckyHistory}
        titleText={titleText}
      />
    );

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <TitleText titleText={titleText} />
        <View style={styles.frontCard}>
          <Text style={styles.headerText}>Setting</Text>
          <Banner imageUri={imageUri} />
          <View style={styles.form}>
            <View style={styles.inputField}>
              <View>
                <Text style={styles.label}>Upload Banner</Text>
                <Text style={styles.labelCondition}>
                  &#40;1950 x 750 px&#41;
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    handleImageUpload(13, 5, setImageUri, "profileImage")
                  }
                  style={styles.chooseFileBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chooseFileText}>Choose File</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputField}>
              <View>
                <Text style={styles.label}>Upload Custom Background</Text>
                <Text style={styles.labelCondition}>
                  &#40;1488 x 2266 px&#41;
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    handleImageUpload(4, 6.1, setBgImageUri, "backgroundImage")
                  }
                  style={styles.chooseFileBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chooseFileText}>Choose File</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Title Text</Text>

              <TextInput
                style={styles.input}
                onChangeText={(newText) => setTitleText(newText)}
                value={titleText}
                placeholder=""
              />
            </View>
            <View style={styles.inputField}>
              <View>
                <Text style={styles.label}>Total Eggs</Text>
                <Text style={styles.labelCondition}>&#40;1 - 999&#41;</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => setNumberOfLot(newText)}
                value={numberOfLot}
                placeholder=""
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputField}>
              <View>
                <Text style={styles.label}>Lucky Number</Text>
                <Text style={styles.labelCondition}>
                  &#40;up to 24 Numbers&#41;
                </Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => setListLuckyNumber(newText)}
                value={listLuckyNumber}
                placeholder="1, 2, 3, 4"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Hide Number</Text>
              <BouncyCheckbox
                size={36}
                fillColor="#660033"
                unfillColor="#FFFFFF"
                isChecked={checked}
                innerIconStyle={{ borderWidth: 3 }}
                disableBuiltInState
                onPress={() => setChecked((prev) => !prev)}
              />
            </View>
            {isError && <Text style={styles.error}>Wrong input!</Text>}
            <View style={styles.groupBtn}>
              <TouchableOpacity
                onPress={changeToBackCard}
                style={[styles.confirmBtn, styles.primaryBtn]}
                activeOpacity={0.6}
              >
                <Text style={styles.primaryText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={clearInput}
                style={[styles.clearBtn, styles.primaryBtn]}
                activeOpacity={0.6}
              >
                <Text style={styles.primaryText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowPreviewHistory(true);
                }}
                style={[styles.historyBtn, styles.primaryBtn]}
                activeOpacity={0.6}
              >
                <Text style={[styles.primaryText, styles.historyBtnText]}>
                  Export History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FrontCard;
