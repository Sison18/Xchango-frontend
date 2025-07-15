import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function SearchBar({
  value,
  onChangeText,
  onSearchPress,
  placeholder = "Search...",
  showStatusBar = true,
  icon,
  keyboardType = "default",
  autoFocus = false,
  showBack = true,
  onBackPress = () => {},
}) {
  return (
    <SafeAreaView edges={["top"]}>
      <StatusBar style="dark" />
      {/* CONTAINER */}
      <View style={styles.container}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#444" />
          </TouchableOpacity>
        )}

        <Ionicons name={icon} size={20} color="#888" style={styles.icon} />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          returnKeyType="search"
          keyboardType={keyboardType}
          onSubmitEditing={onSearchPress}
          autoFocus={autoFocus}
        />

        {value?.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <Ionicons name="close-circle" size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
  },
  backButton: {
    marginRight: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: Platform.OS === "ios" ? 6 : 0,
  },
});
