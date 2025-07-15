import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../assets/constants/theme";

export default function HeaderBar({
  title = "Back",
  onBackPress = () => router.back(),
  showBack = true,
  confirmBack = true,
  message = "Are you sure you want to cancel?",
}) {
  const handleBackPress = () => {
    if (confirmBack) {
      Alert.alert("Cancel Confirmation", message, [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: onBackPress },
      ]);
    } else {
      onBackPress();
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.statusbarBg, COLORS.darkGreen]}
      style={styles.headerBar}
    >
      {showBack && (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <Text
        style={[styles.headerTitle, showBack && { marginLeft: 10, flex: 1 }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 40,
    paddingBottom: 20,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backIconContainer: {
    paddingRight: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "left",
  },
});
