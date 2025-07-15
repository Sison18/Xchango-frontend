import { FlatList, Text, BackHandler } from "react-native";
import axios from "axios";
import ImageSlider from "../../screens/product-details/ImageSlider";
import Content from "../../screens/product-details/Content";
import BottomBar from "../../screens/product-details/BottomBar";
import { COLORS } from "../../assets/constants/theme";
import Products from "../../screens/tabs/home/products";
import useDoubleBackExit from "../../hooks/andoidUseDoubleBackExit";
import React, { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackShareButton from "../../screens/product-details/BackShareButton";

export default function ProductsDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       router.replace("/home");
  //       return true;
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       onBackPress
  //     );

  //     return () => subscription.remove();
  //   }, [])
  // );
  useDoubleBackExit(false);

  useEffect(() => {
    fetchProductDetails();
    fetchSuggestedProducts();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.10:5000/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const fetchSuggestedProducts = async () => {
    try {
      const response = await axios.get(`http://192.168.100.10:5000/products`);
      setSuggestedProducts(response.data);
    } catch (error) {
      console.error("Error fetching suggested products:", error.message);
    }
  };

  if (!product) return <Text>Loading product details...</Text>;

  const filteredSuggestions = suggestedProducts.filter(
    (item) => item._id !== id
  );

  return (
    <>
      <StatusBar style="dark" translucent />

      <BackShareButton />

      <FlatList
        contentContainerStyle={{ backgroundColor: COLORS.mainBackgroundColor }}
        renderItem={({ item, index }) => null}
        ListHeaderComponent={
          <>
            <ImageSlider
              imageList={product.image}
              price={product.estimatedPrice}
            />

            <Content
              title={product.title}
              description={product.description}
              transactionOption={product.tradeOption[2]}
              location={product.location}
              condition={product.condition}
              name={product.userName}
              rating={product.rating}
              profile={product.profile}
              wishlist={product.wishlist}
            />

            <Products products={filteredSuggestions} />
          </>
        }
        showsVerticalScrollIndicator={false}
      />

      <BottomBar />
    </>
  );
}
