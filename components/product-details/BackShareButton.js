import {
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
  Platform,
  Text,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { COLORS } from "../../assets/constants/theme";

export default function BackShareButton() {
  const [showOptions, setShowOptions] = useState(false);

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
    <View style={{ flex: 1 }}>
      {/* TOP BUTTONS CONTAINER*/}
      <View style={styles.topBtnContainer}>
        {/* BACK BUTTON */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-circle" size={45} color="#04260f" />
        </TouchableOpacity>

        {/* OPTIONS MENU */}
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Entypo name="dots-three-vertical" size={28} color="#04260f" />
        </TouchableOpacity>
      </View>

      {/* OPTIONS MENU MODAL--------------------------------------------------------- */}
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
              <Text style={styles.optionText}>Share this product</Text>
            </TouchableOpacity>
            {/* BACK TO HOME PAGE */}
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                router.push("/home");
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
                router.push("/message");
              }}
            >
              <View style={styles.rowContainer}>
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={24}
                  color={COLORS.darkGreen}
                />
                <Text style={styles.optionText}>Report this Item</Text>
              </View>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // TOP BUTTONS CONTAINER
  topBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === "android" ? 55 : 35,
    left: 10,
    right: 20,
    zIndex: 10,
  },

  // ROW CONTAINER
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  // OPTIONS MENU
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 80,
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
