import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../assets/constants/theme";
import { router } from "expo-router";

export default function ProfileSection({ userOne }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const placeholderImage = require("../../../assets/images/no-profile.png");

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri || Image.resolveAssetSource(placeholderImage).uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  const avatarSource = userOne.profile
    ? { uri: userOne.profile }
    : placeholderImage;

  return (
    <View style={styles.container}>
      {/* PROFILE CONTAINER WITH GRADIENT */}
      <LinearGradient
        colors={[COLORS.statusbarBg, "#0b5345", "#000000"]}
        style={styles.profileContainer}
      >
        <TouchableOpacity onPress={() => openImagePreview(userOne.profile)}>
          {/* PROFILE IMAGE */}
          <Image source={avatarSource} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.nameRow}>
          {/* FULL NAME */}
          <Text style={styles.profileName}>{userOne.userName}</Text>
          {/* VERIFIED */}
          {userOne.verification && (
            <Image source={require("../../../assets/images/verified.png")} />
          )}
        </View>

        {/* RATING */}
        <TouchableOpacity onPress={() => router.push("/reviews")}>
          <Text style={styles.rating}>⭐ {userOne.rating.toFixed(1)}</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* IMAGE PREVIEW MODAL */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeImagePreview}>
          <Image
            source={
              selectedImageUri ? { uri: selectedImageUri } : placeholderImage
            }
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 140,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.mainBackgroundColor,
  },
  rating: {
    color: COLORS.mainBackgroundColor,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "80%",
  },
});
