import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../assets/constants/theme";
import InputField from "../../components/textField/passwordField";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../../components/header";

export default function ChangePasswordScreen() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [secureEntry, setSecureEntry] = useState({
    old: true,
    new: true,
    confirm: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage("");
  };

  const toggleSecure = (key) => {
    setSecureEntry((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = form;
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Password changed successfully!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }, 2000);
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar title="Change Password" confirmBack={false} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* FORM */}
            <View style={styles.form}>
              <InputField
                placeholder="Old Password"
                value={form.oldPassword}
                onChangeText={(text) => handleChange("oldPassword", text)}
                secureTextEntry={secureEntry.old}
                icon="lock-outline"
                onToggleSecure={() => toggleSecure("old")}
              />
              <InputField
                placeholder="New Password"
                value={form.newPassword}
                onChangeText={(text) => handleChange("newPassword", text)}
                secureTextEntry={secureEntry.new}
                icon="lock-reset"
                onToggleSecure={() => toggleSecure("new")}
              />
              <InputField
                placeholder="Confirm New Password"
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry={secureEntry.confirm}
                icon="lock"
                onToggleSecure={() => toggleSecure("confirm")}
              />

              {message.length > 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    color: message.includes("✅") ? "green" : "red",
                    marginVertical: 10,
                    fontWeight: "500",
                  }}
                >
                  {message}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Update Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.darkGreen,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#fff",
  },
  form: {
    marginTop: 30,
  },
  button: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
    fontWeight: "600",
  },
});
