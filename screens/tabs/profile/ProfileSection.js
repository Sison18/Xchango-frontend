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
import { useState } from "react";

export default function ProfileSection({ userOne }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };
  return (
    <View style={styles.container}>
      {/* PROFILE CONTAINER WITH GRADIENT */}
      <LinearGradient
        colors={[COLORS.statusbarBg, "#0b5345", "#000000"]}
        style={styles.profileContainer}
      >
        <TouchableOpacity onPress={() => openImagePreview(userOne.profile)}>
          {/* PROFILE IMAGE */}
          <Image
            source={{ uri: userOne.profile }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
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
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.mainBackgroundColor,
  },
  rating: {
    color: COLORS.mainBackgroundColor,
    marginTop: 2,
  },
  // New styles for modal overlay and image preview
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
