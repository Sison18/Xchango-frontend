import HomeScreenHeader from "../../components/favorites/favoritesScreenHeader";
import FavoritesContent from "../../components/favorites/favoritesContent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoritesHeader from "../../components/favorites/favoritesHeader";

export default function FavoriteScreen() {
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
  return (
    <>
      <HomeScreenHeader />

      <FavoritesHeader />

      <FavoritesContent products={product} />
    </>
  );
}
