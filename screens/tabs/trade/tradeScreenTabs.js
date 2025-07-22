import React, { useEffect, useState, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductList from "./productList";
import { getItem } from "../../../BACKEND/API'S/items";
import { COLORS } from "../../../assets/constants/theme";
import { ActivityIndicator, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function TradeScreenTabs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UPDATED Fetch all user items from the backend
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const items = await getItem();
      setProducts(items);
    } catch (error) {
      console.error("Failed to fetch user items", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(); // Initial fetch on mount
  }, [fetchItems]);

  // FILTERIXATION by availability status
  const available = products.filter(item => item.availability_status === "available");
  const pending = products.filter(item => item.availability_status === "pending");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.darkGreen,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.welcomePageGray,
          elevation: 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.mainBackgroundColor,
          height: 3,
          borderRadius: 2,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: COLORS.mainBackgroundColor,
        tabBarInactiveTintColor: COLORS.placeholder,
      }}
    >
      {/* Pass refetch function to child */}
      <Tab.Screen name="Available">
        {() => <ProductList status={available} onDelete={fetchItems} />}
      </Tab.Screen>
      <Tab.Screen name="Pending Trade">
        {() => <ProductList status={pending} onDelete={fetchItems} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
