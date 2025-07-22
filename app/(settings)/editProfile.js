import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../assets/constants/theme";
import {
  getMe,
  updateProfile,
  updateProfilePicture,
} from "../../BACKEND/API'S/auth.js";
import { getToken } from "../../BACKEND/UTILS/secureStore.js";
import HeaderBar from "../../components/header";
import InputField from "../../components/textField/inputField";

//UPDATED
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

  //UPDATED
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const token = await getToken();
          const res = await getMe(token);

          setForm({
            firstName: res.first_name || res.firstname || "",
            lastName: res.last_name || res.lastname || "",
            phone: res.phone_number || res.phone || "",
            birthDate: res.birthdate ? new Date(res.birthdate) : new Date(),
            region: res.region_or_province || "",
            city: res.city || "",
            barangay: res.barangay || "",
            street: res.street || "",
            postal: res.postal_code?.toString() || "",
          });

          if (res.profile_picture) {
            setProfileImage(res.profile_picture);
          }
        } catch (err) {
          console.log("Error fetching profile:", err.message);
        }
      };

      fetchUser();
    }, [])
  );

  //UPDATED seperate upload for profile kase what if profilepic lang gsto ichange ng user
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      setProfileImage(image.uri);

      try {
        const token = await getToken();
        const response = await updateProfilePicture(token, image);
        setProfileImage(response.user.profile_picture);
        Alert.alert("Success", "Profile picture updated!");
      } catch (error) {
        console.log("Image upload failed", {
          message: error.message,
          responseData: error.response?.data,
          status: error.response?.status,
        });
        Alert.alert("Upload Failed", "Could not upload profile picture.");
      }
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) handleChange("birthDate", selectedDate);
  };

  //UPDATED eto naman para sa profile user info hiwalay sya sa upload profile pic
  const handleSubmit = async () => {
    try {
      const token = await getToken();
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
        birthdate: form.birthDate,
        street: form.street,
        city: form.city,
        region_or_province: form.region,
        barangay: form.barangay,
        postal_code: form.postal,
      };

      await updateProfile(token, payload);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.log("Update profile failed:", error.message);
      Alert.alert("Error", "Could not update profile.");
    }
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <HeaderBar title="Edit Profile" confirmBack={false} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
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

            <Text style={styles.addressText}>Fullname</Text>
            <InputField
              placeholder="First Name"
              value={form.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
              {...inputProps}
            />
            <InputField
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              {...inputProps}
            />

            <Text style={styles.addressText}>Phone Number</Text>
            <InputField
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
              {...inputProps}
            />

            <Text style={styles.addressText}>Date of birth</Text>
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

            <Text style={styles.addressText}>Address</Text>
            <InputField
              placeholder="Region / Province"
              value={form.region}
              onChangeText={(text) => handleChange("region", text)}
              {...inputProps}
            />
            <InputField
              placeholder="City"
              value={form.city}
              onChangeText={(text) => handleChange("city", text)}
              {...inputProps}
            />
            <InputField
              placeholder="Barangay"
              value={form.barangay}
              onChangeText={(text) => handleChange("barangay", text)}
              {...inputProps}
            />
            <InputField
              placeholder="Street"
              value={form.street}
              onChangeText={(text) => handleChange("street", text)}
              {...inputProps}
            />
            <InputField
              placeholder="Postal Code"
              keyboardType="number-pad"
              value={form.postal}
              onChangeText={(text) => handleChange("postal", text)}
              {...inputProps}
            />

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
            {/* UPDATED nag add ako ng save button men */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
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
  scrollContainer: {
    padding: 20,
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
  addressText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: COLORS.primary,
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
  saveButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
