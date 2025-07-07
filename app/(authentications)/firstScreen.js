import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInRight, ZoomIn } from "react-native-reanimated";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../assets/constants/theme";
import React from "react";

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  return (
    <>
      {/* IMAGE BACKGROUND PARENT */}
      <ImageBackground
        source={require("../../assets/images/ecommerce-splash.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* BLUR BACKGROUND */}
        <LinearGradient
          colors={[
            "transparent",
            "rgba(225,225,255,0.9)",
            "rgba(225,225,255,1)",
          ]}
          style={styles.blurBackground}
        />

        {/* CONTENT CONTAINER */}
        <View style={styles.contentContainer}>
          {/*  TITLE */}
          <Animated.Text
            style={styles.title}
            entering={FadeInRight.delay(500).duration(300)}
          >
            XChango
          </Animated.Text>
          {/* DESCRIPTION */}
          <Animated.Text
            style={styles.description}
            entering={FadeInRight.delay(500).duration(300)}
          >
            Swap more, spend less trade trust, not just things.
          </Animated.Text>

          {/* SIGN IN BUTTON */}
          <Animated.View
            style={styles.signInContainer}
            entering={ZoomIn.duration(700).delay(300)}
          >
            <Link href="./login" asChild>
              <TouchableOpacity style={styles.signinButton}>
                <Image source={require("../../assets/images/signInImg.png")} />
                <Text style={styles.signinButtonText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>

          {/* SIGN UP BUTTON */}
          <Animated.View
            style={styles.signUpContainer}
            entering={ZoomIn.duration(700).delay(500)}
          >
            <Link href="./signup" asChild>
              <TouchableOpacity style={styles.signupButton}>
                <Image source={require("../../assets/images/signUpImg.png")} />
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  // BLUR BACKGROUND
  blurBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },

  // BACKGROUND
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 75,
    paddingHorizontal: 20,
  },

  // TITLE AND DESCRIPTION
  title: {
    fontSize: 24,
    color: COLORS.xchangoColor,
    fontWeight: "700",
    letterSpacing: 2.4,
  },
  description: {
    fontSize: 12,
    color: COLORS.secondary,
    letterSpacing: 1.2,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  // SIGNIN BUTTON
  signInContainer: { alignSelf: "stretch" },
  signinButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.mainBackgroundColor,
  },
  signinButton: {
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.mainBackgroundColor,
    backgroundColor: COLORS.darkGreen,
    height: height * 0.065,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // SIGNUP BUTTON
  signUpContainer: { alignSelf: "stretch" },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  signupButton: {
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.mainBackgroundColor,
    backgroundColor: COLORS.mainBackgroundColor,
    height: height * 0.065,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
