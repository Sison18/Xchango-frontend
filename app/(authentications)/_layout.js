import { StatusBar, View } from "react-native";
import { Stack } from "expo-router";
import useDoubleBackExit from "../../components/reusable components/andoidUseDoubleBackExit";

export default function AuthenticationsLayout() {
  useDoubleBackExit();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </View>
  );
}
