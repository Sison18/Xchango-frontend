import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; //
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getMe } from "../../BACKEND/API'S/auth";
import { postItem } from "../../BACKEND/API'S/items";
import { getToken } from "../../BACKEND/UTILS/secureStore";
import { COLORS } from "../../assets/constants/theme";
import CustomPicker from "../../components/CustomPicker";
import HeaderBar from "../../components/header";
import InputField from "../../components/textField/inputField";
import Wishlist from "../../components/wishlist";
import useBackConfirmation from "../../hooks/cancelConfirmation";

const MAX_TOTAL_IMAGE_SIZE_MB = 5;

//UPDATED with backend
export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTradeOption, setSelectedTradeOption] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false); // PANGTEST KANINA Maintained for future use

  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  // UPDATED Automatically fetch location every time pumupunta sa item post screen
  useFocusEffect(
    useCallback(() => {
      loadUserLocation();
    }, [])
  );

  // UPDATED Auto-fill location based on /me API gamit yung users info
 const loadUserLocation = async () => {
  try {
    const token = await getToken();
    const user = await getMe(token);
    console.log("User from /me:", user); // DEBUG done

    // UPDATED adressS fields from users info
    const addr = {
      street: user.street,
      barangay: user.barangay,
      city: user.city,
      region_or_province: user.region_or_province,
      postal_code: user.postal_code,
    };

    if (addr.street && addr.city) { 
      const fullAddress = `${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.region_or_province}, ${addr.postal_code}`;
      console.log("Full address:", fullAddress); // DEBUG done
      setLocation(fullAddress);
    }
  } catch (error) {
    console.log("Failed to load user location", error);
  }
};


  // UPDATED Compress and add selected images para di mabigat sa db
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedAssets = await Promise.all(
        result.assets.map((asset) =>
          ImageManipulator.manipulateAsync(asset.uri, [], {
            compress: 0.6,
            format: ImageManipulator.SaveFormat.JPEG,
          })
        )
      );
      const uris = compressedAssets.map((asset) => asset.uri);
      setImageUris((prev) => [...prev, ...uris]);
    }
  };

  // Get total compressed image size in MB
  const getTotalImageSizeMB = async () => {
    let totalSize = 0;
    for (let uri of imageUris) {
      const info = await FileSystem.getInfoAsync(uri);
      totalSize += info.size;
    }
    return totalSize / (1024 * 1024);
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

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSelectedStatus("");
    setSelectedTradeOption("");
    setImageUris([]);
    setWishlistItems([]);
    setLocation(""); // UPDATED remove if avoid clearing the lovation in setForm
  };

  //  UPDATEDUpload item to backend with FormData
  const handlePost = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !selectedStatus ||
      !selectedTradeOption ||
      !location ||
      imageUris.length === 0
    ) {
      Alert.alert("Missing Info", "Please complete all fields.");
      return;
    }

    try {
      const totalSize = await getTotalImageSizeMB();
      if (totalSize > MAX_TOTAL_IMAGE_SIZE_MB) {
        Alert.alert(
          "Upload too large",
          `Total image size must be under ${MAX_TOTAL_IMAGE_SIZE_MB}MB`
        );
        return;
      }

      setUploading(true); // for testing para makita ko if may progress Used for future spinner/progress logic

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("estimated_price", price);
      formData.append("item_status", selectedStatus);
      formData.append("transaction_option", selectedTradeOption);
      formData.append("location", location);
      formData.append("wishlist_items", JSON.stringify(wishlistItems));

      imageUris.forEach((uri) => {
        const fileName = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(fileName || "");
        const type = match ? `image/${match[1]}` : "image";

        formData.append("item_images", {
          uri,
          name: fileName,
          type,
        });
      });

      // UPDATED API POST BACKEND CALL IT
      await postItem(formData);

      Alert.alert("Success", "Item posted successfully!");
      resetForm();
      router.push("/home");
    } catch (error) {
      console.error("Post item error:", error);
      Alert.alert("Error", "Failed to post item.");
    } finally {
      setUploading(false); // Upload complete pag nag false
    }
  };

  useBackConfirmation("Are you sure you want to cancel this post?");

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar title="Post" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              {/* IMAGE UPLOAD PREVIEW */}
              <View style={styles.imageBox}>
                {imageUris.length > 0 ? (
                  <>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
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

              {/* FORM FIELDS */}
              <InputField
                placeholder="Name of product"
                value={name}
                onChangeText={setName}
                inputStyle={styles.nameDescriptionPriceStyle}
              />
              <InputField
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                inputStyle={styles.nameDescriptionPriceStyle}
              />
              <View style={styles.statusPriceContainer}>
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
                <View style={styles.halfInput}>
                  <InputField
                    placeholder="Estimated Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    inputStyle={styles.nameDescriptionPriceStyle}
                  />
                </View>
              </View>

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

              <InputField
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                multiline
                inputStyle={styles.locationStyle}
                editable={true} //UPDATED set false pag read only or di edited 
              />

              <Wishlist
                selectedItems={wishlistItems}
                onChange={setWishlistItems}
              />

              {/* POST + CANCEL */}
              <View style={styles.postCancelContainer}>
                <TouchableOpacity
                  style={[styles.postBtn, uploading && { opacity: 0.6 }]}
                  onPress={handlePost}
                  disabled={uploading}
                >
                  <Text style={styles.postButtonText}>
                    {uploading ? "Posting..." : "POST"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() =>
                    Alert.alert("Cancel confirmation", "Are you sure?", [
                      { text: "No", style: "cancel" },
                      { text: "Yes", onPress: () => router.back() },
                    ])
                  }
                >
                  <Text style={styles.postButtonText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* IMAGE PREVIEW MODAL */}
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
  scrollContainer: { paddingBottom: 50, paddingHorizontal: 35 },
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
  imageContainer: { position: "relative", marginRight: 10 },
  uploadedImage: { width: 180, height: 180, borderRadius: 8 },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },
  addMoreBtn: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  addMoreText: {
    marginLeft: 6,
    color: COLORS.darkGreen,
    fontSize: 14,
    fontWeight: "600",
  },
  nameDescriptionPriceStyle: {
    borderColor: COLORS.placeholder,
    width: "100%",
    fontSize: 14,
  },
  locationStyle: {
    borderColor: COLORS.placeholder,
    width: "100%",
    fontSize: 14,
    marginTop: 30,
  },
  statusPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },
  halfInput: { flex: 1 },
  postCancelContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 15,
  },
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
  cancelBtn: {
    backgroundColor: COLORS.placeholder,
    width: "45%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  imageIconTextContainer: { alignItems: "center" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: { width: "90%", height: "80%" },
  contentContainer: { paddingBottom: 50 },
});
