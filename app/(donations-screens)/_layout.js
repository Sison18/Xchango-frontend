import { Tabs } from "expo-router";
import { COLORS } from "../../assets/constants/theme";
import { Image, Platform, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Animatable from "react-native-animatable";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function DonationsScreenLayout() {
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
            backgroundColor: COLORS.lightgreen,
            paddingHorizontal: 10,
            marginBottom: Platform.OS === "android" ? 5 : 10,
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
        {/* UNITEDFEED */}
        <Tabs.Screen
          name="unitedfeed"
          options={{
            tabBarLabel: "Unitedfeed",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <MaterialCommunityIcons name="post" size={26} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name="post-outline"
                  size={20}
                  color={color}
                />
              ),
          }}
        />

        {/* LEADERBOARDS */}
        <Tabs.Screen
          name="leaderboards"
          options={{
            tabBarLabel: "Leaderboards",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="stats-chart" size={24} color={color} />
              ) : (
                <Ionicons name="stats-chart-outline" size={20} color={color} />
              ),
          }}
        />

        {/* DETAILS */}
        <Tabs.Screen
          name="details"
          options={{
            tabBarLabel: "Details",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="list-circle-sharp" size={29} color={color} />
              ) : (
                <Ionicons name="list-circle-outline" size={20} color={color} />
              ),
          }}
        />
      </Tabs>
    </>
  );
}
