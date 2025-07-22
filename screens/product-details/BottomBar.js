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
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.textboxBorderColor,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingVertical: Platform.OS === "android" ? 15 : 15,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    zIndex: 10,
    elevation: 5,
  },
  // REQUEST BUTTON
  requestButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 8,
    borderTopRadius: 300,
    borderTopRightRadius: 500,
    borderBottomLeftRadius: 500,
    borderRightRadius: 300,
  },
  requestText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
