import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";

export default function ProfileSettings() {
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmation, setshowConfirmation] = useState(false);

  const handleLogoutPress = () => {
    setShowOptions(false);
    setTimeout(() => {
      setshowConfirmation(true);
    }, 200);
  };

  return (
    <>
      <View>
        {/* SETTINGS BUTTON---------------------------------------------------- */}
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          style={styles.settings}
        >
          <Ionicons
            name="settings"
            size={28}
            color={COLORS.mainBackgroundColor}
          />
        </TouchableOpacity>

        {/* OPTIONS MODAL-------------------------------------------------------- */}
        <Modal
          visible={showOptions}
          transparent
          animationType="fade"
          onRequestClose={() => setShowOptions(false)}
        >
          {/*  TAP TO CLOSE THE OPTIONS MENU */}
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowOptions(false)}
          >
            <Pressable style={styles.optionsMenu}>
              {/* EDIT PROFILE */}
              <TouchableOpacity style={styles.EESLContainer}>
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.optionText}>Edit profile</Text>
              </TouchableOpacity>
              {/* EDIT PASSWORD */}
              <TouchableOpacity>
                <View style={styles.EESLContainer}>
                  <MaterialIcons name="key" size={23} color={COLORS.primary} />
                  <Text style={styles.optionText}>Edit password</Text>
                </View>
              </TouchableOpacity>
              {/* SHARE PROFILE LINK */}
              <TouchableOpacity>
                <View style={styles.EESLContainer}>
                  <Entypo name="share" size={22} color={COLORS.primary} />
                  <Text style={styles.optionText}>Share profile link</Text>
                </View>
              </TouchableOpacity>
              {/* LOGOUT */}
              <TouchableOpacity onPress={handleLogoutPress}>
                <View style={styles.EESLContainer}>
                  <AntDesign name="logout" size={20} color={COLORS.primary} />
                  <Text style={styles.optionText}>Log out</Text>
                </View>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* LOGOUT CONFIRMATION MODAL-------------------------------------------------- */}
        <Modal
          visible={showConfirmation}
          transparent
          animationType="fade"
          onRequestClose={() => setshowConfirmation(false)}
        >
          {/*  TAP TO CLOSE THE LOGOUT CONFIRMATION */}
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setshowConfirmation(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalBox}>
                {/* LOGOUT ICON */}
                <AntDesign
                  name="exclamationcircle"
                  size={48}
                  color={COLORS.primary}
                />

                {/* TITLE AND MESSAGE */}
                <Text style={styles.modalTitle}>Log Out?</Text>
                <Text style={styles.modalMessage}>
                  You’re about to end your session. Are you sure you want to log
                  out?
                </Text>

                {/* LOGOUT AND CANCEL BUTTONS */}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => setshowConfirmation(false)}
                  >
                    <Text style={styles.cancelTxt}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      setshowConfirmation(false);
                      router.push("/login");
                    }}
                  >
                    <Text style={styles.confirmTxt}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // SETTINGS
  settings: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
  },
  // TAP TO CLOSE THE OPTIONS MENU
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  // SETTINGS MODAL
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "android" ? 50 : 70,
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
  EESLContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  // LOGOUT MODAL
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: COLORS.mainBackgroundColor,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.primary,
  },
  modalMessage: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  // LOGOUT CONFIRMATION BUTTONS
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  confirmBtn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
  },
  confirmTxt: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
    fontSize: 14,
  },
  cancelBtn: {
    backgroundColor: "#eee",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
  },
  cancelTxt: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontSize: 14,
  },
});
