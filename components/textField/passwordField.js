import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/theme";

export default function PasswordField({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = typeof secureTextEntry !== "undefined";

  return (
    // INPUT CONTAINER
    <View style={styles.inputContainer}>
      {/* PASSWORD TEXTFIELD */}
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || "#999"}
        secureTextEntry={isPasswordField && !isPasswordVisible}
        {...props}
      />

      {/* PASSWORD VIEW/UNVIEW */}
      {isPasswordField && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: COLORS.textboxBorderColor,
    backgroundColor: COLORS.textbox,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary,
    backgroundColor: COLORS.textbox,
  },
});
