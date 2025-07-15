import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../assets/constants/theme";

export default function Wishlist() {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);

  const handleAdd = () => {
    if (text.trim() === "") return;
    setWords((prev) => [...prev, text.trim()]);
    setText("");
  };

  const removeWord = (indexToRemove) => {
    setWords((prevWords) => prevWords.filter((_, i) => i !== indexToRemove));
  };

  return (
    <View>
      {/* TEXT FIELD & ADD TEXT CONTAINER */}
      <View style={styles.txtFieldAddContainer}>
        {/* WISHLIST */}
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Wishlist item for this trade (Optional)"
          placeholderTextColor={COLORS.placeholder}
          style={styles.wishlist}
        />
        {/* ADD BUTTON */}
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* WORDS TAG CONTAINER */}
      <View style={styles.tagContainer}>
        {words.map((item, index) => (
          <View key={index} style={styles.wordContainer}>
            <Text style={styles.wordText}>{item}</Text>
            <TouchableOpacity onPress={() => removeWord(index)}>
              <MaterialIcons name="close" size={16} color="#555" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // TEXT FIELD & ADD TEXT CONTAINER
  txtFieldAddContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    paddingTop: 10,
  },

  // WISHLIST
  wishlist: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.placeholder,
    backgroundColor: COLORS.textbox,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    height: 45,
  },

  // ADD BUTTON
  addButton: {
    backgroundColor: COLORS.darkGreen,
    padding: 10,
    borderRadius: 8,
  },

  // WORDS TAG CONTAINER
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 5,
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderColor: COLORS.darkGreen,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  wordText: {
    fontStyle: "italic",
    color: COLORS.primary,
    marginRight: 5,
    fontSize: 14,
  },
});
