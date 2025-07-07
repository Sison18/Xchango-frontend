import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";

export default function ProfileSection({ userOne }) {
  return (
    // PARENT CONTAINER
    <View style={styles.container}>
      {/* PROFILE CONTAINER */}
      <View style={styles.profileContainer}>
        {/* PROFILE IMAGE */}
        <Image source={{ uri: userOne.profile }} style={styles.profileImage} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          {/* FULL NAME */}
          <Text style={styles.profileName}>{userOne.userName}</Text>
          {/* VERIFIED */}
          <Image source={require("../../assets/images/verified.png")} />
        </View>
        {/* RATING */}
        <Text style={styles.rating}>⭐ {userOne.rating.toFixed(1)}</Text>
      </View>

      <Line />
    </View>
  );
}

const styles = StyleSheet.create({
  // PARENT CONTAINER
  container: {
    backgroundColor: COLORS.mainBackgroundColor,
  },

  // PROFILE CONTAINER
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
});
