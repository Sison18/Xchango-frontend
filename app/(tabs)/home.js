import HomeScreenHeader from "../../screens/tabs/home/homeScreenHeader";
import Banner from "../../screens/tabs/home/banner";
import Categories from "../../screens/tabs/home/categories";
import ProductsStyle from "../../screens/tabs/home/products";
import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../assets/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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

  useDoubleBackExit();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: COLORS.mainBackgroundColor }}>
        <HomeScreenHeader />

        <FlatList
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <Categories />
              <Banner />
              <ProductsStyle products={product} />
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
