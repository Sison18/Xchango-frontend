import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/search";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsersFromProducts();
  }, []);

  const fetchUsersFromProducts = async () => {
    try {
      const res = await axios.get("http://192.168.100.10:5000/products");

      const uniqueUsersMap = new Map();

      res.data.forEach((product) => {
        const { userId, userName, profile } = product;
        if (userId && userName && !uniqueUsersMap.has(userId)) {
          uniqueUsersMap.set(userId, {
            userId,
            userName,
            profile: profile || `https://i.pravatar.cc/150?u=${userId}`,
          });
        }
      });

      const uniqueUsers = Array.from(uniqueUsersMap.values());
      setAllUsers(uniqueUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = allUsers.filter((user) =>
      user.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    // PARENT CONTAINER
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <SearchBar
        value={query}
        onChangeText={handleSearch}
        onSearchPress={() => {}}
        onBackPress={() => router.back()}
        placeholder="Search users..."
        icon="person-outline"
      />

      {/* SEACRH LIST */}
      {query.length > 0 && (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            // USER CARD
            <View style={styles.userCard}>
              <Image source={{ uri: item.profile }} style={styles.profile} />
              <Text style={styles.userName}>{item.userName}</Text>
            </View>
          )}
          ListEmptyComponent={
            // NO RESULT TEXT
            <Text style={styles.noResult}>No matching users found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // PARENT CONTAINER
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 15,
  },

  // USER SEARCH LIST
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    color: COLORS.darkGreen,
    fontWeight: "600",
  },

  // NO RESULT TEXT
  noResult: {
    textAlign: "center",
    marginTop: 15,
    color: "#999",
    fontStyle: "italic",
  },
});
