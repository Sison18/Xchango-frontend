import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditContent from "../../components/trade/edit-item/edit";

export default function EditItem() {
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
    <View>
      <EditContent products={product} />
    </View>
  );
}

const styles = StyleSheet.create({});
