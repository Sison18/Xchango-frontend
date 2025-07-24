// TopDonorScreen.js
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FlipInXDown
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/constants/theme";

export default function TopDonorScreen() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showOptions, setShowOptions] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://192.168.100.112:5000/products");
      setDonors(res.data);
    } catch (err) {
      console.error("Fetch donors error:", err);
    }
  };

  useEffect(() => {
    fetchDonors().finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDonors();
    setRefreshing(false);
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowOptions(false);
  };

  const filtered =
    selectedFilter === "All"
      ? donors
      : donors.filter((d) => d.someField === selectedFilter);

  const displayedDonors = [...filtered].sort(
    (a, b) => b.donations - a.donations
  );

  if (!donors) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  const renderDonorItem = ({ item, index }) => (
    <Animated.View entering={FlipInXDown.delay(index * 100).duration(500)}>
      <TouchableOpacity
        style={styles.donorItem}
        onPress={() => {
          if (item && item.id) {
            router.push(`/(user-profile)/${item.id}`);
          }
        }}
      >
        <Text style={styles.rank}>{index + 1}</Text>
        <Image source={{ uri: item.profile }} style={styles.donorImage} />
        <View style={styles.donorDetails}>
          <Text style={styles.donorName}>{item.userName}</Text>
          <Text style={styles.donationCount}>{item.donations} Donations</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Top Donor</Text>
          <TouchableOpacity
            onPress={() => setShowOptions(!showOptions)}
            style={styles.filterContainer}
          >
            <Text style={styles.filterText}>{selectedFilter}</Text>
            <FontAwesome name="sort-down" size={18} color="black" />
          </TouchableOpacity>
        </View>

        {/* Loading or List */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.darkGreen}
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={displayedDonors}
            renderItem={renderDonorItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.donorList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <MaterialIcons
                  name="leaderboard"
                  size={48}
                  color={COLORS.secondary}
                />
                <Text style={styles.emptyText}>No chats yet.</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.darkGreen]}
                tintColor={COLORS.darkGreen}
                progressBackgroundColor={COLORS.lightgreen}
              />
            }
          />
        )}
      </View>

      {/* FILTER MODAL */}
      <Modal
        visible={showOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowOptions(false)}
        >
          <Pressable style={styles.optionsMenu}>
            {[
              "All",
              "Vehicles",
              "Home & Living",
              "Books",
              "Tools",
              "Electronics",
            ].map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => handleFilterChange(opt)}
                style={styles.EESLContainer}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.lightgreen,
    gap: 10,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  donorList: {
    paddingBottom: 10,
  },
  donorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.cardBg,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 70,
    right: 20,
    backgroundColor: COLORS.darkGreen,
    zIndex: 20,
    padding: 5,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: COLORS.mainBackgroundColor,
  },
  EESLContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.darkGreen,
    backgroundColor: COLORS.xchangoColor,
    paddingRight: 20,
    marginVertical: 1,
    borderRadius: 7,
  },
  // 3️⃣ empty state styles
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 300,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
  },
});
