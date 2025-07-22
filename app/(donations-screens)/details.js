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
  Pressable,
  ScrollView,
  Modal as RNModal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

// Main Component: DetailsScreen
export default function DetailsScreen() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch products
  const getPostDetails = async () => {
    try {
      const response = await axios.get("http://192.168.100.10:5000/products");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPostDetails();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getPostDetails();
  }, []);

  const filterItems = (status) => {
    setSelectedStatus(status);
    if (status === "All") setFilteredData(data);
    else setFilteredData(data.filter((item) => item.status2 === status));
  };

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Filters */}
        <LinearGradient
          colors={["#0b5345", COLORS.statusbarBg]}
          style={styles.filterContainer}
        >
          {["All", "In-Progress", "Donated", "Pending", "Cancelled"].map(
            (status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  selectedStatus === status && styles.activeFilter,
                ]}
                onPress={() => filterItems(status)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedStatus === status && styles.activeFilterText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )
          )}
        </LinearGradient>

        <Text style={styles.totalItemsText}>
          Total Items: {filteredData.length}
        </Text>

        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <DonationItem item={item} openModal={openModal} />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.darkGreen]}
              tintColor={COLORS.darkGreen}
              progressBackgroundColor={COLORS.lightgreen}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
        />

        {/* Details Modal */}
        {selectedItem && (
          <Modal
            isVisible={modalVisible}
            onBackdropPress={closeModal}
            propagateSwipe
            style={styles.modalWrapper}
          >
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.donationDescription}
                </Text>

                {/* Addresses */}
                {selectedItem.address?.length > 0 && (
                  <View style={styles.addressContainer}>
                    <Text style={styles.modalLabel}>Addresses:</Text>
                    {selectedItem.address.map((addr, i) => (
                      <Text key={i} style={styles.modalLocation}>
                        {`${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.regionProvince}, ${addr.postalCode}`}
                      </Text>
                    ))}
                  </View>
                )}

                <Text style={styles.modalReceiverPreference}>
                  <Text style={styles.modalLabel}>Receiver Preference: </Text>
                  {selectedItem.receiverPreference}
                </Text>

                <Text style={styles.modalStatus}>
                  <Text style={styles.modalLabel}>Status: </Text>
                  {selectedItem.status2}
                </Text>

                {/* Image Carousel */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageCarousel}
                >
                  {selectedItem.image.map((uri, idx) => (
                    <Pressable key={idx} onPress={() => openImagePreview(uri)}>
                      <Image source={{ uri }} style={styles.modalImageItem} />
                    </Pressable>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* Preview Modal */}
            <RNModal
              visible={previewVisible}
              transparent
              animationType="fade"
              onRequestClose={closeImagePreview}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={closeImagePreview}
              >
                <Image
                  source={{ uri: selectedImageUri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </Pressable>
            </RNModal>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

// DonationItem Component
const DonationItem = ({ item, openModal }) => (
  <Pressable onPress={() => openModal(item)}>
    <View style={styles.card}>
      <View style={styles.itemInfo}>
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

// Status style helper
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
  safeArea: { flex: 1, backgroundColor: "#0b5345" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: COLORS.mainBackgroundColor },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 20,
  },
  filterButton: {
    backgroundColor: COLORS.mainBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterText: { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  activeFilter: { backgroundColor: COLORS.xchangoColor },
  activeFilterText: { color: COLORS.mainBackgroundColor },
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
  itemInfo: { flexDirection: "row", marginBottom: 10 },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  textContainer: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: COLORS.primary },
  itemDescription: {
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 20,
    marginTop: 5,
  },
  itemLocation: { fontSize: 12, color: COLORS.secondary, marginTop: 5 },
  itemStatus: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  inProgress: { color: "#746119ff" },
  donated: { color: "#064E3B" },
  pending: { color: "#4B5563" },
  cancelled: { color: "#EF4444" },
  modalWrapper: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: COLORS.mainBackgroundColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalScroll: { padding: 20, alignItems: "center" },
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
  modalLabel: { fontWeight: "bold", fontSize: 16, color: COLORS.primary },
  addressContainer: {
    marginTop: 20,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
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
  imageCarousel: { width: "100%", marginVertical: 20 },
  modalImageItem: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "contain",
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
