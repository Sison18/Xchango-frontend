import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

// Sample data for the top donors
const topDonors = [
  {
    id: 1,
    name: "Sean Sta Ana",
    donations: 20,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "John Cruz",
    donations: 18,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Christian Mark Sison",
    donations: 16,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Andrei Custodio",
    donations: 13,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Juan Dela Cruz",
    donations: 20,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Rafael John",
    donations: 11,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "Earl Agustin",
    donations: 8,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Arthur Neri",
    donations: 4,
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 9,
    name: "Arthur Neri",
    donations: 4,
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

export default function TopDonorScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Render each donor
  const renderDonorItem = ({ item, index }) => (
    <View style={styles.donorItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={{ uri: item.image }} style={styles.donorImage} />
      <View style={styles.donorDetails}>
        <Text style={styles.donorName}>{item.name}</Text>
        <Text style={styles.donationCount}>{item.donations} Donations</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Top Donor Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Top Donor</Text>
          <TouchableOpacity onPress={() => handleFilterChange("All")}>
            <Text style={styles.filterText}>{selectedFilter}</Text>
          </TouchableOpacity>
        </View>

        {/* Top Donors List */}
        <FlatList
          data={topDonors}
          renderItem={renderDonorItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.donorList}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.secondary,
    padding: 5,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
  },
  donorList: {
    paddingBottom: 20,
  },
  donorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginRight: 10,
  },
  donorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  donorDetails: {
    flex: 1,
  },
  donorName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  donationCount: {
    fontSize: 14,
    color: COLORS.secondary,
  },
});
