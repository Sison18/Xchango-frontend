import { StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  return (
    <>
      <StatusBar style="dark" translucent />

      <LinearGradient colors={["#C5F6D0", "#F1F1F1"]} style={styles.container}>
        <Link href="/home" asChild>
          <TouchableOpacity>
            {/* LOGO IMAGE */}
            <Animatable.Image
              animation="rubberBand"
              duration={2000}
              iterationCount="infinite"
              useNativeDriver
              easing="ease-in-out"
              source={require("../assets/images/xchango-logo.png")}
            />
          </TouchableOpacity>
        </Link>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
