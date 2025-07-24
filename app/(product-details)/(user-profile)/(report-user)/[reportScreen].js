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
import CustomPicker from "../../../../components/CustomPicker";
import { COLORS } from "../../../../assets/constants/theme";
import HeaderBar from "../../../../components/header";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function ReportUser() {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { reportScreen } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/products/${reportScreen}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  if (!product) return <Text>Loading product details...</Text>;

  const reasons = [
    {
      label: "Harassment or Abuse",
      value: "Harassment or Abuse",
    },
    {
      label: "Identity & Misrepresentation",
      value: "Identity & Misrepresentation",
    },
    { label: "Scams and Fraud", value: "Scams and Fraud" },
    { label: " Bad Trading Behavior", value: " Bad Trading Behavior" },
    {
      label: "Spam & Inappropriate Content",
      value: "Spam & Inappropriate Content",
    },
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
            <LinearGradient
              colors={[COLORS.statusbarBg, "#0b5345", "#000000"]}
              style={styles.productBox}
            >
              {/* PRODUCT PREVIEW */}

              <Image
                source={
                  product?.profile
                    ? { uri: product.profile }
                    : require("../../../../assets/images/profile-img.png")
                }
                style={styles.productImage}
                resizeMode="cover"
              />

              <View style={styles.nameVeriContainer}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product?.userName || "No Title"}
                </Text>
                {product.verification && (
                  <Image
                    source={require("../../../../assets/images/verified.png")}
                  />
                )}
              </View>
            </LinearGradient>

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
                placeholder="Please tell us why you’re reporting this user."
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
    borderRadius: 100,
    marginBottom: 10,
  },
  nameVeriContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.mainBackgroundColor,
    textAlign: "center",
    marginBottom: 6,
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
