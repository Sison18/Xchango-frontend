import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ProfileSection() {
  const shippingIcons = [
    { name: "truck-loading", label: "Preparing", size: 18 },
    { name: "shipping-fast", label: "To Ship", size: 18 },
    { name: "hand-holding", label: "To Receive", size: 23 },
    { name: "check-circle", label: "Completed", size: 20 },
  ];

  const meetupIcons = [
    { name: "truck-loading", label: "Preparing", size: 18 },
    { name: "calendar-day", label: "Scheduled", size: 18 },
    { name: "user-friends", label: "Meet Up", size: 18 },
    { name: "check-circle", label: "Completed", size: 20 },
  ];

  return (
    <View>
      {/* SHIPPING PROCESS */}
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={styles.sectionTitle}>Shipping Process</Text>
        <View style={styles.iconRow}>
          {shippingIcons.map((icon, index) => (
            <ProcessIcon
              key={index}
              name={icon.name}
              label={icon.label}
              size={icon.size}
              index={index}
            />
          ))}
        </View>
      </View>

      <Line customise={{ borderWidth: 5, borderColor: "#E5E7EB" }} />

      {/* MEET-UP PROCESS */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={styles.sectionTitle}>Meet-Up Process</Text>
        <View style={styles.iconRow}>
          {meetupIcons.map((icon, index) => (
            <ProcessIcon
              key={index}
              name={icon.name}
              label={icon.label}
              size={icon.size}
              index={index}
            />
          ))}
        </View>
      </View>

      <Line />
    </View>
  );
}

const ProcessIcon = ({ name, label, size, index = 0 }) => (
  <Animated.View
    entering={FadeInUp.delay(index * 100).duration(400)}
    style={styles.iconContainer}
  >
    <FontAwesome5 name={name} size={size} color={"#6B7280"} />
    <Text style={styles.iconLabel}>{label}</Text>
  </Animated.View>
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
