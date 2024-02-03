import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

import { NativeRouter, Route, Link, Routes } from "react-router-native";
import RouteView from "./views/RouteView";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    heading: require("./assets/fonts/Visby-CF/Fontspring-DEMO-visbycf-extrabold.otf"),
    body: require("./assets/fonts/Visby-CF/Fontspring-DEMO-visbycf-bold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View
      style={{
        height: "100%",
      }}
      onLayout={onLayoutRootView}
    >
      <NativeRouter>
        <Routes>
          <Route path="/" Component={RouteView}></Route>
        </Routes>
      </NativeRouter>
    </View>
  );
}
