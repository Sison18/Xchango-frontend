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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../assets/constants/theme";
import InputField from "../../components/textField/inputField";
import Wishlist from "../../components/wishlist";
import CustomPicker from "../../components/CustomPicker";
import { router } from "expo-router";
import axios from "axios";
import useBackConfirmation from "../../hooks/cancelConfirmation";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../../components/header";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTradeOption, setSelectedTradeOption] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [location, setLocation] = useState("");

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
      !selectedTradeOption ||
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

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  useEffect(() => {
    if (product?.address?.[0]) {
      const addr = product.address[0];
      setLocation(
        `${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.regionProvince}, ${addr.postalCode}`
      );
    }
  }, [product]);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
    try {
      const response = await axios.get(URL);
      if (response.data.length > 0) {
        setProduct(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  useBackConfirmation("Are you sure you want to cancel this post?");

  return (
    <>
      <StatusBar style="light" translucent />
      {/* HEADER */}
      <HeaderBar title="Post" />
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
            {/* CONTENT CONTAINER */}
            <View style={styles.contentContainer}>
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
                          <TouchableOpacity
                            onPress={() => openImagePreview(uri)}
                          >
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
                    <Text style={{ color: COLORS.secondary }}>
                      Select Images
                    </Text>
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
                multiline={true}
                numberOfLines={2}
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

              {/* TRANSACTION */}
              <CustomPicker
                placeholder="Select transaction option"
                selectedValue={selectedTradeOption}
                onValueChange={setSelectedTradeOption}
                options={[
                  { label: "Meet-up", value: "Meet-up" },
                  { label: "Shipping Available", value: "Shipping Available" },
                  { label: "Any", value: "Any" },
                ]}
              />

              {/* LOCATION */}
              <InputField
                value={location}
                onChangeText={(text) => setLocation(text)}
                placeholder="Enter location"
                multiline
                inputStyle={styles.locationStyle}
              />

              {/* WISHLIST */}
              <Wishlist />

              <View style={styles.postCancelContainer}>
                {/* POST BUTTON */}
                <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                  <Text style={styles.postButtonText}>POST</Text>
                </TouchableOpacity>

                {/* CANCEL BUTTON */}
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() =>
                    Alert.alert(
                      "Cancel confirmation",
                      "Are you sure you want to cancel this post?",
                      [
                        { text: "No", style: "cancel" },
                        { text: "Yes", onPress: () => router.back() },
                      ]
                    )
                  }
                >
                  <Text style={styles.postButtonText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    marginTop: 30,
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

  // LOCATION
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
  locationStyle: {
    borderColor: COLORS.placeholder,
    width: "100%",
    fontSize: 14,
    marginTop: 30,
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
    width: "45%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
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
