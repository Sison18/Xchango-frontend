import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";

export default function HomeScreenHeader() {
  return (
    // HEADER CONTAINER
    <View style={styles.headerContainer}>
      {/* XCHANGO TITLE */}
      <Text style={styles.XChangoText}>XC</Text>

      {/* SEARCH BAR */}
      <Pressable
        style={styles.searchBar}
        onPress={() => router.push("../../productSearch")}
      >
        <Text style={styles.searchText}>Search</Text>
        <Ionicons name="search-outline" size={20} color="gray" />
      </Pressable>

      {/* NOTIFICATION */}
      <TouchableOpacity onPress={() => router.push("/map")}>
        <MaterialCommunityIcons
          name="map-search"
          size={28}
          color={COLORS.primary}
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
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    gap: 10,
  },

  // XCHANGO TITLE
  XChangoText: {
    fontSize: 24,
    fontWeight: "900",
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
