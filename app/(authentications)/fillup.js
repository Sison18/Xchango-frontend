import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as Location from "expo-location";
import Animated, { FadeInDown } from "react-native-reanimated";
import InputField from "../../components/textField/inputField";
import { COLORS } from "../../assets/constants/theme";
import { useHeaderHeight } from "@react-navigation/elements";

const FillUpScreen = () => {
  const headerHeight = useHeaderHeight();
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    region: "",
    barangay: "",
    postalCode: "",
  });

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (!location?.coords) {
        Alert.alert("Error", "Unable to fetch coordinates.");
        return;
      }

      const geo = await Location.reverseGeocodeAsync(location.coords);
      if (geo.length > 0) {
        const info = geo[0];
        setAddress({
          street: info.street || "",
          city: info.city || "",
          region: info.region || "",
          barangay: info.subdistrict || info.barangay || "",
          postalCode: info.postalCode || "",
        });
      } else {
        Alert.alert("Location Error", "Could not retrieve address details.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to get location. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : -40}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Fill up</Text>
          <Text style={styles.titleQuote}>
            Let&apos;s get to know you better! Complete your details to get
            started.
          </Text>

          <Animated.View entering={FadeInDown.delay(100)}>
            <Text style={styles.txtSection}>Fullname</Text>
            <InputField placeholder="First Name" {...inputProps} />
            <InputField placeholder="Last Name" {...inputProps} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200)}>
            <Text style={styles.txtSection}>Phone Number</Text>
            <InputField
              placeholder="#"
              keyboardType="phone-pad"
              {...inputProps}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)}>
            <Text style={styles.txtSection}>Date of birth</Text>
            <Pressable
              style={styles.datePicker}
              onPress={() => setShowPicker(true)}
            >
              <Text
                style={[styles.datePickerText, !date && styles.placeholderText]}
              >
                {date ? date.toLocaleDateString() : "Birth Date"}
              </Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.txtSection}>Address</Text>

          <Animated.View entering={FadeInDown.delay(400)}>
            <InputField
              placeholder="Region or Province"
              value={address.region}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, region: text }))
              }
              {...inputProps}
            />
            <InputField
              placeholder="City"
              value={address.city}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, city: text }))
              }
              {...inputProps}
            />
            <InputField
              placeholder="Barangay"
              value={address.barangay}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, barangay: text }))
              }
              {...inputProps}
            />
            <InputField
              placeholder="Street"
              value={address.street}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, street: text }))
              }
              {...inputProps}
            />
            <InputField
              placeholder="Postal Code"
              keyboardType="number-pad"
              value={address.postalCode}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, postalCode: text }))
              }
              {...inputProps}
            />
          </Animated.View>

          <TouchableOpacity style={styles.locationBtn} onPress={handleLocation}>
            <Text style={styles.locationBtnText}>🗺️ Use My Location</Text>
          </TouchableOpacity>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              📌 *Note: &quot;Use My Location&quot; helps autofill your address,
              but it may not always be accurate or complete.
            </Text>
          </View>

          {/* Date Pickers */}
          {showPicker && Platform.OS === "android" && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {showPicker && Platform.OS === "ios" && (
            <Modal transparent animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    value={date || new Date()}
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

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.push("./successfulSignup")}
          >
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FillUpScreen;

const inputProps = {
  placeholderTextColor: COLORS.placeholder,
  inputStyle: { fontSize: 14, paddingVertical: 10 },
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  scrollContainer: {
    paddingHorizontal: 35,
    paddingBottom: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: COLORS.darkGreen,
    textAlign: "center",
    marginTop: 20,
  },
  titleQuote: {
    color: COLORS.secondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  txtSection: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: COLORS.primary,
    marginTop: 20,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: COLORS.textboxBorderColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.textbox,
    marginBottom: 20,
  },
  datePickerText: {
    color: COLORS.xchangoColor,
  },
  placeholderText: {
    color: COLORS.placeholder,
    fontSize: 14,
  },
  locationBtn: {
    backgroundColor: "#e6f4ea",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  locationBtnText: {
    color: COLORS.darkGreen,
    fontWeight: "600",
  },
  noteContainer: {
    backgroundColor: "#fef9e7",
    borderLeftWidth: 4,
    borderLeftColor: "#f1c40f",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontStyle: "italic",
    lineHeight: 18,
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
  doneBtn: {
    backgroundColor: COLORS.darkGreen,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
    fontSize: 16,
  },
});
