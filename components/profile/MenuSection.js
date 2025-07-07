import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/theme";

export default function MenuSection() {
  return (
    <View>
      {/* Menu Section */}
      <View style={styles.menu}>
        <MenuItem icon="swap-horizontal" label="Pending Trade Requests" />
        <MenuItem icon="repeat" label="Sent Trade Offers" />
        <MenuItem icon="notifications" label="Notifications" />
        <MenuItem icon="chatbubble-ellipses" label="Chat with XChango" />
      </View>
    </View>
  );
}

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={20} color={COLORS.primary} />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menu: {
    marginVertical: 10,
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.secondary,
  },
});
