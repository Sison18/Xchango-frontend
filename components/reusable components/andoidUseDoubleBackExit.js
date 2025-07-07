import { useCallback } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function useDoubleBackExit(enabled = true) {
  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;

      let backPressedOnce = false;

      const onBackPress = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        backPressedOnce = true;
        ToastAndroid.show("Press again to exit", ToastAndroid.CENTER);

        setTimeout(() => {
          backPressedOnce = false;
        }, 2000);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [enabled])
  );
}
