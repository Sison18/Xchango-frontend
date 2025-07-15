import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import CustomPicker from "../../../components/CustomPicker";
import { COLORS } from "../../../assets/constants/theme";
import HeaderBar from "../../../components/header";
import { StatusBar } from "expo-status-bar";

export default function ReportItemScreen() {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const reasons = [
    {
      label: "Nudity or sexually explicit content",
      value: "Nudity or sexually explicit content",
    },
    {
      label: "Violent or graphic content",
      value: "Violent or graphic content",
    },
    { label: "Hate speech or symbols", value: "Hate speech or symbols" },
    { label: "Harassment or bullying", value: "Harassment or bullying" },
    {
      label: "Prohibited or illegal item",
      value: "Prohibited or illegal item",
    },
    { label: "Counterfeit or fake goods", value: "fake_goods" },
    { label: "Stolen goods", value: "Stolen goods" },
    {
      label: "False or misleading description",
      value: "False or misleading description",
    },
    { label: "Scam or fraud attempt", value: "Scam or fraud attempt" },
    { label: "Too good to be true", value: "Too good to be true" },
    { label: "Wrong location", value: "Wrong location" },
    { label: "Spam or repetitive post", value: "Spam or repetitive post" },
    { label: "Unsafe or dangerous item", value: "Unsafe or dangerous item" },
    { label: "Violates platform rules", value: "Violates platform rules" },
    { label: "Item not as described", value: "Item not as described" },
    { label: "Other", value: "other" },
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

      {/* SCROLLVIEW CONTAINER */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* REASON PICKER */}
        <View style={styles.inputBox}>
          <CustomPicker
            selectedValue={reason}
            onValueChange={setReason}
            options={reasons}
            placeholder="Select a reason"
          />
        </View>

        {/* DESCRIPTION */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Report Description</Text>
          <TextInput
            placeholder="Please tell us why you’re reporting this item."
            multiline
            value={details}
            onChangeText={setDetails}
            style={styles.descriptionInput}
          />
        </View>

        {/* BUTTONS */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  // SCROLLVIEW CONTAINER
  container: {
    backgroundColor: COLORS.mainBackgroundColor,
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 40,
  },
  // REASON PICKER
  inputBox: {
    marginBottom: 25,
  },
  // DESCRIPTION
  descriptionBox: {
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    textAlignVertical: "top",
  },
  // SUBMIT BUTTON
  submitBtn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 12,
    borderRadius: 6,
    width: "50%",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
