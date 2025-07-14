import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";
import ProfileSettings from "./ProfileSettings";

// UPDATED to display real data or use data na finecth sa profile in tabs
export default function ProfileSection({ user, loading }) {
  if (loading) {
    return (
      <View style={styles.centered}>
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
    : "https://via.placeholder.com/100"; // fallback image pag nag error mag load yung image

  return (
    <View style={styles.container}>
      <ProfileSettings /> 
    <View style={styles.profileContainer}> 
      <Image source={{ uri: profileUri }} style={styles.profileImage} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={styles.profileName}>{fullName}</Text>
        <Image source={require("../../assets/images/verified.png")} />
      </View>
      <Text style={styles.rating}>⭐ 4.8</Text>
    </View>

    <Line />
  </View>

);

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainBackgroundColor,
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: COLORS.darkGreen,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.mainBackgroundColor,
  },
  rating: {
    color: COLORS.mainBackgroundColor,
    marginTop: 2,
  },
  centered: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    color: "#999",
    fontSize: 16,
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
  },
});
