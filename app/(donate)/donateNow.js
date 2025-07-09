import React, { useEffect, useState } from "react";
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
  StatusBar,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../assets/constants/theme";
import InputField from "../../components/textField/inputField";
import CustomPicker from "../../components/trade/add-item/CustomPicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import useBackConfirmation from "../../components/reusable components/cancelConfirmation";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    try {
      const response = await axios.get("http://192.168.100.10:5000/products");
      if (response.data.length > 0) setProduct(response.data[0]);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

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

  const removeImage = (index) => {
    const updated = [...imageUris];
    updated.splice(index, 1);
    setImageUris(updated);
  };

  const handlePost = () => {
    if (
      !name ||
      !description ||
      !selectedStatus ||
      !selectedPreference ||
      imageUris.length === 0
    ) {
      Alert.alert("Missing Info", "Please complete all fields.");
      return;
    }
  };

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  useBackConfirmation("Are you sure you want to cancel this post?");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Text style={styles.sectionTitle}>Donate an Item</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.inputLabel}>Image</Text>
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
                          <TouchableOpacity
                            onPress={() => openImagePreview(uri)}
                          >
                            <Image
                              source={{ uri }}
                              style={styles.uploadedImage}
                              resizeMode="cover"
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
                    <Text style={{ color: COLORS.secondary }}>
                      Select Images
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.inputLabel}>Item Name</Text>
              <InputField
                placeholder="Name of Item"
                placeholderTextColor={COLORS.placeholder}
                onChangeText={setName}
                value={name}
                inputStyle={styles.itemDescriptionStyle}
              />

              <Text style={styles.inputLabel}>Description</Text>
              <InputField
                placeholder="Describe the item"
                placeholderTextColor={COLORS.placeholder}
                onChangeText={setDescription}
                value={description}
                inputStyle={styles.itemDescriptionStyle}
                multiline={true}
                numberOfLines={2}
              />

              <Text style={styles.inputLabel}>Receiver Preference</Text>
              <CustomPicker
                placeholder="Select preference"
                selectedValue={selectedPreference}
                onValueChange={setSelectedPreference}
                options={[
                  { label: "Children", value: "Children" },
                  { label: "Elderly", value: "Elderly" },
                  { label: "Students", value: "Students" },
                  { label: "Families in need", value: "Families in need" },
                  { label: "Homeless", value: "Homeless" },
                  {
                    label: "Victims of Calamities",
                    value: "Victims of Calamities",
                  },
                  { label: "Orphanages", value: "Orphanages" },
                  {
                    label: "Persons with disabilities (PWD)",
                    value: "Persons with disabilities (PWD)",
                  },
                  { label: "Anyone", value: "Anyone" },
                ]}
              />

              <Text style={styles.conditionInputLabel}>Condition</Text>
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

              <Text style={styles.locationInputLabel}>Location</Text>
              <Text style={styles.location}>
                {product?.address?.[0]
                  ? `${product.address[0].street}, ${product.address[0].barangay}, ${product.address[0].city}, ${product.address[0].postalCode}`
                  : "Location not available"}
              </Text>

              <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                <Text style={styles.postButtonText}>POST</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  Alert.alert(
                    "Cancel confirmation",
                    "Are you sure you want to cancel this donation?",
                    [
                      { text: "No", style: "cancel" },
                      { text: "Yes", onPress: () => router.back() },
                    ]
                  );
                }}
              >
                <Text style={styles.postButtonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal visible={previewVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeImagePreview}>
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
    paddingHorizontal: 30,
  },
  contentContainer: {
    width: "100%",
  },
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
  itemDescriptionStyle: {
    borderColor: COLORS.placeholder,
    width: "100%",
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    color: "#444",
  },
  locationInputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    color: "#444",
    marginTop: 20,
  },
  location: {
    fontSize: 14,
    borderWidth: 1,
    backgroundColor: COLORS.textbox,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: COLORS.primary,
    borderColor: COLORS.placeholder,
    borderRadius: 7,
  },
  conditionInputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#444",
    marginTop: 20,
  },
  postBtn: {
    backgroundColor: COLORS.darkGreen,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  postButtonText: {
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: COLORS.welcomePageGray,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
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
