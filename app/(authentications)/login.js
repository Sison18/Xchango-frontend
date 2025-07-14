import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
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
import { useAuth } from "../../backendApi/contexts/authContext";
import InputField from "../../components/textField/inputField";
import PasswordField from "../../components/textField/passwordField";

//  Google AuthSession SDK UPDATE
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession(); // Needed for web

//Google OAuth2 client ID from Google Console
const GOOGLE_CLIENT_ID =
  "964204207840-k2o3g0tsp89ql9nd0193dk371hifm96q.apps.googleusercontent.com"; //FRONTEND GOOGLE CLIENT UPDATED

//UPDATED GOOGLE SIGNIN, NORMAL LOGIN
const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //GOOGLE
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["openid", "profile", "email"],
    authorizationParams: {
      response_type: "id_token",
    },
  });
    console.log("Redirect URI:", AuthSession.makeRedirectUri({ useProxy: true }));

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        const idToken = response.authentication?.idToken;

        if (!idToken) {
          Alert.alert("Login Failed", "No ID token returned.");
          return;
        }

        try {
          await loginWithGoogle(idToken);
          router.replace("/home");
        } catch (error) {
          console.error("Google login error:", error);
          Alert.alert("Google Login Failed", "Could not log in with Google.");
        }
      }
    };

    handleGoogleResponse();
  }, [response]);

  // UPDATED sean Email Password login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter email and password.");
      return;
    }
    try {
      await login(email.trim(), password.trim());
      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong."
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
              onPress={() => router.push("./fillup")}
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

            <TouchableOpacity
              style={styles.googleBtn}
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <Image
                source={require("../../assets/images/Google-logo.png")}
                style={styles.googleLogo}
              />
              <Text style={styles.googleBtnText}>Sign In with Google</Text>
            </TouchableOpacity>
          </View>

          <View>
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
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
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
