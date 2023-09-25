import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { getFontSize } from "../fontScale";

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

export default function Ball({
  randomNumber,
  isMatch,
  handleNewDraw,
  isLucky,
  isHide,
  sound,
  playSound,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    bounce.value = withRepeat(withTiming(1.25, { duration: 600 }), -1, true);
  }, []);

  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const size = useSharedValue(1);
  const bounce = useSharedValue(1);
  const opacity2 = useSharedValue(0);
  const opacityAppear = useSharedValue(0);
  const opacityNumber = useSharedValue(0);
  const opacityFlowground = useSharedValue(0);
  const rotationFlowground = useSharedValue(0);
  const opacityImg = useSharedValue(0);

  const animatedTextBounce = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }],
  }));

  const animatedTextAppear = useAnimatedStyle(() => ({
    opacity: opacityAppear.value,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }, { rotateZ: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const animatedNumber = useAnimatedStyle(() => ({
    opacity: opacityNumber.value,
  }));

  const animatedFlowground = useAnimatedStyle(
    () => ({
      opacity: opacityFlowground.value,
      transform: [{ rotateZ: `${rotationFlowground.value}deg` }],
    }),
    [rotationFlowground.value]
  );

  const animatedImg = useAnimatedStyle(() => ({
    opacity: opacityImg.value,
  }));

  const handlePress = () => {
    if (isAnimating) {
      setIsButtonDisabled(true);
      rotation.value = withSpring(0);
      opacity.value = withSpring(1);
      opacityAppear.value = withSpring(0);
      size.value = withSpring(1);
      opacity2.value = withSpring(0);

      opacityNumber.value = withSpring(0);
      opacityFlowground.value = withSpring(0);
      rotationFlowground.value = withSpring(0);
      opacityImg.value = withSpring(0);
      console.log("Unloading Sound");
      sound.unloadAsync();
      handleNewDraw();
      // cancelAnimation(rotationFlowground);
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsAnimating(false);
      }, 1000);
    } else if (!isAnimating && !isButtonDisabled) {
      playSound();
      setIsAnimating(true);
      setIsButtonDisabled(true);

      rotation.value = withSequence(
        withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          7,
          true
        ),
        withTiming(0, { duration: TIME / 2, easing: EASING })
      );

      opacity.value = withDelay(800, withTiming(0, { duration: 1000 }));
      setTimeout(() => {
        size.value = withTiming(100, {
          duration: 500,
          easing: Easing.ease,
        });
      }, 800);

      opacity2.value = withDelay(800, withTiming(1, { duration: 1000 }));

      setTimeout(() => {
        opacity2.value = withTiming(0, { duration: 1000 });
      }, 1800);

      setTimeout(() => {
        opacityNumber.value = withTiming(1, { duration: 500 });

        isMatch();
      }, 2800);

      setTimeout(() => {
        opacityFlowground.value = withTiming(1, { duration: 500 });
        opacityImg.value = withTiming(1, { duration: 500 });
        rotationFlowground.value = withRepeat(
          withTiming(360, { duration: 7000, easing: Easing.linear }),
          -1,
          false
        );
      }, 3200);

      setTimeout(() => {
        setIsButtonDisabled(false);
        opacityAppear.value = withDelay(2000, withTiming(1, { duration: 500 }));
      }, 4500); // 8000 คือระยะเวลาของ animation ทั้งหมด
    }
  };

  // console.log("hegiht", Dimensions.get("screen").height);
  // console.log("w", Dimensions.get("screen").width);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bg, animatedStyle2]} />
      <TouchableOpacity onPress={handlePress} disabled={isButtonDisabled}>
        <Animated.Image
          source={require("../assets/Ball_Full.png")}
          style={[styles.box, animatedStyle]}
        />
      </TouchableOpacity>

      {!isAnimating && (
        <View style={styles.hand}>
          <Image
            source={require("../assets/Hand.png")}
            style={styles.handImage}
          />
        </View>
      )}

      <View style={styles.luckyDisplay}>
        <Animated.Image
          source={
            isLucky
              ? require("../assets/LuckyText.png")
              : require("../assets/SorryText.png")
          }
          style={[styles.img, animatedImg]}
        />
        <Animated.View
          style={[
            styles.boxNumber,
            animatedNumber,
            isLucky && { backgroundColor: "#FFFF00" },
          ]}
        >
          {!isHide ? (
            <Animated.Text style={[styles.number, animatedNumber]}>
              {randomNumber}
            </Animated.Text>
          ) : isLucky ? (
            <Image
              source={require("../assets/Emoji-Lucky.png")}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/Emoji-Sorry.png")}
              style={styles.image}
            />
          )}
        </Animated.View>
      </View>
      {!isAnimating ? (
        <Animated.Text style={[styles.text, animatedTextBounce]}>
          Tab to open
        </Animated.Text>
      ) : (
        <Animated.Text style={[styles.textGoNext, animatedTextAppear]}>
          Tab to go next
        </Animated.Text>
      )}
      {isLucky && (
        <Animated.Image
          source={require("../assets/LightShineNEW2.png")}
          style={[styles.flowground, animatedFlowground]}
        />
      )}
    </View>
  );
}

const BASE_MODERATE = Dimensions.get("window").width * 0.4;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: BASE_MODERATE,
    width: BASE_MODERATE,
  },

  bg: {
    position: "absolute",
    height: Dimensions.get("screen").height * 2,
    width: Dimensions.get("screen").width * 2,
    backgroundColor: "#FFFFFF",
  },
  number: {
    color: "#660033",
    fontSize: BASE_MODERATE / 1.5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 0,
    margin: 0,
    fontFamily: "DBHeaventRounded-Bold",
  },
  boxNumber: {
    height: BASE_MODERATE,
    width: BASE_MODERATE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    backgroundColor: "#FFFFFF",
    borderColor: "#660033",
    borderRadius: BASE_MODERATE,
    borderWidth: BASE_MODERATE / 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  flowground: {
    position: "absolute",
    zIndex: -2,
    height: BASE_MODERATE * 4,
    width: BASE_MODERATE * 4,
  },
  luckyDisplay: {
    zIndex: -1,
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  img: {
    position: "absolute",
    width: BASE_MODERATE,
    height: BASE_MODERATE / 2,
    resizeMode: "contain",
    top: (BASE_MODERATE / 3) * -1,
    bottom: 0,
  },
  hand: {
    position: "absolute",
    top: BASE_MODERATE / 2,
    left: (BASE_MODERATE * 3) / 4,
    zIndex: 0,
    pointerEvents: "none",
  },
  handImage: {
    width: (BASE_MODERATE * 3) / 5,
    height: (BASE_MODERATE * 3) / 6,
    resizeMode: "contain",
  },
  text: {
    fontSize: getFontSize(48),
    color: "white",
    fontWeight: "bold",
    fontFamily: "DBHeaventRounded-Bold",
  },
  textGoNext: {
    fontSize: getFontSize(48),
    color: "white",
    fontWeight: "bold",
    fontFamily: "DBHeaventRounded-Bold",
    marginTop: BASE_MODERATE / 4,
    opacity: 0,
  },
});
