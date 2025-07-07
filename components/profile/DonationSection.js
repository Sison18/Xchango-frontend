import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";

export default function DonationSection() {
  return (
    <>
      {/* DONATION BOX--------------------------------------------- */}
      <View style={styles.donationBox}>
        <Text style={styles.donationText}>
          Donating second-hand items helps others, reduces waste, and gives your
          belongings a new purpose...
        </Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate now</Text>
        </TouchableOpacity>
      </View>

      {/* DONATION BOTTOM BUTTONS---------------------------------- */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Your Donation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Leaderboards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>UnitedFeed</Text>
        </TouchableOpacity>
      </View>

      <Line />
    </>
  );
}

const styles = StyleSheet.create({
  // DONATION BOX
  donationBox: {
    marginHorizontal: 20,
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  donationText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
  },
  donateButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  donateButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  // DONATION BOTTOM BUTTONS
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  smallButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 0.2,
    borderColor: COLORS.darkGreen,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  smallButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.darkGreen,
  },
});
