import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/constants/theme";
import PostItem from "../../screens/tabs/trade/postItem";
import TradeScreenTabs from "../../screens/tabs/trade/tradeScreenTabs";

export default function TradeScreenWrapper() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    const URL = `http://192.168.100.112:5000/products`;
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

      <View style={{ flex: 1 }}>
        <TradeScreenTabs products={products} />

        <PostItem />
      </View>
    </SafeAreaView>
  );
}
