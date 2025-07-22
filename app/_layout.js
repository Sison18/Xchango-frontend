import { Stack, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../BACKEND/CONTEXTS/authContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

//  UPDATED pag first time ni lunch yung app it shows the welcome screens
function RootNavigator() {
  const { user, loading: authLoading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  //  Check if its the first time opening the app the if true show welcome page
  const checkFirstLaunch = async () => {
    try {
      const alreadyLaunched = await AsyncStorage.getItem("AlreadyLaunched");
      if (!alreadyLaunched) {
        await AsyncStorage.setItem("AlreadyLaunched", "true");
        router.replace("/(welcome-page)/welcome");
        return;
      }
    } catch (error) {
      console.error(" Error checking first launch state:", error);
    } finally {
      setAppLoading(false);
    }
  };

  //  Show loading screen while waiting for auth or app logic
  if (authLoading || appLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Navigation Stack
  return (
    <Stack
      initialRouteName={user ? "(tabs)" : "(authentications)"}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="(welcome-page)/welcome" />

      <Stack.Screen name="(authentications)" />

      <Stack.Screen name="(tabs)" />

      <Stack.Screen name="(edit-add-item)/addItem" />

      <Stack.Screen name="(donate)/donateNow" />

      <Stack.Screen name="(product-details)/(requestTrade-report)/requestTrade" />
    </Stack>
  );
}
