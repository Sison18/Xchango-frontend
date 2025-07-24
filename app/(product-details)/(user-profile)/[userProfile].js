import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Share,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../../components/header";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../assets/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UserItem from "../../../screens/product-details/user-profile/userProfileItems";

export default function UserProfile() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const { userProfile } = useLocalSearchParams();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    getUserDetails();
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
    try {
      const response = await axios.get(URL);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/products/${userProfile}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  if (!product) return <Text>Loading product details...</Text>;

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  const moreOption = () => (
    <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
      <Entypo name="dots-three-vertical" size={20} color="#ffffffff" />
    </TouchableOpacity>
  );

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out XChango — the best barter app! Download here: exp+://expo-development-client/?url=https://u.expo.dev/11f8143a-97c1-4cac-ab4c-11e3ffa72bc8/group/ed85b388-5806-42e5-94eb-9f7c6301aa00",
        title: "XChango App",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing content:", error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        <HeaderBar confirmBack={false} rightComponent={moreOption()} />
        <LinearGradient
          colors={[COLORS.statusbarBg, "#0b5345", "#000000"]}
          style={styles.profileContainer}
        >
          <TouchableOpacity onPress={() => openImagePreview(user.profile)}>
            <Image
              source={
                user.profile
                  ? { uri: user.profile }
                  : require("../../../assets/images/profile-img.png")
              }
              style={styles.avatar}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.userName}</Text>
              {user.verification && (
                <Image
                  source={require("../../../assets/images/verified.png")}
                />
              )}
            </View>

            <TouchableOpacity onPress={() => router.push("/reviews")}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={COLORS.rating} />
                <Text style={styles.rating}>{user.rating}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.chatBtn}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color={COLORS.darkGreen}
            />
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.postedContainer}>
          <Text style={styles.postedLabel}>Posted Items</Text>
        </View>

        <View style={{ flex: 1 }}>
          <UserItem products={product} />
        </View>
      </View>

      {/* IMAGE PREVIEW MODAL */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeImagePreview}>
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>

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
          <Pressable style={styles.optionsMenu} onPress={() => {}}>
            {/* SHARE */}
            <TouchableOpacity onPress={handleShare} style={styles.rowContainer}>
              <Entypo name="share" size={22} color={COLORS.darkGreen} />
              <Text style={styles.optionText}>Share this profile</Text>
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
            {/* REPORT */}
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                if (user && user.id) {
                  router.push(`(report-user)/${user.id}`);
                }
              }}
            >
              <View style={styles.rowContainer}>
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={24}
                  color={COLORS.darkGreen}
                />
                <Text style={styles.optionText}>Report this User</Text>
              </View>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginRight: 12,
    resizeMode: "cover",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.mainBackgroundColor,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.mainBackgroundColor,
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.mainBackgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  chatText: {
    color: COLORS.darkGreen,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "700",
  },
  postedContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 0.2,
    borderTopColor: COLORS.textboxBorderColor,
  },
  postedLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    paddingVertical: 10,
    paddingLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "80%",
  },
  // ROW CONTAINER
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});
