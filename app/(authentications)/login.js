import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/constants/theme";
import { Link, router } from "expo-router";
import * as Animatable from "react-native-animatable";
import PasswordField from "../../components/textField/passwordField";
import InputField from "../../components/textField/inputField";
import { SafeAreaView } from "react-native-safe-area-context";
import Line from "../../assets/constants/line";

const SignInScreen = () => {
  return (
    <>
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
                animation="tada"
                duration={1500}
                iterationCount="infinite"
                useNativeDriver
                easing="ease-in-out"
                direction="alternate"
                source={require("../../assets/images/xchango-logo.png")}
              />

              {/* TITLE */}
              <Text style={styles.title}>Sign In</Text>
            </View>

            {/* CENTER CONTAINER */}
            <View>
              {/* EMAIL */}
              <InputField
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholder}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* PASSWORD */}
              <PasswordField
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={true}
              />

              {/* FORGOT PASSWORD */}
              <TouchableOpacity
                onPress={() => router.push("./fillup")}
                style={styles.forgetBtn}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.replace("/home")}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>

              {/* OR */}
              <View style={styles.orContainer}>
                <Line />
                <Text style={styles.orText}>Or</Text>
                <Line />
              </View>

              {/* GOOGLE SIGN IN BUTTON */}
              <TouchableOpacity style={styles.googleBtn}>
                <Image
                  source={require("../../assets/images/Google-logo.png")}
                  style={styles.googleLogo}
                />
                <Text style={styles.googleBtnText}>Sign In with Google</Text>
              </TouchableOpacity>
            </View>

            <View>
              {/* SIGN UP LINK */}
              <Text style={styles.signupText}>
                Don&#39;t have an account?{" "}
                <Link href="./signup" asChild>
                  <Text style={styles.signupTextSpan}>Sign Up</Text>
                </Link>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  // PARENT CONTAINER
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
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
    marginTop: 5,
  },

  forgotText: {
    color: COLORS.darkGreen,
    fontSize: 14,
    fontWeight: "600",
    position: "relative",
    bottom: 10,
    textAlign: "right",
  },

  // LOGIN BUTTON
  btn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 14,
    paddingHorizontal: 18,
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
    color: COLORS.placeholder,
    letterSpacing: 1,
  },

  // LOGIN GOOGLE
  googleBtn: {
    backgroundColor: "lightgray",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 20,
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
    marginBottom: Platform.OS === "android" ? -5 : 20,
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
