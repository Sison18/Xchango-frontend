import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { COLORS } from "../../../assets/constants/theme";
import verified from "../../../assets/images/verified.png";
import { deleteItem } from "../../../BACKEND/API'S/items";

// UPDATED 
export default function ProductList({ status, onDelete }) {
  // Delete item handler with confirmation
  const handleDelete = (itemId) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(itemId); //  Call backend API
              onDelete(); // Re-fetch updated list from parent
            } catch (error) {
              Alert.alert("Error", "Failed to delete item. Try again.");
              console.error("Delete error:", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

    const renderItem = ({ item, index }) => {
    const isPending = item.availability_status === "pending";

    return (
      <Animated.View
        entering={FadeInRight.duration(900).delay(index * 100)}
        key={index}
      >
        <TouchableOpacity style={styles.allCards}>
          {/* LEFT: Image + Info */}
          <View style={styles.leftContainer}>
            <Image
              source={item.images?.[0] ? { uri: item.images[0] } : verified}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </View>

          {/* RIGHT: Actions */}
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
                  <TouchableOpacity onPress={() => router.push("/editItem")}>
                    <FontAwesome name="edit" size={25} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
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
              {dayjs(item.created_at).format("MM/DD/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View>
      <View style={styles.verificationNote}>
        <Text style={styles.verificationText}>
          Want to be trusted by other users? Verify your account to boost your
          credibility and trade with confidence.
        </Text>
      </View>

      <FlatList
        data={status}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 130 : 200,
        }}
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
});
