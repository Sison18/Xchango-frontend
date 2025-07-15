import HomeScreenHeader from "../../screens/tabs/favorites/favoritesScreenHeader";
import FavoritesContent from "../../screens/tabs/favorites/favoritesContent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoritesHeader from "../../screens/tabs/favorites/favoritesHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/constants/theme";
import { StatusBar } from "expo-status-bar";

export default function FavoriteScreen() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
    try {
      const response = await axios.get(URL);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
        edges={["top"]}
      >
        <StatusBar style="light" />
        <HomeScreenHeader />

        <FavoritesHeader />

        <FavoritesContent products={product} />
      </SafeAreaView>
    </>
  );
}
