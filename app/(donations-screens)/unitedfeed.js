import React, { useState, useCallback, useEffect, useRef } from "react";
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
  Dimensions,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme"; // Assuming COLORS are defined elsewhere
import HeaderBar from "../../components/header";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";

import ChatXChango from "../../components/chatXChango";

const width = Dimensions.get("screen").width;

// Main Component: UnitedFeedScreen
export default function UnitedFeedScreen() {
  const [data, setData] = useState(null); // Store fetched data
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [showOptions, setShowOptions] = useState(false);

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

  // Function to fetch data from the backend server
  const getPostDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
    try {
      const response = await axios.get(URL);
      setData(response.data); // Store fetched data
    } catch (error) {
      console.error("Error fetching product:", error.message);
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

  const rightCompo = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => router.push("/message")}>
        <ChatXChango
          imageStyle={{ width: 25, height: 25 }}
          positionStyle={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
        <Entypo name="dots-three-vertical" size={24} color="#ffffffff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar style="light" />

      <HeaderBar title="" confirmBack={false} rightComponent={rightCompo()} />

      {/* FlatList with pull-to-refresh */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ContentPosts imageList={item.image} info={item} />
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
      />

      {/* MORE OPTIONS */}
      <Modal
        visible={showOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        {/* TAP TO CLOSE THE OPTIONS MENU */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setShowOptions(false)}
        >
          <TouchableOpacity style={styles.optionsMenu} onPress={() => {}}>
            {/* NOTIFICATIONS */}
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                router.push("home");
              }}
            >
              <View style={styles.rowContainer}>
                <Ionicons
                  name="notifications-circle-outline"
                  size={28}
                  color={COLORS.darkGreen}
                />
                <Text style={styles.optionText}>Notifications</Text>
              </View>
            </TouchableOpacity>
            {/* BACK TO HOME PAGE */}
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                router.push("home");
              }}
            >
              <View style={styles.rowContainer}>
                <FontAwesome name="home" size={22} color={COLORS.darkGreen} />
                <Text style={styles.optionText}>Back to Home Page</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </>
  );
}

// ContentPosts Component
const ContentPosts = ({ imageList = [], info }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Format date from the backend (assuming info.date is available)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Mon, Tues
      year: "numeric", // 2023
      month: "short", // Oct
      day: "numeric", // 12
    });
  };

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileNameCaption}>
          <Image
            source={require("../../assets/images/xchango-logo.png")}
            style={styles.xchangoImg}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>XChango</Text>
            {/* Date Display */}
            <Text style={styles.date}>{formatDate(info.date)}</Text>
            {/* Add date below the username */}
            <Text style={styles.message}>{info.message}</Text>
          </View>
        </View>

        {/* Display multiple images horizontally */}
        <View>
          <FlatList
            ref={flatListRef}
            data={imageList}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openImagePreview(item)}>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="contain"
                  defaultSource={require("../../assets/images/banner1.png")}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            contentContainerStyle={styles.imageGrid}
          />

          {/* Dot Pagination */}
          <View style={styles.paginationContainer}>
            {imageList.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : {},
                ]}
              />
            ))}
          </View>
        </View>

        {/* Image Preview Modal */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  xchangoImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  card: {
    backgroundColor: COLORS.mainBackgroundColor,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    padding: 10,
    marginHorizontal: 20,
  },
  profileNameCaption: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
  },
  date: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 5,
  },
  message: {
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: width - 60,
    height: undefined,
    aspectRatio: 1,
  },
  imageGrid: {
    marginTop: 10,
    backgroundColor: COLORS.lightgreen,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
    backgroundColor: COLORS.placeholder,
  },
  activeDot: {
    backgroundColor: COLORS.darkGreen,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "95%",
    height: "80%",
  },

  // OPTIONS MENU
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 80,
    right: 20,
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },
  optionText: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: COLORS.primary,
  },
  // ROW CONTAINER
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
