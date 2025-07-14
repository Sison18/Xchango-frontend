import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/theme";

export default function CustomPicker({
  selectedValue,
  onValueChange,
  options,
  placeholder = "Select an option",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* TEXT FIELD CONTAINER */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => setModalVisible(true)}
      >
        {/* TEXT */}
        <Text style={[styles.text, !selectedValue && styles.placeholder]}>
          {selectedValue || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#333" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalList}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.listText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // TEXT FIELD CONTAINER
  box: {
    borderWidth: 1,
    borderColor: COLORS.placeholder,
    borderRadius: 8,
    backgroundColor: COLORS.textbox,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // TEXT
  text: {
    fontSize: 14,
    color: COLORS.primary,
  },
  placeholder: {
    color: COLORS.placeholder,
  },

  // MODAL
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modal: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalList: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    backgroundColor: COLORS.mainBackgroundColor,
  },
  listText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});
