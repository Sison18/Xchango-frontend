import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, useAuth } from "../backendApi/contexts/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

// UPDATED mag shoshow yung landing page pag first time mag open yung app
function RootNavigator() {
  const { user, loading: authLoading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  // Check if onboarding has been shown before
  const checkFirstLaunch = async () => {
    try {
      const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
      if (!alreadyLaunched) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        router.replace("/(welcome-page)/welcome");
        return;
      }
    } catch (error) {
      console.error("Error checking launch state:", error);
    } finally {
      setAppLoading(false);
    }
  };

  //  Show loading spinner if auth or app state is still loading
  if (authLoading || appLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Define route stack conditionally
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
      <Stack.Screen name="(trade-add-item)/addItem" />
    </Stack>
  );
}
