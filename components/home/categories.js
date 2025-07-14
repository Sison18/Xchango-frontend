import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, categoriesImageMap } from "../../assets/constants/theme";
import CategoriesList from "../../assets/data/categories.json";
import Animated, { FadeInUp } from "react-native-reanimated";
import React from "react";
import Line from "../../assets/constants/line";

export default function Categories() {
  return (
    <>
      {/* CATEGORIES TEXT */}
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>Categories</Text>
        <Line />
      </View>

      {/* CATEGORIES CONTAINER */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CategoriesList.map((perItem, indexOfItem) => (
          <Animated.View
            entering={FadeInUp.delay(indexOfItem * 100).duration(400)}
            key={perItem.id}
          >
            {/* CATEGORY */}
            <TouchableOpacity style={styles.categoriesContainer}>
              <Image
                style={styles.categoriesImage}
                source={categoriesImageMap[perItem.imageKey]}
              />
              <Text style={styles.categoriesText}>{perItem.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // CATEGORY TEXT
  categoryTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 15,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "800",
    marginRight: 8,
    letterSpacing: 1.5,
    color: COLORS.primary,
  },

  // CATEGORY CONTAINER
  categoriesContainer: {
    margin: 8,
    paddingLeft: 10,
    height: 85,
    alignItems: "center",
  },

  // CATEGORY IMAGE & TEXT
  categoriesImage: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 25,
  },
  categoriesText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
    color: COLORS.secondary,
  },
});
