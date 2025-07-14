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
      <Stack //UPDATED sean
      initialRouteName="login"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
       <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
    </View>
  );
}
