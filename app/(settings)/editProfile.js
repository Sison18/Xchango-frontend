import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import InputField from "../../components/textField/inputField";
import { COLORS } from "../../assets/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import HeaderBar from "../../components/header";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

export default function EditProfileScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: new Date(),
    region: "",
    city: "",
    barangay: "",
    street: "",
    postal: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.100.10:5000/products")
      .then((res) => {
        const data = res.data[0];
        const profile = data.profile;
        const fn = data.firstname;
        const ln = data.lastname;
        const pn = data.phoneNumber;
        const bd = data.birthday;
        const address = data.address?.[0];

        setForm({
          firstName: fn || "",
          lastName: ln || "",
          phone: pn || "",
          birthDate: bd ? new Date(bd) : new Date(),
          region: address?.regionProvince || "",
          city: address?.city || "",
          barangay: address?.barangay || "",
          street: address?.street || "",
          postal: address?.postalCode?.toString() || "",
        });

        if (profile?.profile) {
          setProfileImage(profile.profile);
        }
      })
      .catch((err) => {
        console.log("Error fetching profile:", err.message);
      });
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Photos,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) handleChange("birthDate", selectedDate);
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar
        title="Edit Profile"
        confirmBack={false}
        rightComponent={
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Confirm Save",
                "Are you sure you want to save your changes?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Save",
                    onPress: () => router.push("/profile"),
                  },
                ]
              )
            }
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View entering={ZoomIn.delay(200).duration(500)}>
              <LinearGradient
                colors={["#0f0c29", COLORS.darkGreen, "#000000"]}
                style={styles.profileImageContainer}
              >
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("../../assets/images/banner1.png")
                  }
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>

            <Text style={styles.addressText}>Fullname</Text>
            <Animated.View entering={FadeInDown.delay(100).duration(500)}>
              <InputField
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                {...inputProps}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(500)}>
              <InputField
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
                {...inputProps}
              />
            </Animated.View>

            <Text style={styles.addressText}>Phone Number</Text>
            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
              <InputField
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => handleChange("phone", text)}
                {...inputProps}
              />
            </Animated.View>

            <Text style={styles.addressText}>Date of birth</Text>
            <Animated.View entering={FadeInDown.delay(400).duration(500)}>
              <Pressable
                style={styles.datePicker}
                onPress={() => setShowPicker(true)}
              >
                <Text
                  style={[
                    styles.datePickerText,
                    !form.birthDate && styles.placeholderText,
                  ]}
                >
                  {form.birthDate
                    ? form.birthDate.toLocaleDateString()
                    : "Birth Date"}
                </Text>
              </Pressable>
            </Animated.View>

            <Text style={styles.addressText}>
              Address(Region or Province,City,Barangay,Street,Postal Code)
            </Text>
            <Animated.View entering={FadeInDown.delay(500).duration(500)}>
              <InputField
                placeholder="Region / Province"
                value={form.region}
                onChangeText={(text) => handleChange("region", text)}
                {...inputProps}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(600).duration(500)}>
              <InputField
                placeholder="City"
                value={form.city}
                onChangeText={(text) => handleChange("city", text)}
                {...inputProps}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(700).duration(500)}>
              <InputField
                placeholder="Barangay"
                value={form.barangay}
                onChangeText={(text) => handleChange("barangay", text)}
                {...inputProps}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(800).duration(500)}>
              <InputField
                placeholder="Street"
                value={form.street}
                onChangeText={(text) => handleChange("street", text)}
                {...inputProps}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(900).duration(500)}>
              <InputField
                placeholder="Postal Code"
                keyboardType="number-pad"
                value={form.postal}
                onChangeText={(text) => handleChange("postal", text)}
                {...inputProps}
              />
            </Animated.View>

            {showPicker && Platform.OS === "android" && (
              <DateTimePicker
                value={form.birthDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {Platform.OS === "ios" && showPicker && (
              <Modal transparent animationType="fade">
                <View style={styles.modalContainer}>
                  <View style={styles.pickerWrapper}>
                    <DateTimePicker
                      value={form.birthDate || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      themeVariant="light"
                    />
                    <Pressable
                      style={styles.IOSdoneButton}
                      onPress={() => setShowPicker(false)}
                    >
                      <Text style={styles.IOSdoneButtonText}>Done</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const inputProps = {
  placeholderTextColor: COLORS.placeholder,
  inputStyle: {
    fontSize: 14,
    paddingVertical: 10,
    borderWidth: 0.4,
    borderColor: COLORS.secondary,
    backgroundColor: "#f5fffc",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addressText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: COLORS.primary,
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  profileImageContainer: {
    alignItems: "center",
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editIcon: {
    position: "absolute",
    bottom: 30,
    right: "35%",
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 20,
  },
  datePicker: {
    borderWidth: 0.4,
    borderColor: COLORS.secondary,
    backgroundColor: "#f5fffc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  datePickerText: {
    color: COLORS.xchangoColor,
  },
  placeholderText: {
    color: COLORS.placeholder,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  pickerWrapper: {
    backgroundColor: COLORS.mainBackgroundColor,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  IOSdoneButton: {
    marginTop: 10,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  IOSdoneButtonText: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
  },
});
