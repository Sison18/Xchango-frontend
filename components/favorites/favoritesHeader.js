import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../../assets/constants/theme";

export default function FavoritesHeader() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    // HEADER CONTAINER
    <View style={styles.headerContainer}>
      {/* FAVORITES TEXT */}
      <Text style={styles.title}>Favorites</Text>
      {/* SELECT CONTAINER */}
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        style={styles.selectContainer}
      >
        <Text style={styles.selectText}>Select</Text>
        <MaterialIcons
          name={isSelected ? "check-box" : "check-box-outline-blank"}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // HEADER CONTAINER
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.mainBackgroundColor,
  },

  // FAVORITES
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  // SELECT
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginRight: 5,
  },
});
