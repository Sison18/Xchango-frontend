import React, { useState, useCallback, useEffect, useRef, memo } from "react";
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
import { COLORS } from "../../assets/constants/theme";
import HeaderBar from "../../components/header";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import ChatXChango from "../../components/chatXChango";
import Animated, {
  BounceIn,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  StretchInX,
  ZoomIn,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("screen");
// Approximate item height (profile + text + image + dots + padding)
const ITEM_HEIGHT = 450;

export default function UnitedFeedScreen() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const getPostDetails = async () => {
    try {
      const response = await axios.get("http://192.168.100.10:5000/products");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPostDetails();
    setRefreshing(false);
  }, []);

  const renderPost = useCallback(
    ({ item }) => <MemoContentPosts imageList={item.commentImgs} info={item} />,
    []
  );

  const getItemLayout = useCallback(
    (_data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  const rightCompo = () => (
    <View style={styles.rightCompo}>
      <TouchableOpacity onPress={() => router.push("/message")}>
        <ChatXChango
          imageStyle={{ width: 25, height: 25 }}
          positionStyle={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
        <Entypo name="dots-three-vertical" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar style="light" />
      <HeaderBar
        title="Donations Feed"
        confirmBack={false}
        rightComponent={rightCompo()}
      />

      <FlatList
        data={data}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Entypo name="news" size={48} color={COLORS.secondary} />
            <Text style={styles.emptyText}>No Posts yet.</Text>
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
        showsVerticalScrollIndicator={false}
        // performance optimizations:
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
      />

      <Modal
        visible={showOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsMenu}>
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
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

// memoized content post to avoid unnecessary re-renders
const MemoContentPosts = memo(ContentPosts);

function ContentPosts({ imageList, info }) {
  const images = Array.isArray(imageList)
    ? imageList
    : imageList
    ? [imageList]
    : [];

  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const cardMargin = 20;
  const cardPadding = 10;
  const imageWidth = screenWidth - cardMargin * 2 - cardPadding * 2;
  const imageSpacing = 10;
  const snapInterval = imageWidth + imageSpacing;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
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

  const handleScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const idx = Math.round(offsetX / snapInterval);
    setActiveIndex(idx);
  };

  return (
    <Animated.View
      style={styles.postContainer}
      entering={StretchInX.delay(100).duration(300)}
    >
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <Image
            source={require("../../assets/images/xchango-logo.png")}
            style={styles.xchangoImg}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>XChango</Text>
            <Text style={styles.date}>{formatDate(info.date)}</Text>
            <Text style={styles.message}>{info.message}</Text>
          </View>
        </View>

        {images.length > 1 && (
          <>
            <FlatList
              ref={flatListRef}
              data={images}
              keyExtractor={(_, i) => i.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={snapInterval}
              snapToAlignment="start"
              decelerationRate="fast"
              scrollEventThrottle={16}
              onScroll={handleScroll}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openImagePreview(item)}
                  style={{ marginRight: imageSpacing }}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: item }}
                    style={[styles.image, { width: imageWidth }]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.imageGrid}
            />
            <View style={styles.paginationContainer}>
              {images.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, idx === activeIndex && styles.activeDot]}
                />
              ))}
            </View>
          </>
        )}

        {images.length === 1 && (
          <TouchableOpacity onPress={() => openImagePreview(images[0])}>
            <Image
              source={{ uri: images[0] }}
              style={[styles.image, { width: imageWidth }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightCompo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  optionText: {
    fontSize: 14,
    marginLeft: 8,
    color: COLORS.primary,
  },

  postContainer: {
    paddingTop: 10,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  card: {
    backgroundColor: COLORS.mainBackgroundColor,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  xchangoImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
    marginTop: 10,
    height: 300,
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
  // EMPTY CONTAINER
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 320,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
  },
});
