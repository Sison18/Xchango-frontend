import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function ChatList({ products }) {
  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
      <TouchableOpacity style={styles.chatCard}>
        <Image source={{ uri: item.profile }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{item.userName}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
  message: {
    fontSize: 14,
    color: "#444",
  },
});
