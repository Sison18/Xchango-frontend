import HomeScreenHeader from "../../components/home/homeScreenHeader";
import Banner from "../../components/home/banner";
import Categories from "../../components/home/categories";
import ProductsStyle from "../../components/home/products";
import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useDoubleBackExit from "../../components/reusable components/andoidUseDoubleBackExit";

export default function HomeScreen() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http:///192.168.100.18:5000/products`;
    try {
      const response = await axios.get(URL);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  useDoubleBackExit();

  return (
    <>
      <HomeScreenHeader />

      <FlatList
        renderItem={({ item, index }) => null}
        ListHeaderComponent={
          <>
            <Categories />
            <Banner />

            <ProductsStyle products={product} />
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
