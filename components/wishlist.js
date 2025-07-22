import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../assets/constants/theme";

//UPDATED
export default function Wishlist({ selectedItems = [], onChange }) {
  const [text, setText] = useState("");

  //UPDATED
  const handleAdd = () => {
    if (text.trim() === "") return;
    const updatedList = [...selectedItems, text.trim()];
    onChange(updatedList);
    setText("");
  };

  //UPDATED
  const removeWord = (indexToRemove) => {
    const updatedList = selectedItems.filter((_, i) => i !== indexToRemove);
    onChange(updatedList);
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
        {selectedItems.map((item, index) => (
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
