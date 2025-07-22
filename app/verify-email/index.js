import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { verifyEmail } from "../../BACKEND/API'S/auth";



// ETO YUNG DEEPLINK NA SASALO SA REDIRECTION NG EMAIL VERIFICATION - inaad ko to men para mag redirect to be test pa
export default function VerifyEmailScreen() {
  const { token, status, reason } = useLocalSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      if (status === "error") {
        Alert.alert("Verification Failed", reason || "Missing token.");
        router.replace("/login");
      }
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setIsVerifying(false);
        Alert.alert(
          "Email Verified 🎉",
          "Your email has been successfully verified!"
        );
        router.replace("/login");
      } catch (err) {
        setIsVerifying(false);
        console.error("Verification error:", err.message);
        Alert.alert(
          "Verification Failed ❌",
          "Invalid or expired verification link."
        );
        router.replace("/login");
      }
    };

    verify();
  }, [token]);

  return (
    <View style={styles.container}>
      {isVerifying ? (
        <>
          <Text style={styles.text}>Verifying your email...</Text>
          <ActivityIndicator size="large" />
        </>
      ) : (
        <Text style={styles.text}>Redirecting...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, marginBottom: 15 },
});
