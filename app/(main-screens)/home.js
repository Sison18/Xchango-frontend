import HomeScreenHeader from "../../screens/tabs/home/homeScreenHeader";
import Banner from "../../screens/tabs/home/banner";
import Categories from "../../screens/tabs/home/categories";
import ProductsStyle from "../../screens/tabs/home/products";
import {
  ActivityIndicator,
  FlatList,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [product, setProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProductsDetails();
    setRefreshing(false);
  }, []);

  useDoubleBackExit();

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: COLORS.mainBackgroundColor }}>
        <HomeScreenHeader />

        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <Categories />
              <Banner />
              <ProductsStyle products={product} />
            </>
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.darkGreen]}
              tintColor={COLORS.darkGreen}
              progressBackgroundColor={COLORS.lightgreen}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
