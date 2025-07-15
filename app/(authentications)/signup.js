import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import * as Animatable from "react-native-animatable";
import InputField from "../../components/textField/inputField";
import { COLORS } from "../../assets/constants/theme";
import PasswordField from "../../components/textField/passwordField";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Line from "../../assets/constants/line";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* PARENT CONTAINER */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          style={styles.container}
        >
          {/* LOGO AND TITLE CONTAINER */}
          <View style={styles.logoTitleContainer}>
            {/* LOGO */}
            <Animatable.Image
              animation="jello"
              duration={1500}
              iterationCount="infinite"
              useNativeDriver
              easing="ease-in-out"
              direction="alternate"
              source={require("../../assets/images/xchango-logo.png")}
            />

            {/* TITLE */}
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.titleQuote}>Your next trade starts here.</Text>
          </View>

          {/* CENTER CONTAINER */}
          <View>
            {/* EMAIL */}
            <InputField
              placeholder="Email Address"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* PASSWORD */}
            <PasswordField
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
            />

            {/* CONFIRM PASSWORD */}
            <PasswordField
              placeholder="Confirm password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
            />

            {/* CREATE AN ACCOUNT BUTTON */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.push("./fillup")}
            >
              <Text style={styles.btnText}>Create an Account</Text>
            </TouchableOpacity>

            {/* OR */}
            <View style={styles.orContainer}>
              <Line />
              <Text style={styles.orText}>Or</Text>
              <Line />
            </View>

            {/* GOOGLE SIGN UP BUTTON */}
            <TouchableOpacity style={styles.googleBtn}>
              <Image
                source={require("../../assets/images/Google-logo.png")}
                style={styles.googleLogo}
              />
              <Text style={styles.googleBtnText}>Sign up with Google</Text>
            </TouchableOpacity>

            <View>
              {/* SIGN UP LINK */}
              <Text style={styles.signupText}>
                Already have an account?{" "}
                <Link href="./login" asChild>
                  <Text style={styles.signupTextSpan}>Sign In</Text>
                </Link>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  // PARENT CONTAINER
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
  },
  // LOGO AND TITLE
  logoTitleContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: COLORS.primary,
  },
  titleQuote: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  // CREATE AN ACCOUNT BUTTON
  btn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 8,
    marginTop: 20,
  },
  btnText: {
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
    fontWeight: "600",
  },

  // OR
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    marginTop: 5,
    paddingHorizontal: 40,
  },
  orText: {
    color: COLORS.secondary,
    letterSpacing: 1,
  },
  // GOOGLE SIGNUP BUTTON
  googleBtn: {
    backgroundColor: "lightgray",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  googleLogo: {
    height: 20,
    width: 20,
  },
  googleBtnText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  // SIGN UP LINK
  signupText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 24,
    position: "relative",
    textAlign: "center",
  },
  signupTextSpan: {
    color: COLORS.darkGreen,
    fontWeight: "600",
  },
});
