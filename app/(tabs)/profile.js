import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import ProfileSection from "../../screens/tabs//profile/ProfileSection";
import ProfileSettings from "../../screens/tabs//profile/ProfileSettings";
import TransactionsSection from "../../screens/tabs/profile/TransactionsSection";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { COLORS } from "../../assets/constants/theme";
import DonationSection from "../../screens/tabs/profile/DonationSection";
import MenuSection from "../../screens/tabs/profile/MenuSection";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
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
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.statusbarBg }}
        edges={["top"]}
      >
        <GestureHandlerRootView style={styles.contentWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileSettings />
            {product && product.length > 0 && (
              <ProfileSection userOne={product[0]} />
            )}

            <TransactionsSection />

            <DonationSection />

            <MenuSection />
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
});
