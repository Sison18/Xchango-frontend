import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { COLORS } from "../../assets/constants/theme";
import HeaderBar from "../../components/header";

const emptyBell = require("../../assets/images/notifications-bell.png");

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("http://192.168.100.112:5000/products");
      const notifs = Array.isArray(data)
        ? data.filter((item) => item.notifTitle)
        : [];
      setNotifications(notifs);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={styles.card}
      entering={FadeInDown.delay(300 * index).duration(500)}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name="bell-o"
          size={20}
          color={COLORS.mainBackgroundColor}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.notifTitle}</Text>
        <Text style={styles.message}>{item.notifMessage}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.notifTimestamp).toLocaleString()}
        </Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </Animated.View>
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <HeaderBar
        title="Notifications"
        confirmBack={false}
        rightComponent={
          <TouchableOpacity onPress={() => router.push("/unitedfeed")}>
            <Image
              source={require("../../assets/images/chat-img.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={notifications}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.darkGreen]}
            tintColor={COLORS.darkGreen}
            progressBackgroundColor={COLORS.lightgreen}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Animatable.Image
              source={emptyBell}
              style={styles.emptyImage}
              animation="tada"
              duration={1500}
              iterationCount="infinite"
              useNativeDriver
              easing="ease-in-out"
            />
            <Animated.Text
              style={styles.emptyText}
              entering={SlideInLeft.delay(200).duration(300)}
            >
              No Notification yet
            </Animated.Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push("/home")}
            >
              <Animated.Text
                entering={SlideInRight.delay(200).duration(300)}
                style={styles.exploreText}
              >
                Explore Now
              </Animated.Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    width: 22,
    height: 20,
    tintColor: COLORS.mainBackgroundColor,
  },
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: COLORS.mainBackgroundColor,
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.xchangoColor,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
  unreadDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E62E2E",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
    marginLeft: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
    marginBottom: 15,
  },
  exploreButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  exploreText: {
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
    fontWeight: "600",
  },
});
