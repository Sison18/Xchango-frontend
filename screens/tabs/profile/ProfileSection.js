import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../assets/constants/theme";
import { getMe } from "../../../BACKEND/API'S/auth";
import { useAuth } from "../../../BACKEND/CONTEXTS/authContext";
import { getToken } from "../../../BACKEND/UTILS/secureStore";

export default function ProfileSection() {
  const { user, loading, setUser } = useAuth(); // Requires setUser in context

  // Refresh user data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const token = await getToken();
          const freshUser = await getMe(token);
          setUser(freshUser);
        } catch (error) {
          console.log("Failed to refresh user:", error.message);
        }
      };
      fetchUser();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  const profileUri = user.profile_picture
    ? user.profile_picture
    : "https://via.placeholder.com/100";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a2a2a", "#0b5345", "#000000"]}
        style={styles.profileContainer}
      >
        <Image source={{ uri: profileUri }} style={styles.profileImage} />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={styles.profileName}>{fullName}</Text>
          <Image source={require("../../../assets/images/verified.png")} />
        </View>

        {/* Optional: Show Email */}
        <Text style={styles.email}>{user.email}</Text>

        <Text style={styles.rating}>⭐ 4.8</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 140,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.mainBackgroundColor,
  },
  email: {
    fontSize: 14,
    color: COLORS.mainBackgroundColor,
    marginTop: 2,
  },
  rating: {
    color: COLORS.mainBackgroundColor,
    marginTop: 4,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.darkGreen,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
