// ✅ File 2: ProfileSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";

export default function ProfileSection() {
  return (
    <View>
      {/* SHIPPING PROCESS */}
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={styles.sectionTitle}>Shipping Process</Text>
        <View style={styles.iconRow}>
          <ProcessIcon name="truck-loading" label="Preparing" size={18} />
          <ProcessIcon name="shipping-fast" label="To Ship" size={18} />
          <ProcessIcon name="hand-holding" label="To Receive" size={23} />
          <ProcessIcon name="check-circle" label="Completed" size={20} />
        </View>
      </View>

      <Line customise={{ borderWidth: 5, borderColor: "#E5E7EB" }} />

      {/* MEETU-UP PROCESS */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={styles.sectionTitle}>Meet-Up Process</Text>
        <View style={styles.iconRow}>
          <ProcessIcon name="calendar-day" label="Scheduled" size={18} />
          <ProcessIcon name="user-friends" label="Meet Up" size={18} />
          <ProcessIcon name="check-circle" label="Completed" size={20} />
        </View>
      </View>

      <Line />
    </View>
  );
}

const ProcessIcon = ({ name, label, size }) => (
  <View style={styles.iconContainer}>
    <FontAwesome5 name={name} size={size} color={"#6B7280"} />
    <Text style={styles.iconLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#374151",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 8,
    color: COLORS.primary,
  },
});
