import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./index.style";
import { CardContext } from "../../../CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LuckyNumber from "../../LuckyNumber";
import Banner from "../../Banner";
import MyModal from "../../MyModal";
import Ball from "../../Ball";
import { Audio } from "expo-av";
import TitleText from "../../TitleText";

const BackCard = () => {
  const {
    setIsFront,
    dispatch,
    state,
    setLuckyHistory,
    luckyHistory,
    imageUri,
    titleText,
    checked,
  } = useContext(CardContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLucky, setIsLucky] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [countLuckyNumber, setCountLuckyNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [sound, setSound] = useState();
  useEffect(() => {
    if (countLuckyNumber === state.luckyNumbers.length && !isOpen) {
      setShowModal(true);
      setCountLuckyNumber(0);
    }
  }, [countLuckyNumber, isOpen]);

  useEffect(() => {
    if (state.listLot.length === 0 && !isOpen) {
      setIsEnd(true);
    }
  }, [state.listLot.length, isOpen]);

  const reset = () => {
    setIsFront(true);

    setIsOpen(false);
    saveHistory();
    dispatch({ type: "RESET" });
  };

  const isMatch = () => {
    setCount((prev) => prev + 1);
    const _randomIndex = Math.floor(Math.random() * state.listLot.length);
    const _randomNumber = parseInt(state.listLot[_randomIndex]);
    let _totalWinner = state.totalWinners;
    dispatch({ type: "SET_RANDOM_NUMBER", payload: _randomNumber });
    setIsOpen(true);
    const newListLot = state.listLot.filter((num) => num !== _randomNumber);
    dispatch({ type: "UPDATE_LIST_LOT", payload: newListLot });
    console.log("random", _randomNumber);
    const _isLucky = state.luckyNumbers.find(
      (lucky) => lucky.value === _randomNumber
    );
    if (_isLucky) {
      dispatch({ type: "SET_WINNERS" });

      _totalWinner += 1;
      console.log(_randomNumber);
      setCountLuckyNumber((prev) => prev + 1);
      setIsLucky(true);
      const updatedLuckyList = state.luckyNumbers.map((lucky) => {
        if (lucky.value === _randomNumber) {
          return { ...lucky, status: "none" };
        }
        return lucky;
      });

      dispatch({ type: "SET_LUCKY_NUMBERS", payload: updatedLuckyList });
    } else {
      setIsLucky(false);
    }
    resultSound(_isLucky);
    const newHistoryEntry = {
      number: _randomNumber.toString(),
      isLucky: _isLucky ? "Lucky!" : "Sorry",
      timestamp: new Date().toString(),
      count: `${count + 1}`,
      luckyLeft: state.luckyNumbers.length - _totalWinner,
      eggLeft: state.listLot.length - 1,
    };

    setLuckyHistory((prev) => [...prev, newHistoryEntry]);
  };

  const handleNewDraw = () => {
    setIsOpen(false);
  };

  const saveHistory = async () => {
    try {
      // await AsyncStorage.removeItem("luckyHistory");

      await AsyncStorage.setItem("luckyHistory", JSON.stringify(luckyHistory));
      console.log("CELAMUNG");
    } catch (error) {
      console.error("Error storing lucky history:", error);
    }
  };

  //Sound Effect

  const resultSound = async (lucky) => {
    console.log("Loading Sound");
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const _sound = new Audio.Sound();
    try {
      if (lucky) {
        await _sound.loadAsync(require("../../../audio/lucky.mp3"));
      } else {
        await _sound.loadAsync(require("../../../audio/sorry.mp3"));
      }
      setSound(_sound);
      await _sound.playAsync();
    } catch (err) {
      console.error("Error play sound: ", err);
    }
  };

  const playSound = async () => {
    console.log("Loading Sound");
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const _sound = new Audio.Sound();
    try {
      await _sound.loadAsync(require("../../../audio/animatedRandom.mp3"));
      setSound(_sound);
      await _sound.playAsync();
    } catch (err) {
      console.error("Error play sound: ", err);
    }
  };

  return (
    <View style={styles.backCard}>
      <MyModal
        showModal={showResetModal}
        setShowModal={setShowResetModal}
        action={reset}
        headerText={`Ending Session${"\n"}Are you sure?`}
        warningText="*cannot be undone"
        actionBtnText="End"
        cancelBtnText="Cancel"
        opacityBackdrop={0.9}
      />
      <MyModal
        showModal={isEnd}
        action={reset}
        headerText={`No more egg${"\n"}for this round`}
        actionBtnText="Go Setting"
        opacityBackdrop={0.9}
      />
      <MyModal
        showModal={showModal}
        setShowModal={setShowModal}
        action={reset}
        headerText={`All Lucky Numbers${"\n"}have been picked`}
        actionBtnText="End"
        cancelBtnText="Continue"
        informText="0% Lucky Chance"
        opacityBackdrop={0.8}
      />
      <View style={styles.reset}>
        <TouchableOpacity
          onPress={() => {
            setShowResetModal(true);
          }}
        >
          <Image
            source={require("../../../assets/reset-btn.png")}
            style={styles.iconReset}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.refNumber}>
        {isOpen && (
          <Text style={styles.refNumberText}>Ref = {state.randomNumber}</Text>
        )}
      </View>
      <View style={styles.header}>
        <TitleText titleText={titleText} />
        <Banner imageUri={imageUri} isBackCard={true} />
      </View>
      <View style={styles.section}>
        <Ball
          randomNumber={state.randomNumber}
          isMatch={isMatch}
          handleNewDraw={handleNewDraw}
          isLucky={isLucky}
          isHide={checked}
          sound={sound}
          playSound={playSound}
        />
      </View>

      <View style={styles.luckyNumbers}>
        <View style={styles.headerLuckyNumbers}>
          <Text style={styles.headerLuckyNumbersText}>
            Lucky Number&#40;s&#41;
          </Text>
        </View>
        <View style={styles.luckyNumbersFlex}>
          {state.luckyNumbers.map(({ value, status }, idx) => (
            <LuckyNumber
              key={idx}
              value={value}
              status={status}
              isHide={checked}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default BackCard;
