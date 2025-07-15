import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { AntDesign } from "@expo/vector-icons";
import faqData from "../../assets/data/faqData.json";
import { COLORS } from "../../assets/constants/theme";

import Animated, { ZoomIn, SlideInUp } from "react-native-reanimated";

export default function AboutUsPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <>
      {/* HEADER */}
      <Animated.View entering={SlideInUp.duration(500).delay(150)}>
        <LinearGradient
          colors={[COLORS.statusbarBg, "#0b5345", "black"]}
          style={styles.header}
        >
          <Text style={styles.title}>About Xchango</Text>
          <Text style={styles.subtitle}>Trade Smarter. Swap Confidently.</Text>
        </LinearGradient>
      </Animated.View>

      {/* SCROLLVIEW CONTAINER */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* FAQ SECTION */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>FAQ&apos;s</Text>
          {faqData.map((item, index) => (
            <Animated.View
              key={index}
              style={styles.faqItems}
              entering={ZoomIn.duration(450).delay(index * 100)}
            >
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.8}
              >
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <AntDesign
                  name={activeFaq === index ? "up" : "down"}
                  size={18}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Collapsible collapsed={activeFaq !== index}>
                <View style={styles.faqAnswerBox}>
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
              </Collapsible>
            </Animated.View>
          ))}
        </View>

        {/* KEY FEATURES */}
        <View style={styles.keyFeaturesContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {[
            "🔁 Item-for-Item Trading",
            "📦 Shipping & Tracking",
            "✅ Community Verification",
            "💬 In-App Chat for Traders",
            "🎁 Donate Items to Help Others",
          ].map((feature, i) => (
            <Animated.View
              key={i}
              style={styles.keyFeatureCard}
              entering={ZoomIn.duration(600).delay(i * 300)}
            >
              <Text style={styles.featureEmoji}>{feature.split(" ")[0]}</Text>
              <Text style={styles.featureText}>
                {feature.split(" ").slice(1).join(" ")}
              </Text>
            </Animated.View>
          ))}
        </View>

        {/* WHO WE ARE & OUR MISSION CONTAINER */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Who We Are</Text>
          <Text style={styles.cardText}>
            Xchango is a dedicated barter and item-for-item trading platform. We
            focus on helping users exchange goods fairly and directly without
            the need for money. Xchango makes it easy to find people nearby who
            want to swap items, creating a practical and sustainable way to get
            what you need.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            Our mission at Xchango is to revolutionize the way people exchange
            goods by bringing back the power of bartering. We aim to build a
            trusted and efficient platform where individuals can trade items
            directly, save money, reduce waste, and foster a stronger sense of
            local community through smart, secure, and sustainable exchanges.
          </Text>
        </View>

        {/* OUR TEAM */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {
                name: "Christian",
                role: "Frontend Developer",
                image: require("../../assets/images/profile-sison.jpg"),
                link: "https://www.facebook.com/christianmark.sison",
              },
              {
                name: "Sean",
                role: "Backend Developer",
                image: require("../../assets/images/profile-sean.jpg"),
                link: "https://www.facebook.com/seanigop.10",
              },
              {
                name: "Andrei",
                role: "Database Engineer",
                image: require("../../assets/images/profile-drei.jpg"),
                link: "https://www.facebook.com/andrei.profile",
              },
              {
                name: "Shane",
                role: "UI/UX Designer",
                image: require("../../assets/images/profile-shane.jpg"),
                link: "https://www.facebook.com/shane.profile",
              },
            ].map((member, i) => (
              <TouchableOpacity
                key={i}
                style={styles.avatarContainer}
                onPress={() => Linking.openURL(member.link)}
              >
                <Avatar.Image size={70} source={member.image} />
                <Text style={styles.avatarName}>{member.name}</Text>
                <Text style={styles.avatarRole}>{member.role}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CONTACT US */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:xchango2025@gmail.com")}
          >
            <Text style={styles.contactText}>﹫ XChangoapp@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/share/1J8kBzKiZ7/")
            }
          >
            <Text style={styles.contactText}>ⓕ www.xchango.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("tel:09948721614")}>
            <Text style={styles.contactText}>✆ 09948721614</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // HEADER
  header: {
    paddingTop: 70,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    color: COLORS.mainBackgroundColor,
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: { color: COLORS.placeholder, fontSize: 16, marginTop: 8 },
  // SCROLLVIEW CONTAINER
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  // SECTION TITLE
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.darkGreen,
  },
  // FAQ SECTION
  faqSection: {
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 3,
  },
  faqItems: { marginBottom: 15 },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.mainBackgroundColor,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e7ed",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    marginRight: 10,
  },
  faqAnswerBox: {
    backgroundColor: COLORS.lightgreen,
    padding: 15,
    marginTop: 5,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
  },
  // KEY FEATURES
  keyFeaturesContainer: {
    marginBottom: 20,
  },
  keyFeatureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c9d1d9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  featureEmoji: { fontSize: 15, marginRight: 10 },
  featureText: { fontSize: 14 },
  // WHO WE ARE & OUR MISSION CONTAINER
  card: {
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.darkGreen,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.primary,
    letterSpacing: 1,
    textAlign: "center",
  },
  // OUR TEAM
  teamSection: { marginVertical: 20 },
  avatarContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  avatarName: { marginTop: 8, fontWeight: "bold" },
  avatarRole: { fontSize: 12, color: COLORS.secondary },

  // CONTACT US
  contactSection: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  contactText: { fontSize: 15, marginVertical: 4, color: COLORS.primary },
});
