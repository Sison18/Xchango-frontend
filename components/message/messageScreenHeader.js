import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";

export default function MessageScreenHeader() {
  return (
    // HEADER CONTAINER
    <View style={styles.headerContainer}>
      {/* CHATS TEXT */}
      <Text style={styles.chatsTxt}>Chats</Text>

      {/* SEARCH BAR */}
      <Pressable
        style={styles.searchBar}
        onPress={() => router.push("../../userSearch")}
      >
        <Text style={styles.searchText}>Search</Text>
        <Ionicons name="search-outline" size={20} color="gray" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // HEADER CONTAINER
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    gap: 10,
  },

  // CHATS TEXT
  chatsTxt: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.darkGreen,
  },

  // SEARCH BAR
  searchBar: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchText: {
    color: COLORS.placeholder,
  },
});
