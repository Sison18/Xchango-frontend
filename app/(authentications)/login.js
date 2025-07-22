import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
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
import Line from "../../assets/constants/line";
import { COLORS } from "../../assets/constants/theme";
import { useAuth } from "../../BACKEND/CONTEXTS/authContext";
import InputField from "../../components/textField/inputField";
import PasswordField from "../../components/textField/passwordField";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// UPDATED Configure Google Sign-In KINOMENT ko muna for now gagana lang to sa native hindi sa expo go need apk para gumana
// GoogleSignin.configure({
//   webClientId: "25478241816-ib9cuiafpei7dk0f3ih8u85iri2hm8fp.apps.googleusercontent.com", // Web client ID (used in backend)
//   iosClientId: "25478241816-dgjrn45ej8h8g9kgd6r9bp1nl7r1gerp.apps.googleusercontent.com", // iOS client ID
//   offlineAccess: false,
// });

//UPDATED
const SignInScreen = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UPDATED Native Google Sign-In logic same dito cinomment ko muna
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     if (!userInfo.idToken) {
  //       throw new Error("No ID token received from Google.");
  //     }

  //     await loginWithGoogle(userInfo.idToken);
  //     router.replace("/home");
  //   } catch (error) {
  //     console.error("Google Login Error:", error);
  //     Alert.alert(
  //       "Google Login Failed",
  //       error.message || "An error occurred during Google login."
  //     );
  //   }
  // };


  // UPDATED Email/password login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Failed", "Please fill in all fields.");
      return;
    }
    try {
      await login(email.trim(), password.trim());
      router.replace("/home");
    } catch (error) {
      console.error("LOGIN ERROR", error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.container}
      >
        <View style={styles.logoTitleContainer}>
          <Animatable.Image
            animation="tada"
            duration={1500}
            iterationCount="infinite"
            useNativeDriver
            easing="ease-in-out"
            direction="alternate"
            source={require("../../assets/images/xchango-logo.png")}
          />
          <Text style={styles.title}>Sign In</Text>
        </View>

        <View>
          <InputField
            placeholder="Enter your email"
            placeholderTextColor={COLORS.placeholder}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordField
            placeholder="Enter your password"
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => router.push("./forgotPassword")}
            style={styles.forgetBtn}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <Line />
            <Text style={styles.orText}>Or</Text>
            <Line />
          </View>

          {/* Google Sign-In (Native) */}
          {/* <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
            <Image
              source={require("../../assets/images/Google-logo.png")}
              style={styles.googleLogo}
            />
            <Text style={styles.googleBtnText}>Sign In with Google</Text>
          </TouchableOpacity> */}

          <View>
            <Text style={styles.signupText}>
              Don&#39;t have an account?{" "}
              <Link href="./signup" asChild>
                <Text style={styles.signupTextSpan}>Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
    marginTop: 20,
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
    margin: 10,
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
