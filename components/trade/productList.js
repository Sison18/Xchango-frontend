import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import { COLORS } from "../../assets/constants/theme";

export default function ProductList({ status }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.allCards}>
      {/* LEFT CONTAINER */}
      <View style={styles.leftContainer}>
        {/* ITEM IMAGE */}
        <Image
          source={{ uri: item.image?.[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* TEXT CONTAINER */}
        <View style={styles.textContainer}>
          {/* ITEM NAME */}
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          {/* DESCRIPTION */}
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>

      {/* RIGHT CONTAINER */}
      <View style={styles.rightContainer}>
        <View style={styles.editDeleteContainer}>
          <TouchableOpacity>
            <FontAwesome name="edit" size={25} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="delete" size={30} color={COLORS.darkGreen} />
          </TouchableOpacity>
        </View>
        <Text style={styles.postedAt}>
          {dayjs(item.createdAt).format("MM/DD/YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={status}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "ios" ? 130 : 160,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  allCards: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "82%",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.darkGreen,
  },
  description: {
    fontSize: 12,
    color: COLORS.primary,
  },
  postedAt: {
    fontSize: 10,
    color: COLORS.secondary,
    paddingBottom: 5,
    paddingRight: 5,
  },
  rightContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "18%",
  },
  editDeleteContainer: {
    gap: 10,
    paddingTop: 25,
    paddingRight: 15,
  },
});
