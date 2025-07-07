import MessageScreenHeader from "../../components/message/messageScreenHeader";
import ChatXChango from "../../components/message/chatXChango";
import MessageContainer from "../../components/message/messagesContainer";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";

export default function MessageScreen() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.10:5000/products`;
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
    <>
      <MessageScreenHeader />

      <MessageContainer products={products} />

      <ChatXChango />
    </>
  );
}
