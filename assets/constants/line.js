import { StyleSheet, View } from "react-native";
import React from "react";

export default function Line({ customise }) {
  return <View style={[styles.line, customise]} />;
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
});
