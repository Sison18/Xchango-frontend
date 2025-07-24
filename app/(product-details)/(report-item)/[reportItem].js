import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import CustomPicker from "../../../components/CustomPicker";
import { COLORS } from "../../../assets/constants/theme";
import HeaderBar from "../../../components/header";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function ReportItemScreen() {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { reportItem } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/products/${reportItem}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  if (!product) return <Text>Loading product details...</Text>;

  const reasons = [
    {
      label: "Prohibited or Restricted Content",
      value: "Prohibited or Restricted Content",
    },
    {
      label: "Violates Platform Policies",
      value: "Violates Platform Policies",
    },
    { label: "Misleading or Fraudulent", value: "Misleading or Fraudulent" },
    { label: "Location or Info Issues", value: "Location or Info Issues" },

    { label: "Counterfeit or fake goods", value: "fake_goods" },
    { label: "Stolen goods", value: "Stolen goods" },
    {
      label: "False or misleading description",
      value: "False or misleading description",
    },
    { label: "Spam or repetitive post", value: "Spam or repetitive post" },
    { label: "Unsafe or dangerous item", value: "Unsafe or dangerous item" },
    { label: "Violates platform rules", value: "Violates platform rules" },
    { label: "Item not as described", value: "Item not as described" },
  ];

  const handleSubmit = () => {
    if (!reason) {
      Alert.alert("Missing reason", "Please select a report reason.");
      return;
    }
    if (!details.trim()) {
      Alert.alert("Missing details", "Please describe the issue.");
      return;
    }

    // Submit logic here
    Alert.alert("Report Submitted", "Thank you for your report.");
    router.back();
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar title="Report Item" confirmBack={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={styles.container}>
            {/* PRODUCT PREVIEW */}
            <View style={styles.productBox}>
              <Image
                source={
                  product?.image?.[0]
                    ? { uri: product.image[0] }
                    : require("../../../assets/images/profile-img.png")
                }
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName} numberOfLines={1}>
                {product?.title || "No Title"}
              </Text>

              <Text style={styles.productDescription} numberOfLines={3}>
                {product?.description || "No description provided."}
              </Text>
            </View>

            {/* REASON PICKER */}
            <View style={styles.inputBox}>
              <CustomPicker
                selectedValue={reason}
                onValueChange={setReason}
                options={reasons}
                placeholder="Select a reason"
              />
            </View>

            {/* DESCRIPTION INPUT */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionTitle}>Others</Text>
              <TextInput
                placeholder="Please tell us why you’re reporting this item."
                multiline
                value={details}
                onChangeText={setDetails}
                style={styles.descriptionInput}
                placeholderTextColor={COLORS.placeholder}
              />
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    backgroundColor: COLORS.mainBackgroundColor,
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 24 : 16,
    paddingBottom: 100,
  },

  // PRODUCT CARD
  productBox: {
    width: "100%",
    padding: 16,
    backgroundColor: COLORS.lightgreen,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 20,
  },

  // PICKER SECTION
  inputBox: {
    marginBottom: 24,
  },

  // REPORT DESCRIPTION
  descriptionBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 28,
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  descriptionInput: {
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // SUBMIT BUTTON
  submitBtn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
