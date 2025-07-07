import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(welcome-page)/welcome"
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="(authentications)"
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="(trade-add-item)/addItem"
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
