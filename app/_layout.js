import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* ALL WELCOME */}
      <Stack.Screen
        name="(welcome-page)/welcome"
        options={{
          gestureEnabled: false,
        }}
      />
      {/* ALL AUTH */}
      <Stack.Screen
        name="(authentications)"
        options={{
          gestureEnabled: false,
        }}
      />
      {/* ALL BOTTOM TABS */}
      <Stack.Screen
        name="(tabs)"
        options={{
          gestureEnabled: false,
        }}
      />
      {/* ADD ITEM */}
      <Stack.Screen
        name="(edit-add-item)/addItem"
        options={{
          gestureEnabled: false,
        }}
      />
      {/* DONATE NOW */}
      <Stack.Screen
        name="(donate)/donateNow"
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
