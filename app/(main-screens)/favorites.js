import HomeScreenHeader from "../../screens/tabs/favorites/favoritesScreenHeader";
import FavoritesContent from "../../screens/tabs/favorites/favoritesContent";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FavoritesHeader from "../../screens/tabs/favorites/favoritesHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/constants/theme";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function FavoriteScreen() {
  const [product, setProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProductsDetails();
    setRefreshing(false);
  }, []);

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

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
        edges={["top"]}
      >
        <StatusBar style="light" />
        <View style={{ flex: 1, backgroundColor: COLORS.mainBackgroundColor }}>
          <HomeScreenHeader />

          <FavoritesHeader />

          <FavoritesContent
            products={product}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
