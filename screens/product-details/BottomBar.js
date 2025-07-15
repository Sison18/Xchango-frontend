import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "../../../XChangoProject/assets/constants/theme";
import { router } from "expo-router";

export default function BottomBar() {
  return (
    <>
      {/* BOTTOM BAR CONTAINER */}
      <View style={styles.bottomBarContainer}>
        {/* CHAT PAGE*/}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/message")}
        >
          <AntDesign name="wechat" size={30} color={COLORS.secondary} />
        </TouchableOpacity>

        {/* ADD TO FAVORITE PAGE */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/favorites")}
        >
          <FontAwesome6
            name="heart-circle-plus"
            size={25}
            color={COLORS.secondary}
          />
        </TouchableOpacity>

        {/* REQUEST BUTTON */}
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => router.push("/requestTrade")}
        >
          <Text style={styles.requestText}>Request</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // BOTTOM BAR CONTAINER
  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.textboxBorderColor,
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: Platform.OS === "android" ? 50 : 15,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    zIndex: 10,
    elevation: 5,
  },
  // REQUEST BUTTON
  requestButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 8,
  },
  requestText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
