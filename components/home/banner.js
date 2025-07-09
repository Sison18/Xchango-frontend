// import React, { useState } from "react";
// import { View, Image, StyleSheet, Dimensions } from "react-native";
// import Animated, { FadeIn } from "react-native-reanimated";
// import Carousel from "react-native-reanimated-carousel";
// import { COLORS, BannerImages } from "../../assets/constants/theme";

// const width = Dimensions.get("window").width;

// export default function Banner() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   return (
//     <Animated.View entering={FadeIn.duration(900).delay(200)}>
//       {/* SLIDING BANNER */}
//       <Carousel
//         loop
//         width={width}
//         height={170}
//         autoPlay
//         data={BannerImages}
//         scrollAnimationDuration={2000}
//         onSnapToItem={(index) => setCurrentIndex(index)}
//         renderItem={({ item }) => (
//           <Image source={item} style={styles.bannerImg} resizeMode="cover" />
//         )}
//       />

//       {/* PAGINATIONS DOTS */}
//       <View style={styles.pagination}>
//         {BannerImages.map((_, index) => (
//           <View
//             key={index}
//             style={[styles.dot, currentIndex === index && styles.activeDot]}
//           />
//         ))}
//       </View>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   // IMAGE
//   bannerImg: {
//     width: width,
//   },

//   // PAGINATION
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   dot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: COLORS.secondary,
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: COLORS.darkGreen,
//     width: 8,
//     height: 8,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { COLORS, BannerImages } from "../../assets/constants/theme";
import { router } from "expo-router";

const width = Dimensions.get("window").width;

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBannerPress = (index) => {
    if (index === 0) router.push("/donateNow");
    else if (index === 1) router.push("/trade");
    else if (index === 2) router.push("/aboutUs");
  };

  return (
    <Animated.View entering={FadeIn.duration(900).delay(200)}>
      {/* SLIDING BANNER */}
      <Carousel
        loop
        width={width}
        height={170}
        autoPlay
        data={BannerImages}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleBannerPress(index)}
          >
            <Image source={item} style={styles.bannerImg} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />

      {/* PAGINATION DOTS */}
      <View style={styles.pagination}>
        {BannerImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // IMAGE
  bannerImg: {
    width: width,
    height: 150,
    borderRadius: 10,
  },

  // PAGINATION
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.darkGreen,
    width: 8,
    height: 8,
  },
});
