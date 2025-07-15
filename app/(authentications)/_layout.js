import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";

export default function AuthenticationsLayout() {
  useDoubleBackExit();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </View>
  );
}
