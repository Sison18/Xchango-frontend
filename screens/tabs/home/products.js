import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS } from "../../../../XChangoProject/assets/constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import React from "react";
import Line from "../../../../XChangoProject/assets/constants/line";

export default function Products({ products }) {
  const renderItem = ({ item, index }) => (
    <>
      {/* PRODUCT CARDS */}
      <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
        <Animated.View // Card animation at
          entering={FadeInDown.delay(150 * index).duration(500)}
          style={styles.animatedWrapper}
        >
          {/* IMAGE */}
          <Image source={{ uri: item.image[0] }} style={styles.image} />

          {/* HEART BUTTON */}
          <TouchableOpacity style={styles.heart}>
            <FontAwesome5 name="heart" size={16} color={COLORS.darkGreen} />
          </TouchableOpacity>

          <View style={styles.titleConditionLocationContainer}>
            <View style={styles.nameConditionContainer}>
              {/* ITEM NAME */}
              <Text style={styles.productTitle} numberOfLines={1}>
                {item.title}
              </Text>
              {/* CONDITION */}
              <Text style={styles.condition} numberOfLines={1}>
                {item.condition}
              </Text>
            </View>

            <View style={styles.locationTradeContainer}>
              {/* PRODUCT LOCATION */}
              <Text style={styles.locationText} numberOfLines={1}>
                📍{item.location}
              </Text>
              {/* TRANSACTION OPTION */}
              <View style={styles.transactionContainer}>
                <Text style={styles.transactionText} numberOfLines={1}>
                  {item.tradeOption[0]}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </>
  );

  return (
    <>
      {/* SUGGESTED PRODUCTS & LINE CONTAINER */}
      <View style={styles.suggestedProductsContainer}>
        <Text style={styles.suggestedProductsText}>Suggested Products</Text>
        <Line />
      </View>

      {/* PRODUCT CARDS */}
      <FlatList
        data={products}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.productsList}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 0 }}
        columnWrapperStyle={styles.columnWrapper}
      />
    </>
  );
}

const screenWidth = Dimensions.get("window").width;
const cardMargin = 8;
const cardWidth = screenWidth / 2 - cardMargin * 2.5;

const styles = StyleSheet.create({
  // SUGGESTED PRODUCTS & LINE CONTAINER
  suggestedProductsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  suggestedProductsText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
    color: COLORS.primary,
  },

  // PRODUCT CARDS
  productsList: {
    paddingBottom: Platform.OS === "android" ? 50 : 60,
  },
  animatedWrapper: {
    width: cardWidth,
    margin: cardMargin,
  },
  columnWrapper: {
    justifyContent: "center",
  },

  // IMAGE
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  // HEART
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.mainBackgroundColor,
    padding: 5,
    borderRadius: 20,
    zIndex: 100,
  },

  // TITLE & CONDITION & LOCATION CONTAINER
  titleConditionLocationContainer: {
    paddingBottom: 10,
    width: "100%",
  },

  // PRODUCT NAME & CONDITION CONTAINER
  nameConditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkGreen,
    width: "75%",
  },
  condition: {
    fontSize: 13,
    color: COLORS.secondary,
    width: "20%",
    textAlign: "right",
  },

  // LOCATION & TRANSACTION CONTAINER
  locationTradeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 11,
    color: COLORS.welcomePageGray,
    width: "43%",
    textAlign: "left",
  },
  transactionContainer: {
    marginTop: 3,
    width: "55%",
    alignItems: "flex-end",
  },

  transactionText: {
    fontSize: 12,
    color: COLORS.secondary,
    backgroundColor: COLORS.mainBackgroundColor,
    borderWidth: 0.5,
    borderColor: COLORS.secondary,
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
