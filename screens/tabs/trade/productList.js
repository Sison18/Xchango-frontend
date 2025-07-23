import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { FadeInRight } from "react-native-reanimated";
import dayjs from "dayjs";
import { COLORS } from "../../../assets/constants/theme";
import { router } from "expo-router";

export default function ProductList({ status }) {
  const renderItem = ({ item, index }) => {
    const isPending = item.status === "Pending Trade";

    return (
      <TouchableOpacity
        onPress={() => router.push(`/(product-details)/${item.id}`)}
      >
        <Animated.View
          entering={FadeInRight.duration(900).delay(index * 100)}
          style={styles.allCards}
        >
          {/* LEFT CONTAINER */}
          <View style={styles.leftContainer}>
            <Image
              source={{ uri: item.image?.[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </View>

          {/* RIGHT CONTAINER */}
          <View style={styles.rightContainer}>
            <View style={styles.editDeleteContainer}>
              {isPending ? (
                <>
                  <FontAwesome
                    name="edit"
                    size={25}
                    color="#ccc"
                    style={{ opacity: 0.4 }}
                  />
                  <MaterialIcons
                    name="delete"
                    size={30}
                    color="#ccc"
                    style={{ opacity: 0.4 }}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => router.push(`/(edit-add-item)/${item.id}`)}
                  >
                    <FontAwesome name="edit" size={25} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="delete"
                      size={30}
                      color={COLORS.darkGreen}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <Text style={styles.postedAt}>
              {dayjs(item.createdAt).format("MM/DD/YYYY")}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={status}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <View style={styles.verificationNote}>
            <Text style={styles.verificationText}>
              Want to be trusted by other users? Verify your account to boost
              your credibility and trade with confidence.
            </Text>
          </View>
        }
        // —— Empty State ——
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="inventory"
              size={48}
              color={COLORS.secondary}
            />
            <Text style={styles.emptyText}>No items to display.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  verificationNote: {
    backgroundColor: "#e6f5ea",
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    opacity: 0.8,
  },
  verificationText: {
    color: COLORS.darkGreen,
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "italic",
  },
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
    marginTop: 10,
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
  // —— Empty State Styles ——
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 12,
    textAlign: "center",
  },
});
