import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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

        {/* REQUEST TRADE */}
        <Stack.Screen
          name="(product-details)/(requestTrade-report)/requestTrade"
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
