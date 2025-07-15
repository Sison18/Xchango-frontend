import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";
import useBackRedirect from "../../hooks/backRedirect";
import InputField from "../../components/textField/inputField";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setMessage("");
    if (!email.includes("@")) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Reset link sent to your email!");
      setEmail("");
    }, 2000);
  };

  useBackRedirect("/login");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.darkGreen} />
        </TouchableOpacity>

        {/* FORGOT PASSWORD HEADER */}
        <Animated.View entering={FadeInUp.duration(800)}>
          <Text style={styles.header}>Forgot Password</Text>
          <Text style={styles.subtext}>
            Enter your registered email address to receive a reset link.
          </Text>
        </Animated.View>

        {/* INPUT CONTAINER */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.inputContainer}
        >
          <MaterialIcons name="email" size={20} color="#888" />
          <InputField
            placeholder="Email Address"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={COLORS.placeholder}
          />
        </Animated.View>

        {message.length > 0 && (
          <Text
            style={{
              textAlign: "center",
              color: message.includes("✅") ? "green" : "red",
              marginBottom: 10,
              fontWeight: "500",
            }}
          >
            {message}
          </Text>
        )}

        {/* SEND RESET LINK BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  // BACK BUTTON
  backBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 55,
    left: 25,
    zIndex: 10,
  },
  // FORGOT PASSWORD HEADER
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.darkGreen,
    textAlign: "center",
    marginTop: 50,
  },
  subtext: {
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14,
  },
  // INPUT CONTAINER
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.textbox,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "android" ? 5 : 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.textboxBorderColor,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  // SEND RESET LINK BUTTON
  button: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
    fontSize: 16,
  },
});
