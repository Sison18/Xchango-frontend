import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../assets/constants/theme";
import Line from "../../assets/constants/line";

export default function Content({
  title,
  description,
  transactionOption,
  location,
  condition,
  profile,
  name,
  rating,
  wishlist,
}) {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const MAX_LINES = 4;

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleExpanded2 = () => setExpanded2(!expanded2);

  return (
    <>
      <Line />
      {/* TITLE-------------------------------------------------------------*/}
      <Text style={styles.title}>{title}</Text>

      {/* DESCRIPTION CONTAINER-------------------------------------------- */}
      <View style={styles.descriptionContainer}>
        <Text
          style={styles.descriptionText}
          numberOfLines={expanded ? undefined : MAX_LINES}
        >
          <Text style={styles.descriptionSpan}>Description: </Text>
          {description}
        </Text>
        {/* TOGGLE TEXT */}
        {description.length > 150 && (
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.toggleText}>
              {expanded ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Line />

      {/* OTHER INFORMATION------------------------------------------------- */}
      <View style={styles.otherContainer}>
        {/* PROFILE & NAME & RATING */}
        <TouchableOpacity style={styles.profileNameRating}>
          {/* PROFILE */}
          <Image source={{ uri: profile }} style={styles.profileImg} />
          {/* USERNAME & RATING */}
          <View>
            <Text style={styles.usernameText}>{name}</Text>
            <View style={styles.stars}>
              <Text style={{ color: COLORS.secondary }}>
                ⭐ {rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* LOCATION & TRANSACTION & CONDITION CONTAINER */}
        <View style={styles.locationTransacCondition}>
          <Text style={styles.ltcText}>{location}</Text>
          <Text style={styles.ltcText}>Status: {condition}</Text>
          <Text style={styles.ltcText}>{transactionOption}</Text>
        </View>
      </View>

      {/* WISHLIST CONTAINER------------------------------------------------- */}
      <View style={styles.wishlistContainer}>
        <Text
          style={styles.descriptionText}
          numberOfLines={expanded2 ? undefined : MAX_LINES}
        >
          <Text style={styles.descriptionSpan}>Wishlist:{"\n"}</Text>
          {wishlist.map((item, index) => (
            <Text key={index}>
              · {item}
              {"\n"}
            </Text>
          ))}
        </Text>
        {/* WISHLIST TOGGLE */}
        {wishlist.length > 3 && ( // Use length of items not characters
          <TouchableOpacity onPress={toggleExpanded2}>
            <Text style={styles.wishlistToggleText}>
              {expanded2 ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // TITLE
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "900",
    paddingTop: 5,
    paddingLeft: 10,
  },

  // DESCRIPTION CONTAINER
  descriptionContainer: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: COLORS.textboxBorderColor,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.primary,
  },
  descriptionSpan: {
    fontWeight: "900",
  },

  // TOGGLE TEXT(SHOW MORE OR SHOW LESS)
  toggleText: {
    marginTop: 2,
    color: COLORS.secondary,
    fontWeight: "800",
    textAlign: "right",
  },

  // OTHER CONTAINER
  otherContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  // PROFILE & NAME & RATING
  profileNameRating: {
    flexDirection: "row",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  usernameText: {
    fontWeight: "700",
    color: COLORS.primary,
    fontSize: 16,
  },
  stars: {
    flexDirection: "row",
    marginTop: 2,
  },

  // LOCATION & TRANSACTION & CONDITION CONTAINER
  locationTransacCondition: {
    alignItems: "flex-end",
  },
  ltcText: {
    marginBottom: 5,
    fontSize: 14,
    color: COLORS.secondary,
  },

  // WISHLIST
  wishlistContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  wishlistToggleText: {
    marginTop: 2,
    color: COLORS.secondary,
    fontWeight: "800",
    borderWidth: 1,
    borderColor: COLORS.cardBg,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
