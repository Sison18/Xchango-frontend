// components/textField/inputField.js
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import React from "react";

export default function InputField({ inputStyle, ...props }) {
  return <TextInput style={[styles.inputField, inputStyle]} {...props} />;
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: COLORS.textbox,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.textboxBorderColor,
    borderRadius: 7,
  },
});
