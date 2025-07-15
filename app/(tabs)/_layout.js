import { Tabs } from "expo-router";
import { COLORS } from "../../assets/constants/theme";
import { Image, Platform, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Animatable from "react-native-animatable";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.darkGreen,
          tabBarInactiveTintColor: COLORS.secondary,
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "white",
            paddingHorizontal: 10,
            marginBottom: Platform.OS === "android" ? 5 : 10,
            borderTopWidth: 0.5,
            borderColor: COLORS.darkGreen,
          },
          tabBarItemStyle: {
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            fontSize: 9,
            marginTop: 2,
          },
        }}
      >
        {/* HOME */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome name="home" size={26} color={color} />
              ) : (
                <Image
                  source={require("../../assets/images/home-img.png")}
                  style={{ width: 24, height: 20, tintColor: color }}
                  resizeMode="contain"
                />
              ),
          }}
        />

        {/* MESSAGE */}
        <Tabs.Screen
          name="message"
          options={{
            tabBarLabel: "Message",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <AntDesign name="wechat" size={24} color={color} />
              ) : (
                <Image
                  source={require("../../assets/images/chat-img.png")}
                  style={{ width: 22, height: 20, tintColor: color }}
                  resizeMode="contain"
                />
              ),
          }}
        />

        {/* TRADE */}
        <Tabs.Screen
          name="trade"
          options={{
            tabBarButton: (props) => (
              <Animatable.View
                animation="jello"
                iterationCount="infinite"
                duration={4000}
              >
                <Pressable
                  {...props}
                  android_ripple={null}
                  style={({ pressed }) => [
                    styles.tradeButton,
                    pressed && { opacity: 1 },
                  ]}
                >
                  <Entypo
                    name="circle-with-plus"
                    size={55}
                    color={COLORS.darkGreen}
                  />
                </Pressable>
              </Animatable.View>
            ),
          }}
        />

        {/* FAVORITES */}
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome6
                  name="heart-circle-plus"
                  size={22}
                  color={color}
                />
              ) : (
                <Image
                  source={require("../../assets/images/heart-img.png")}
                  style={{ width: 20, height: 20, tintColor: color }}
                  resizeMode="contain"
                />
              ),
          }}
        />

        {/* PROFILE */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome name="user-circle-o" size={24} color={color} />
              ) : (
                <Image
                  source={require("../../assets/images/profile-img.png")}
                  style={{ width: 20, height: 20, tintColor: color }}
                  resizeMode="contain"
                />
              ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tradeButton: {
    top: -5,
    height: 60,
  },
});
