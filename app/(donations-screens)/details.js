import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme"; // Assuming COLORS are defined elsewhere
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Main Component: DetailsScreen
export default function DetailsScreen() {
  const [data, setData] = useState(null); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [selectedStatus, setSelectedStatus] = useState("All"); // Selected filter status

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item data for the modal

  // Function to fetch data from the backend server
  const getPostDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
    try {
      const response = await axios.get(URL);
      setData(response.data); // Store fetched data
      setFilteredData(response.data); // Set the initial filtered data
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  // Pull-to-refresh callback
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPostDetails();
    setRefreshing(false);
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    getPostDetails();
  }, []);

  // Function to filter items based on selected status
  const filterItems = (status) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredData(data); // Show all items
    } else {
      const filtered = data.filter((item) => item.status2 === status); // Filter based on status
      setFilteredData(filtered);
    }
  };

  // If no data is available, show a loading indicator
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  // Function to open the modal with the selected item details
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Filter buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "All" && styles.activeFilter,
            ]}
            onPress={() => filterItems("All")}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === "All" && styles.activeFilterText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "In-Progress" && styles.activeFilter,
            ]}
            onPress={() => filterItems("In-Progress")}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === "In-Progress" && styles.activeFilterText,
              ]}
            >
              In-Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "Donated" && styles.activeFilter,
            ]}
            onPress={() => filterItems("Donated")}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === "Donated" && styles.activeFilterText,
              ]}
            >
              Donated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "Pending" && styles.activeFilter,
            ]}
            onPress={() => filterItems("Pending")}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === "Pending" && styles.activeFilterText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "Cancelled" && styles.activeFilter,
            ]}
            onPress={() => filterItems("Cancelled")}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === "Cancelled" && styles.activeFilterText,
              ]}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Total Items Count */}
        <Text style={styles.totalItemsText}>
          Total Items: {filteredData.length}
        </Text>

        {/* FlatList with pull-to-refresh */}
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <DonationItem item={item} openModal={openModal} />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} // Trigger data reload when user pulls
              colors={[COLORS.darkGreen]}
              tintColor={COLORS.darkGreen}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
        />

        {/* Modal for Full Item Details */}
        {selectedItem && (
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContent}>
              {/* Title */}
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>

              {/* Description */}
              <Text style={styles.modalDescription}>
                {selectedItem.donationDescription}
              </Text>

              {/* Address Display */}
              {selectedItem.address && selectedItem.address.length > 0 && (
                <View style={styles.addressContainer}>
                  <Text style={styles.modalLabel}>Addresses: </Text>
                  {selectedItem.address.map((addr, index) => (
                    <Text key={index} style={styles.modalLocation}>
                      {`${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.regionProvince}, ${addr.postalCode}`}
                    </Text>
                  ))}
                </View>
              )}

              {/* Receiver Preference */}
              <Text style={styles.modalReceiverPreference}>
                <Text style={styles.modalLabel}>Receiver Preference: </Text>
                {selectedItem.receiverPreference}
              </Text>

              {/* Status */}
              <Text style={styles.modalStatus}>
                <Text style={styles.modalLabel}>Status: </Text>
                {selectedItem.status2}
              </Text>

              {/* Image */}
              <Image
                source={{ uri: selectedItem.image[0] }}
                style={styles.modalImage}
              />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={closeModal}
              >
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

// DonationItem Component: Displays individual donation item
const DonationItem = ({ item, openModal }) => {
  return (
    <Pressable onPress={() => openModal(item)}>
      <View style={styles.card}>
        <View style={styles.itemInfo}>
          {/* Image Display */}
          <Image source={{ uri: item.image[0] }} style={styles.itemImage} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.donationDescription}
            </Text>
            <Text style={styles.itemLocation}>{item.location}</Text>
          </View>
        </View>
        <Text style={[styles.itemStatus, getStatusStyle(item.status2)]}>
          {item.status2}
        </Text>
      </View>
    </Pressable>
  );
};

// Function to determine the status style
const getStatusStyle = (status) => {
  switch (status) {
    case "In-Progress":
      return styles.inProgress;
    case "Donated":
      return styles.donated;
    case "Pending":
      return styles.pending;
    case "Cancelled":
      return styles.cancelled;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 20,
  },
  filterButton: {
    backgroundColor: COLORS.mainBackgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  activeFilter: {
    backgroundColor: COLORS.xchangoColor,
  },
  activeFilterText: {
    color: COLORS.mainBackgroundColor,
  },
  totalItemsText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
    paddingLeft: 15,
  },
  card: {
    backgroundColor: COLORS.mainBackgroundColor,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  itemInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 20,
    marginTop: 5,
  },
  itemLocation: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 5,
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  inProgress: {
    color: "#746119ff",
  },
  donated: {
    color: "#064E3B",
  },
  pending: {
    color: "#4B5563",
  },
  cancelled: {
    color: "#EF4444",
  },

  modalContent: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    padding: 20,
    borderRadius: 15,
    width: "100%", // Set the modal width to 85% of screen width
    maxHeight: "80%", // Restrict modal height
    overflow: "scroll",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  modalLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primary,
  },
  modalLocation: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
    textAlign: "center",
  },
  modalReceiverPreference: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 10,
    textAlign: "center",
  },
  modalStatus: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 10,
    textAlign: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "contain",
  },
  addressContainer: {
    marginTop: 20,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: COLORS.xchangoColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.mainBackgroundColor,
  },
});
