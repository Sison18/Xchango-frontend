import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Alert,
  Platform,
  TouchableOpacity,
  Switch,
} from "react-native";
import MapView, { UrlTile, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { COLORS } from "../../assets/constants/theme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [products, setProducts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
      getUserLocation();
    } else {
      const { status: reqStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (reqStatus === "granted") {
        setHasPermission(true);
        getUserLocation();
      } else {
        setHasPermission(false);
        Alert.alert("Location Disabled", "Enable location to view map data.");
        router.replace("/home");
      }
    }
  };

  const getUserLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = loc.coords;
      setLocation(loc);
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.warn("Error getting location:", error);
      Alert.alert("Error", "Failed to retrieve your location.");
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.100.10:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.warn("Failed to fetch products", err));
  }, []);

  if (!region || !location) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontSize: 16 }}>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      {/* Toggle switch */}
      <View
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 999,
          backgroundColor: "#fff",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: 6 }}>Location</Text>
        <Switch
          value={showUserLocation}
          onValueChange={(val) => setShowUserLocation(val)}
        />
      </View>

      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={showUserLocation}
      >
        <UrlTile
          urlTemplate="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />

        {products.map((product) =>
          product.latitude && product.longitude ? (
            <Marker
              key={product.id}
              coordinate={{
                latitude: product.latitude,
                longitude: product.longitude,
              }}
              onPress={() => {
                if (Platform.OS === "android") {
                  setSelectedProduct(product);
                }
              }}
            >
              <View
                style={[
                  styles.markerContainer,
                  {
                    borderColor: product.verification
                      ? COLORS.darkGreen
                      : "red",
                  },
                ]}
              >
                <Image
                  source={{ uri: product.profile }}
                  style={styles.markerImage}
                />
              </View>

              {Platform.OS === "ios" && (
                <Callout onPress={() => router.push("/home")}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.username}>{product.userName}</Text>
                    <Text style={styles.location}>{product.location}</Text>
                    <Text
                      style={[
                        styles.verification,
                        { color: product.verification ? "green" : "red" },
                      ]}
                    >
                      {product.verification ? "Verified" : "Not Verified"}
                    </Text>
                    <Pressable
                      style={styles.buttonContainer}
                      onPress={() => router.push("/home")}
                    >
                      <Text style={styles.viewProfileButton}>View Profile</Text>
                    </Pressable>
                  </View>
                </Callout>
              )}
            </Marker>
          ) : null
        )}
      </MapView>

      {Platform.OS === "android" && selectedProduct && (
        <View style={styles.bottomInfo}>
          <View style={styles.bottomHeader}>
            <Image
              source={{ uri: selectedProduct.profile }}
              style={styles.bottomProfileImage}
            />
            <View style={styles.bottomTextGroup}>
              <Text style={styles.bottomTitle}>{selectedProduct.title}</Text>
              <Text style={styles.bottomUsername}>
                {selectedProduct.userName}
              </Text>
              <Text style={styles.bottomLocation}>
                {selectedProduct.location}
              </Text>
              <Text
                style={[
                  styles.bottomVerification,
                  {
                    color: selectedProduct.verification ? "green" : "red",
                  },
                ]}
              >
                {selectedProduct.verification ? "Verified" : "Not Verified"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.bottomButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: Platform.OS === "android" ? "80%" : "100%",
  },
  markerContainer: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
  verification: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  viewProfileButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 20,
  },
  bottomInfo: {
    height: "15%",
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    justifyContent: "space-between",
  },
  bottomHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 15,
  },
  bottomTextGroup: {
    flex: 1,
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  bottomUsername: {
    fontSize: 14,
    color: "#555",
  },
  bottomLocation: {
    fontSize: 13,
    color: "#888",
  },
  bottomVerification: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  bottomButton: {
    marginTop: 10,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
