import { StatusBar } from "expo-status-bar";
import RandomScreen from "./Screen/RandomScreen/RandomScreen";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "DBHeaventRounded-Bold": require("./assets/fonts/DBHeaventRounded-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <StatusBar style="auto" hidden={true} />
      <RandomScreen />
    </View>
  );
}
