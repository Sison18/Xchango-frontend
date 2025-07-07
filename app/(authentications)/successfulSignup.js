import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("window");

const SuccessfulSignup = () => {
  return (
    // PARENT CONTAINER
    <View style={styles.container}>
      {/* TOP SECTION (CHECK IMAGE, DESCRIPTION) */}
      <View style={styles.topSection}>
        <Animatable.Image
          source={require("../../assets/images/congrats-icon.png")}
          style={styles.image}
          animation="fadeInDown"
          duration={1000}
          iterationCount="infinite"
          direction="alternate"
          easing="ease-in-out"
          useNativeDriver
          resizeMode="contain"
        />
        <Animatable.Text
          style={styles.successText}
          animation="fadeInUp"
          duration={1200}
          delay={200}
        >
          Congratulations you’ve successfully created an account.
        </Animatable.Text>
      </View>

      {/* GO BACK TO LOGIN BUTTON */}
      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={styles.button}
      >
        <Animatable.View animation="fadeIn" duration={1000} delay={200}>
          <Text style={styles.buttonText}>Go back to Login</Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfulSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  // TOP SECTION
  topSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: height * 0.2,
    marginBottom: 30,
  },
  successText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.primary,
    lineHeight: 28,
    paddingHorizontal: 10,
  },

  // GO BACK TO LOGIN BUTTON
  button: {
    backgroundColor: COLORS.darkGreen,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Platform.OS === "android" ? 20 : 15,
  },
  buttonText: {
    color: COLORS.mainBackgroundColor,
    fontWeight: "600",
    fontSize: 16,
  },
});
