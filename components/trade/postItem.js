import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable";

export default function PostItem() {
  return (
    <>
      {/* POST BUTTON */}
      <TouchableOpacity
        style={styles.postBtn}
        onPress={() => router.push("/addItem")}
      >
        <Animatable.View
          animation="jello"
          iterationCount="infinite"
          duration={4000}
        >
          <MaterialIcons name="add" size={32} color={COLORS.darkGreen} />
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  postBtn: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 95 : 85,
    right: 25,
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 28,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
});
