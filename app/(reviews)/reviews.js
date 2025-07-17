import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import HeaderBar from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { COLORS } from "../../assets/constants/theme";

const StarRating = ({ rating }) => (
  <View style={{ flexDirection: "row" }}>
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
          style={{ marginRight: 2 }}
        />
      );
    })}
  </View>
);

const FilterBar = ({ selectedRating, setSelectedRating }) => {
  const options = [5, 4, 3, 2, 1, "All"];
  return (
    // HEADER STARS / FILTER BARS
    <View style={styles.filterBar}>
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
            {opt === "All" ? "All" : `${opt} ✮`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ReviewCard = ({ item }) => (
  // REVIEWS
  <View style={styles.card}>
    <View style={styles.header}>
      <Image
        source={{ uri: item.profile }}
        style={styles.avatar}
        defaultSource={require("../../assets/images/profile-img.png")}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.userName}</Text>
        <StarRating rating={item.rating} />
      </View>
    </View>
    <Text style={styles.text}>{item.comment}</Text>

    {/* IMAGE REVIEW */}
    {item.commentImg && (
      <Image source={{ uri: item.commentImg }} style={styles.commentImage} />
    )}
  </View>
);

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.100.10:5000/products")
      .then((res) => {
        setReviews(res.data);
        setFilteredReviews(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedRating === "All") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((item) => item.rating === selectedRating);
      setFilteredReviews(filtered);
    }
  }, [selectedRating, reviews]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Reviews" confirmBack={false} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#116149" />
        </View>
      ) : (
        <>
          <FilterBar
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
          <FlatList
            data={filteredReviews}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.userId.toString()}
            renderItem={({ item }) => <ReviewCard item={item} />}
            contentContainerStyle={styles.container}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No reviews found.</Text>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  selectedFilter: {
    backgroundColor: COLORS.xchangoColor,
  },
  filterText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  selectedFilterText: {
    color: COLORS.rating,
  },
  card: {
    marginBottom: 10,
    backgroundColor: COLORS.lightgreen,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
  },
  commentImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
