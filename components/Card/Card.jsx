import React, { useEffect, useReducer, useState } from "react";
import { ScrollView, View } from "react-native";
import { CardContext } from "../../CardContext";
import { INIT_STATE, reducer } from "../../reducer";
import FrontCard from "./FrontCard/FrontCard";
import BackCard from "./BackCard/BackCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Card = ({ navigation, bgImageUri, setBgImageUri }) => {
  const [isFront, setIsFront] = useState(true);
  const [luckyHistory, setLuckyHistory] = useState([]);
  const [numberOfLot, setNumberOfLot] = useState("");
  const [listLuckyNumber, setListLuckyNumber] = useState("");
  const [titleText, setTitleText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    // โหลดประวัติการสุ่มจาก AsyncStorage เมื่อโหลดหน้าจอ
    const loadLuckyHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("luckyHistory");

        if (storedHistory) {
          setLuckyHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Error loading lucky history:", error);
      }
    };

    loadLuckyHistory();
  }, []);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return (
    <View>
      <CardContext.Provider
        value={{
          setIsFront,
          dispatch,
          state,
          luckyHistory,
          setLuckyHistory,
          imageUri,
          setImageUri,
          bgImageUri,
          setBgImageUri,
          numberOfLot,
          setNumberOfLot,
          listLuckyNumber,
          setListLuckyNumber,
          titleText,
          setTitleText,
          checked,
          setChecked,
        }}
      >
        {isFront ? <FrontCard /> : <BackCard />}
      </CardContext.Provider>
    </View>
  );
};

export default Card;
