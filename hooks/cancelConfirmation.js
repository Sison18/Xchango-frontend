import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler, Platform } from "react-native";

export default function useBackConfirmation(
  message = "Are you sure you want to cancel?"
) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") return;

      const onBackPress = () => {
        Alert.alert("Cancel confirmation", message, [
          { text: "No", style: "cancel" },
          { text: "Yes", onPress: () => navigation.goBack() },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [message, navigation])
  );
}
