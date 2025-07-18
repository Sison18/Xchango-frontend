import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import axios from "axios";
import ProfileSection from "../../screens/tabs/profile/ProfileSection";
import ProfileSettings from "../../screens/tabs/profile/ProfileSettings";
import TransactionsSection from "../../screens/tabs/profile/TransactionsSection";
import DonationSection from "../../screens/tabs/profile/DonationSection";
import MenuSection from "../../screens/tabs/profile/MenuSection";
import { COLORS } from "../../assets/constants/theme";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [product, setProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    try {
      const response = await axios.get("http://192.168.100.10:5000/products");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProductsDetails();
    setRefreshing(false);
  }, []);

  if (!product) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <ScrollView
          style={styles.contentWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.darkGreen]}
              tintColor={COLORS.darkGreen}
              progressBackgroundColor={COLORS.lightgreen}
            />
          }
        >
          <ProfileSettings />
          {product.length > 0 && <ProfileSection userOne={product[0]} />}
          <TransactionsSection />
          <DonationSection />
          <MenuSection />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.statusbarBg,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
