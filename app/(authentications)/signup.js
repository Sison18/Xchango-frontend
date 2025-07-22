import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import Line from "../../assets/constants/line";
import { COLORS } from "../../assets/constants/theme";
import { signup } from "../../BACKEND/API'S/auth"; 
import InputField from "../../components/textField/inputField";
import PasswordField from "../../components/textField/passwordField";

// UPDATED SIGNUP SCREEN FUNCTIONALITY LOGIC (
export const SignUpScreen = () => {
  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // SIGNUP FUNCTION HANDLING
  const handleSignup = async () => {
    // Input validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }

    try {
      // API CALL
      const response = await signup({ email, password });

      Alert.alert(
        "Signup Successful",
        "Please complete your profile and verify your email through the link we sent.",
        [
          {
            text: "Continue",
            onPress: () => router.replace({ pathname: "/fillup", params: { email } }),
          },
        ]
      );

      // Clear fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          style={styles.container}
        >
          {/* LOGO AND TITLE CONTAINER */}
          <View style={styles.logoTitleContainer}>
            <Animatable.Image
              animation="jello"
              duration={1500}
              iterationCount="infinite"
              useNativeDriver
              easing="ease-in-out"
              direction="alternate"
              source={require("../../assets/images/xchango-logo.png")}
            />
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.titleQuote}>Your next trade starts here.</Text>
          </View>

          {/* CENTER CONTAINER */}
          <View>
            <InputField
              placeholder="Email Address"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordField
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <PasswordField
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.btn} onPress={handleSignup}>
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
  },
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
