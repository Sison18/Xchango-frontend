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
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { router } from "expo-router";
import InputField from "../../components/textField/inputField";
import { COLORS } from "../../assets/constants/theme";

const FillUpScreen = () => {
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geo = await Location.reverseGeocodeAsync(location.coords);

    if (geo.length > 0) {
      const info = geo[0];
      setAddress({
        street: info.street || "",
        city: info.city || "",
        region: info.region || "",
        postalCode: info.postalCode || "",
      });
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          {/* PARENT SCROLL CONTAINER */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* TITLE */}
            <Text style={styles.title}>Fill up</Text>
            <Text style={styles.titleQuote}>
              Let&apos;s get to know you better! Complete your details to get
              started.
            </Text>

            {/* INFORMATION -> ( FIRSTNAME, LASTNAME, PHONE_NUMBER ) */}
            <InputField placeholder="First Name" {...inputProps} />
            <InputField placeholder="Last Name" {...inputProps} />
            <InputField
              placeholder="Phone Number"
              keyboardType="phone-pad"
              {...inputProps}
            />

            {/* BIRTHDATE */}
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

            {/* ADDRESS */}
            <Text style={styles.addressText}>Address</Text>
            <InputField
              placeholder="Street"
              value={address.street}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, street: text }))
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
              placeholder="Region / Province"
              value={address.region}
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, region: text }))
              }
              {...inputProps}
            />
            <InputField
              placeholder="Postal Code"
              value={address.postalCode}
              keyboardType="number-pad"
              onChangeText={(text) =>
                setAddress((prev) => ({ ...prev, postalCode: text }))
              }
              {...inputProps}
            />

            {/* AUTOMATIC LOCATION BUTTON */}
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={handleLocation}
            >
              <Text style={styles.locationBtnText}>🗺️ Use My Location</Text>
            </TouchableOpacity>
            {/* NOTE CONTAINER */}
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                📌 *Note: &quot;Use My Location&quot; helps autofill your
                address, but it may not always be accurate or complete.
              </Text>
            </View>

            {/* ANDROID DATE */}
            {showPicker && Platform.OS === "android" && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* IOS DATE */}
            {Platform.OS === "ios" && showPicker && (
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

            {/* DONE BUTTON */}
            <Pressable
              style={({ pressed }) => [
                styles.doneBtn,
                pressed && styles.btnPressed,
              ]}
              onPress={() => router.push("./successfulSignup")}
            >
              <Text style={styles.btnText}>Done</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default FillUpScreen;

const inputProps = {
  placeholderTextColor: COLORS.placeholder,
  inputStyle: { fontSize: 14, paddingVertical: 10 },
};

const styles = StyleSheet.create({
  // PARENT SCROLL CONTAINER
  scrollContainer: {
    paddingHorizontal: 35,
    paddingVertical: 50,
    backgroundColor: COLORS.mainBackgroundColor,
  },

  // TITLE AND QUOTE
  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  titleQuote: {
    color: COLORS.secondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 50,
  },

  // BIRTHDATE
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

  // ADDRESS
  addressText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 3,
  },

  // AUTOMATIC LOCATION BUTTON
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

  // NOTE CONTAINER
  noteContainer: {
    backgroundColor: "#fef9e7",
    borderLeftWidth: 4,
    borderLeftColor: "#f1c40f",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontStyle: "italic",
    lineHeight: 18,
  },

  // IOS DATE
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

  // DONE BUTTON
  doneBtn: {
    backgroundColor: COLORS.darkGreen,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  btnPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: "darkgray",
  },
  btnText: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
    fontSize: 16,
  },
});
