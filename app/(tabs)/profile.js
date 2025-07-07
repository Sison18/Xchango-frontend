import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import ProfileSection from "../../components/profile/ProfileSection";
import ProfileSettings from "../../components/profile/ProfileSettings";
import TransactionsSection from "../../components/profile/TransactionsSection";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { COLORS } from "../../assets/constants/theme";
import DonationSection from "../../components/profile/DonationSection";
import MenuSection from "../../components/profile/MenuSection";

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
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileSettings />
          {product && product.length > 0 && (
            <ProfileSection userOne={product[0]} />
          )}

          <TransactionsSection />

          <DonationSection />

          <MenuSection />
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
});
