import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";

export default function AuthenticationsLayout() {
  useDoubleBackExit();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" translucent />

      <Stack
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {/* ✅ Screens must go INSIDE the Stack */}
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="fillup" />
      </Stack>
    </View>
  );
}
