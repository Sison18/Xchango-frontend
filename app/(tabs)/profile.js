import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ProfileSection from "../../components/profile/ProfileSection";
import TransactionsSection from "../../components/profile/TransactionsSection";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { COLORS } from "../../assets/constants/theme";
import DonationSection from "../../components/profile/DonationSection";
import MenuSection from "../../components/profile/MenuSection";
import { getMe } from "../../backendApi/auth";
import { getToken } from "../../backendApi/utils/secureStore";

//UPDATAD - para mafetch yung data ng user na ididisplay sa profile screen
export default function ProfileScreen() {
  //UPDATED change to actual data from bacjedn
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

   //UPDATED CHANGE TO GET USER PROFILE
  useEffect(() => {
    getUserProfile();
  }, []);

  //UPDATED CHANGE TO GET USER PROFILE
  const getUserProfile = async () => {
    try {
      const token = await getToken();
      if(!token) throw new Error("No token found");

      const userData =  await getMe(token)
      setUser(userData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }finally{
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileSection user={user} loading={loading} />

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
