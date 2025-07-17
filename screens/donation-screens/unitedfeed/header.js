import React, { useState, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../assets/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ChatXcHANGO from "../../../components/chatXChango";

const width = Dimensions.get("screen").width;

// Main Component: UnitedFeedScreen
export default function UnitedFeedScreen({ imageList = [], info }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      {/* Header Component */}
      <UnitedHeader />

      {/* Content Posts */}
      <ContentPosts imageList={imageList} info={info} />
    </SafeAreaView>
  );
}

// UnitedHeader Component
const UnitedHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.logoHeaderContainer}
        onPress={() => router.push("/home")}
      >
        <Image
          source={require("../../../assets/images/xchango-logo.png")}
          style={styles.xchangoImg}
        />
        {/* XCHANGO TITLE */}
        <Text style={styles.XChangoText}>XC</Text>
      </TouchableOpacity>

      <View style={styles.chatNotifContainer}>
        {/* CHAT XCHANGO ICON */}
        <ChatXcHANGO
          imageStyle={styles.imgStyle}
          positionStyle={styles.posiStyle}
        />
        {/* NOTIFICATION */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Ionicons
            name="notifications-circle-outline"
            size={42}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
            source={require("../../../assets/images/xchango-logo.png")}
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
              <TouchableOpacity
                onPress={() => openImagePreview(item)}
                accessible
                accessibilityLabel={`Thumbnail ${index + 1}`}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="contain"
                  defaultSource={require("../../../assets/images/banner1.png")}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 5,
  },
  logoHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  xchangoImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  XChangoText: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.darkGreen,
  },
  chatNotifContainer: {
    flexDirection: "row",
    gap: 5,
  },
  posiStyle: {
    width: 37,
    height: 37,
  },
  imgStyle: {
    width: 37,
    height: 37,
  },

  container: {
    flex: 1,
    paddingTop: 10,
  },
  card: {
    backgroundColor: COLORS.lightgreen,
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
    backgroundColor: COLORS.cardBg,
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
});
