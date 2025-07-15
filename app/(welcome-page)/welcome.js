import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, imageMap } from "../../assets/constants/theme";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import { router } from "expo-router";
import slides from "../../assets/data/welcome-slides.json";
import { LinearGradient } from "expo-linear-gradient";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";
import { StatusBar } from "expo-status-bar";

const { height } = Dimensions.get("window");

export default function OnboardingScreen() {
  useDoubleBackExit();

  // NEXT BUTTON
  const nextButtonLabel = (label) => (
    <Animated.View entering={ZoomIn.duration(700)}>
      <View style={styles.nextButtonContainer}>
        <Text style={styles.nextButtonText}>{label}</Text>
      </View>
    </Animated.View>
  );

  // SKIP BUTTON
  const skipButtonLabel = (label) => (
    <Animated.View entering={ZoomIn.duration(700)}>
      <View style={styles.skipButtonContainer}>
        <Text style={styles.skipButtonText}>{label}</Text>
      </View>
    </Animated.View>
  );

  return (
    <>
      {/* STATUS BAR */}
      <StatusBar style="dark" translucent />

      {/* Nandito yung content na na s-slide */}
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
          // PARENT CONTAINER
          <LinearGradient
            colors={["#C5F6D0", "#F1F1F1"]}
            style={styles.container}
          >
            {/* WELCOME IMAGE */}
            <Animated.Image
              entering={FadeInUp.duration(600)}
              source={imageMap[item.imageKey]}
              style={styles.image}
            />
            {/* WELCOME TITLE */}
            <Animated.Text
              entering={FadeInUp.duration(800).delay(100)}
              style={styles.title}
            >
              {item.title}
            </Animated.Text>
            {/* WELCOME DESCRIPTION */}
            <Animated.Text
              entering={FadeInUp.duration(800).delay(300)}
              style={styles.description}
            >
              {item.description}
            </Animated.Text>
          </LinearGradient>
        )}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        renderNextButton={() => nextButtonLabel("Next")} // Para sa custom na "Next" button
        showSkipButton
        renderSkipButton={() => skipButtonLabel("Skip")} // Para sa custom na "Skip" button
        renderDoneButton={() => nextButtonLabel("Done")} // Same style sa "Next Button"
        onDone={() => router.replace("/firstScreen")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // PARENT CONTAINER
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: COLORS.mainBackgroundColor,
  },

  // WELCOME CONTENT
  image: {
    width: "100%",
    height: height * 0.4,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: COLORS.primary,
  },
  description: {
    textAlign: "center",
    color: COLORS.secondary,
  },

  // DOTS
  activeDotStyle: {
    backgroundColor: COLORS.darkGreen,
    width: 30,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    marginBottom: Platform.OS === "android" ? 100 : 50,
  },
  dotStyle: {
    backgroundColor: COLORS.secondary,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    marginBottom: Platform.OS === "android" ? 100 : 50,
  },

  // NEXT BUTTON
  nextButtonContainer: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 7,
    position: "relative",
    bottom: Platform.OS === "android" ? 50 : 25,
  },
  nextButtonText: {
    fontWeight: "600",
    color: COLORS.mainBackgroundColor,
    fontSize: 16,
  },

  // SKIP BUTTON
  skipButtonContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 23,
    paddingVertical: 4,
    position: "relative",
    bottom: Platform.OS === "android" ? 50 : 25,
  },
  skipButtonText: {
    fontWeight: "600",
    color: COLORS.secondary,
    fontSize: 16,
  },
});
