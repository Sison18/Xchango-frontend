import { FlatList, StatusBar, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import ImageSlider from "../../components/product-details/ImageSlider";
import Content from "../../components/product-details/Content";
import BottomBar from "../../components/product-details/BottomBar";
import BackShareButton from "../../components/product-details/BackShareButton";
import { COLORS } from "../../assets/constants/theme";
import ProductsStyle from "../../components/home/products";
import useDoubleBackExit from "../../components/reusable components/andoidUseDoubleBackExit";

export default function ProductsDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

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
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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

            <ProductsStyle products={filteredSuggestions} />
          </>
        }
        showsVerticalScrollIndicator={false}
      />

      <BottomBar />
    </View>
  );
}
