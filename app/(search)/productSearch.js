import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/search";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://192.168.100.10:5000/products");

      const products = res.data.filter((item) => item.id && item.title);

      setAllProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product.id.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <SearchBar
        value={query}
        onChangeText={handleSearch}
        onSearchPress={() => {}}
        onBackPress={() => router.back()}
        placeholder="Search products..."
        icon="pricetag-outline"
      />

      {/* SEACRH LIST */}
      {query.length > 0 && (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // ITEM CARD
            <View style={styles.itemCard}>
              <TouchableOpacity>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            // NO RESULT TEXT
            <Text style={styles.noResult}>No matching products found</Text>
          }
          showsVerticalScrollIndicator={false}
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

  // ITEM SEARCH LIST
  itemCard: {
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
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkGreen,
  },

  // NO RESULT TEXT
  noResult: {
    textAlign: "center",
    marginTop: 15,
    color: "#999",
    fontStyle: "italic",
  },
});
