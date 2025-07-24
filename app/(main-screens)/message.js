import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/constants/theme";
import ChatXChango from "../../components/chatXChango";
import MessageContainer from "../../screens/tabs/message/messagesContainer";
import MessageScreenHeader from "../../screens/tabs/message/messageScreenHeader";

export default function MessageScreen() {
  const [products, setProducts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProductsDetails();
    setRefreshing(false);
  }, []);

  if (!products) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.darkGreen }}
        edges={["top"]}
      >
        <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <MessageScreenHeader />

          <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
              <>
                <MessageContainer products={products} />
              </>
            }
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
          />

          <ChatXChango
            positionStyle={{ position: "absolute", bottom: 15, right: 25 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
