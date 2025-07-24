import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight
} from "react-native-reanimated";
import { COLORS } from "../../assets/constants/theme";
import HeaderBar from "../../components/header";

const { width: screenWidth } = Dimensions.get("window");

const StarRating = ({ rating }) => (
  <View style={styles.ratingRow}>
    {[...Array(5)].map((_, i) => {
      let icon = "star-outline";
      if (i < Math.floor(rating)) icon = "star";
      else if (i < rating) icon = "star-half";
      return (
        <Ionicons
          key={i}
          name={icon}
          size={16}
          color={COLORS.rating}
          style={styles.star}
        />
      );
    })}
  </View>
);

const FilterBar = ({ selectedRating, setSelectedRating }) => {
  const options = [5, 4, 3, 2, 1, "All"];
  return (
    <Animated.View
      style={styles.filterBar}
      entering={FadeInRight.delay(300).duration(200)}
    >
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.filterButton,
            selectedRating === opt && styles.selectedFilter,
          ]}
          onPress={() => setSelectedRating(opt)}
        >
          <Text
            style={[
              styles.filterText,
              selectedRating === opt && styles.selectedFilterText,
            ]}
          >
            {opt === "All" ? "All" : `${opt} ★`}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const ReviewCard = ({ item, openImagePreview, index }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // normalize to array
  const commentImgs = Array.isArray(item.commentImgs)
    ? item.commentImgs
    : item.commentImgs
    ? [item.commentImgs]
    : [];

  // slide width matches image width
  const slideWidth = screenWidth - 32;

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / slideWidth);
    setActiveIndex(idx);
  };

  return (
    <Animated.View
      style={styles.card}
      entering={FadeInDown.delay(300).duration(200)}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: item.profile }}
          style={styles.avatar}
          defaultSource={require("../../assets/images/profile-img.png")}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{item.userName}</Text>
          <StarRating rating={item.rating} />
        </View>
      </View>

      <Text style={styles.text}>{item.comment}</Text>

      {commentImgs.length > 0 && (
        <>
          <FlatList
            data={commentImgs}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item: uri }) => (
              <TouchableOpacity
                style={styles.carouselItem}
                onPress={() => openImagePreview(uri)}
              >
                <Image
                  source={{ uri }}
                  style={[styles.commentImage, { width: slideWidth }]}
                />
              </TouchableOpacity>
            )}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={styles.carousel}
          />

          {commentImgs.length > 1 && (
            <View style={styles.dotsContainer}>
              {commentImgs.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, idx === activeIndex && styles.activeDot]}
                />
              ))}
            </View>
          )}
        </>
      )}
    </Animated.View>
  );
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const getReviewsDetails = async () => {
    try {
      const response = await axios.get("http://192.168.100.112:5000/products");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getReviewsDetails();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getReviewsDetails();
  }, []);

  useEffect(() => {
    if (selectedRating === "All") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter((r) => r.rating === selectedRating));
    }
  }, [reviews, selectedRating]);

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };
  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderBar title="Reviews" confirmBack={false} />

      <FilterBar
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />

      <FlatList
        data={filteredReviews}
        renderItem={({ item }) => (
          <ReviewCard item={item} openImagePreview={openImagePreview} />
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
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reviews found.</Text>
        }
      />

      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeImagePreview}>
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingRow: { flexDirection: "row" },
  star: { marginRight: 2 },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
  },
  selectedFilter: { backgroundColor: COLORS.xchangoColor },
  filterText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  selectedFilterText: { color: COLORS.rating },
  card: {
    marginBottom: 16,
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  headerText: { flex: 1 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  name: { fontWeight: "bold", fontSize: 14 },
  text: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  commentImage: {
    height: 200,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.darkGreen,
    width: 8,
    height: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
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
  },
});
