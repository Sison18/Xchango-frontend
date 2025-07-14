import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import TradeScreenTabs from "../../components/trade/tradeScreenTabs";
import axios from "axios";
import PostItem from "../../components/trade/postItem";

export default function TradeScreenWrapper() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.18:5000/products`;
    try {
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  if (!products) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TradeScreenTabs products={products} />

      <PostItem />
    </View>
  );
}
