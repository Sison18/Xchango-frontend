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
import Animated, {
  BounceIn,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  StretchInX,
  StretchInY,
  ZoomIn,
} from "react-native-reanimated";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
          {["All", "Pending", "In-Progress", "Donated", "Cancelled"].map(
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
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="account-details"
                size={48}
                color={COLORS.secondary}
              />
              <Text style={styles.emptyText}>No chats yet.</Text>
            </View>
          )}
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
                <View style={styles.topModalContainer}>
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  <Text style={styles.modalDescription}>
                    ♡ {selectedItem.donationDescription}
                  </Text>

                  {/* Addresses */}
                  {selectedItem.address?.length > 0 && (
                    <View style={styles.addressContainer}>
                      {selectedItem.address.map((addr, i) => (
                        <Text key={i} style={styles.modalLocation}>
                          <Text style={styles.modalLabel}>Addresses: </Text>
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
                    <Text style={styles.modalLabel}>Condition: </Text>
                    {selectedItem.condition}
                  </Text>

                  <Text style={styles.modalStatus}>
                    <Text style={styles.modalLabel}>Status: </Text>
                    {selectedItem.status2}
                  </Text>

                  {/* Render button for "Donated" status */}
                  {selectedItem.status2 === "Donated" && (
                    <TouchableOpacity style={styles.donatedButton}>
                      <Text style={styles.donatedButtonText}>View</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Image Carousel */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
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
    <Animated.View
      style={styles.card}
      entering={StretchInY.delay(100).duration(300)}
    >
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
    </Animated.View>
  </Pressable>
);

// Status style helper
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return styles.pending;
    case "In-Progress":
      return styles.inProgress;
    case "Donated":
      return styles.donated;
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
  cancelled: { color: "#c90000ff" },
  modalWrapper: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: COLORS.mainBackgroundColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "75%",
    overflow: "hidden",
  },

  topModalContainer: {
    borderWidth: 1,
    borderColor: COLORS.cardBg,
    backgroundColor: COLORS.lightgreen,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    marginHorizontal: 30,
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 22,
  },
  modalLabel: { fontWeight: "bold", fontSize: 16, color: COLORS.xchangoColor },
  addressContainer: {
    marginTop: 10,
    width: "100%",
  },
  modalLocation: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
  },
  modalReceiverPreference: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 10,
  },
  modalStatus: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 10,
  },
  imageCarousel: {
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    paddingBottom: 10,
  },
  modalImageItem: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: "cover",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "90%",
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "contain",
  },
  closeModalButton: {
    marginBottom: 15,
    backgroundColor: COLORS.xchangoColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 140,
  },
  closeModalText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.mainBackgroundColor,
  },
  donatedButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: 100,
  },
  donatedButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.mainBackgroundColor,
  },
  // 3️⃣ empty state styles
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 250,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
  },
});
