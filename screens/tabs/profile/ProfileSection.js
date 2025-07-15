import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../assets/constants/theme";

export default function ProfileSection({ userOne }) {
  return (
    <View style={styles.container}>
      {/* PROFILE CONTAINER WITH GRADIENT */}
      <LinearGradient
        colors={["#1a2a2a", "#0b5345", "#000000"]}
        style={styles.profileContainer}
      >
        {/* PROFILE IMAGE */}
        <Image source={{ uri: userOne.profile }} style={styles.profileImage} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          {/* FULL NAME */}
          <Text style={styles.profileName}>{userOne.userName}</Text>
          {/* VERIFIED */}
          <Image source={require("../../../assets/images/verified.png")} />
        </View>
        {/* RATING */}
        <Text style={styles.rating}>⭐ {userOne.rating.toFixed(1)}</Text>
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
    // borderTopRightRadius: 900,
    // borderTopLeftRadius: 100,
    // borderBottomLeftRadius: 900,
    // borderBottomRightRadius: 100,
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
  rating: {
    color: COLORS.mainBackgroundColor,
    marginTop: 2,
  },
});
