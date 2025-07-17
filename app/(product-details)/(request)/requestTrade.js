import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../../assets/constants/theme";
import InputField from "../../../components/textField/inputField";
import CustomPicker from "../../../components/CustomPicker";
import HeaderBar from "../../../components/header";

export default function RequestTrade() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Photos,
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImageUris((prev) => [...prev, ...uris]);
    }
  };

  const handlePost = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !selectedStatus ||
      imageUris.length === 0
    ) {
      Alert.alert("Missing Info", "Please complete all fields.");
      return;
    }
  };

  const removeImage = (index) => {
    const updated = [...imageUris];
    updated.splice(index, 1);
    setImageUris(updated);
  };

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar title="Request Trade" confirmBack={false} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* PARENT CONTAINER */}
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
        >
          {/* SCROLL CONTAINER */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={styles.headertxt}>
              Make an offer to start the trade. 💬
            </Text>

            {/* IMAGE INPUT */}
            <View style={styles.imageBox}>
              {imageUris.length > 0 ? (
                <>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator
                    contentContainerStyle={styles.imageScrollContainer}
                  >
                    {imageUris.map((uri, index) => (
                      <View key={index} style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => openImagePreview(uri)}>
                          <Image
                            source={{ uri }}
                            style={styles.uploadedImage}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => removeImage(index)}
                        >
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color={COLORS.darkGreen}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.addMoreBtn}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color={COLORS.darkGreen}
                    />
                    <Text style={styles.addMoreText}>Add More Picture</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imageIconTextContainer}
                >
                  <Ionicons name="image-outline" size={40} color="#ccc" />
                  <Text style={styles.imageText}>Select Images</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* PRODUCT NAME */}
            <InputField
              placeholder="Name of product"
              placeholderTextColor={COLORS.placeholder}
              onChangeText={setName}
              value={name}
              inputStyle={styles.nameDescriptionPriceStyle}
            />

            {/* DESCRIPTION */}
            <InputField
              placeholder="Description"
              placeholderTextColor={COLORS.placeholder}
              onChangeText={setDescription}
              value={description}
              inputStyle={styles.nameDescriptionPriceStyle}
            />

            {/* STATUS & PRICE CONTAINER */}
            <View style={styles.statusPriceContainer}>
              {/* STATUS */}
              <View style={styles.halfInput}>
                <CustomPicker
                  placeholder="Select item status"
                  selectedValue={selectedStatus}
                  onValueChange={setSelectedStatus}
                  options={[
                    { label: "Brand New", value: "Brand New" },
                    { label: "Like New", value: "Like New" },
                    { label: "Lightly Used", value: "Lightly Used" },
                    { label: "Used", value: "Used" },
                    { label: "Heavily Used", value: "Heavily Used" },
                    { label: "Unboxed, Unused", value: "Unboxed" },
                  ]}
                />
              </View>
              {/* PRICE */}
              <View style={styles.halfInput}>
                <InputField
                  placeholder="Estimated Price"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="numeric"
                  onChangeText={setPrice}
                  value={price}
                  inputStyle={styles.nameDescriptionPriceStyle}
                />
              </View>
            </View>

            {/* POST BUTTON */}
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postButtonText}>REQUEST</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* IMAGE VIEW */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeImagePreview}>
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // PARENT CONTAINER
  scrollContainer: {
    paddingBottom: 50,
    paddingHorizontal: 35,
  },
  keyboardAvoiding: {
    flex: 1,
  },

  // HEADER
  headertxt: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 30,
  },

  // IMAGE INPUT
  imageBox: {
    borderWidth: 1,
    borderColor: COLORS.placeholder,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
    padding: 10,
  },
  imageScrollContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  uploadedImage: {
    width: 180,
    height: 180,
    borderRadius: 8,
    resizeMode: "cover",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },

  // ADD MORE IMAGE
  addMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addMoreText: {
    marginLeft: 6,
    color: COLORS.darkGreen,
    fontSize: 14,
    fontWeight: "600",
  },

  // PRODUCT NAME, DESCRIPTION, PRICE
  nameDescriptionPriceStyle: {
    borderColor: COLORS.placeholder,
    width: "100%",
    fontSize: 14,
  },

  // STATUS & PRICE CONTAINER
  statusPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },
  halfInput: {
    flex: 1,
  },

  postCancelContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 15,
  },
  // POST BUTTON
  postBtn: {
    backgroundColor: COLORS.darkGreen,
    width: "50%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  postButtonText: {
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
    fontWeight: "bold",
  },

  // CANCEL BUTTON
  cancelBtn: {
    backgroundColor: COLORS.placeholder,
    width: "45%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  // IMAGE VIEW
  imageIconTextContainer: {
    alignItems: "center",
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
});
