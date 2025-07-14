import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductList from "./productList";
import { COLORS } from "../../assets/constants/theme";

const Tab = createMaterialTopTabNavigator();

export default function TradeScreenTabs({ products }) {
  const available = products.filter((item) => item.status === "Available");
  const pending = products.filter((item) => item.status === "Pending Trade");

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
      {/* AVAILABLE */}
      <Tab.Screen name="Available">
        {() => <ProductList status={available} />}
      </Tab.Screen>

      {/* PENDING TRADE */}
      <Tab.Screen name="Pending Trade">
        {() => <ProductList status={pending} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
