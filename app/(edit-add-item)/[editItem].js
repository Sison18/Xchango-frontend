// ProductsDetails.js
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
import { COLORS } from "../../assets/constants/theme";
import InputField from "../../components/textField/inputField";
import Wishlist from "../../components/wishlist";
import CustomPicker from "../../components/CustomPicker";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../../components/header";
import * as ImagePicker from "expo-image-picker";
import useBackConfirmation from "../../hooks/cancelConfirmation";

export default function ProductsDetails() {
  const { editItem } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTradeOption, setSelectedTradeOption] = useState("");
  const [location, setLocation] = useState("");
  const [imageUris, setImageUris] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  useBackConfirmation("Are you sure you want to cancel this post?");

  // fetch once
  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/products/${editItem}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  // when product arrives, seed state
  useEffect(() => {
    if (!product) return;
    setName(product.title || "");
    setDescription(product.description || "");
    setPrice(product.estimatedPrice?.toString() || "");
    setSelectedStatus(product.condition || "");
    setSelectedTradeOption(product.tradeOption?.[0] || "");
    setImageUris(product.image || []);
    if (product.address?.[0]) {
      const addr = product.address[0];
      setLocation(
        `${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.regionProvince}, ${addr.postalCode}`
      );
    }
  }, [product]);

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
    setImageUris((prev) => prev.filter((_, i) => i !== index));
  };

  const openImagePreview = (uri) => {
    setSelectedImageUri(uri);
    setPreviewVisible(true);
  };
  const closeImagePreview = () => {
    setPreviewVisible(false);
    setSelectedImageUri(null);
  };

  const handlePost = () => {
    // your save logic here...
    router.push("/trade");
  };

  if (!product) return <Text>Loading product details...</Text>;

  return (
    <>
      <StatusBar style="light" translucent />
      {/* HEADER */}
      <HeaderBar title="Edit" />
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
                      style={styles.addMoreBtn}
                      onPress={pickImage}
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
                    style={styles.imageIconTextContainer}
                    onPress={pickImage}
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
                value={name}
                onChangeText={setName}
                inputStyle={styles.nameDescriptionPriceStyle}
              />

              {/* DESCRIPTION */}
              <InputField
                placeholder="Description"
                placeholderTextColor={COLORS.placeholder}
                value={description}
                onChangeText={setDescription}
                inputStyle={styles.nameDescriptionPriceStyle}
                multiline={true}
                numberOfLines={2}
              />

              {/* STATUS & PRICE CONTAINER */}
              <View style={styles.statusPriceContainer}>
                {/* STATUS */}
                <View style={styles.halfInput}>
                  <CustomPicker
                    options={[
                      { label: "Brand New", value: "Brand New" },
                      { label: "Like New", value: "Like New" },
                      { label: "Lightly Used", value: "Lightly Used" },
                      { label: "Used", value: "Used" },
                      { label: "Heavily Used", value: "Heavily Used" },
                      { label: "Unboxed, Unused", value: "Unboxed" },
                    ]}
                    selectedValue={selectedStatus}
                    onValueChange={setSelectedStatus}
                    placeholder="Select item status"
                    placeholderStyle={{ color: COLORS.primary }}
                  />
                </View>
                {/* PRICE */}
                <View style={styles.halfInput}>
                  <InputField
                    placeholder="Estimated Price"
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                    inputStyle={styles.nameDescriptionPriceStyle}
                  />
                </View>
              </View>

              {/* TRANSACTION */}
              <CustomPicker
                options={[
                  { label: "Meet-up", value: "Meet-up" },
                  {
                    label: "Shipping Available",
                    value: "Shipping Available",
                  },
                  { label: "Any", value: "Any" },
                ]}
                selectedValue={selectedTradeOption}
                onValueChange={setSelectedTradeOption}
                placeholder="Select transaction option"
                placeholderStyle={{ color: COLORS.primary }}
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
              <Wishlist initialItems={product.wishlist || []} />

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
