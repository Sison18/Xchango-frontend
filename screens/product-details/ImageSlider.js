import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { COLORS } from "../../assets/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const width = Dimensions.get("screen").width;
const screenWidth = Dimensions.get("window").width;

export default function ImageSlider({ imageList = [], price }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const flatListRef = useRef(null);

  const handleScrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setSelectedIndex(index);
  };

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedIndex(index);
  };

  if (!imageList.length) return null;

  return (
    <View>
      {/* IMAGE SLIDER--------------------------------------------- */}
      <FlatList
        data={imageList}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel="Main product image"
            />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={selectedIndex}
      />

      {/* IMAGE THUMBNAILS--------------------------------------- */}
      <View style={styles.thumbnailSwipePriceContainer}>
        <FlatList
          data={imageList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
          style={styles.thumbnailList}
          keyExtractor={(_, index) => index.toString()}
          onContentSizeChange={(w) => setContentWidth(w)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleScrollToIndex(index)}
              accessible
              accessibilityLabel={`Thumbnail ${index + 1}`}
            >
              <Image
                source={{ uri: item }}
                style={[
                  styles.thumbnailImg,
                  selectedIndex === index && styles.selectedThumbnail,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />

        {/* SWIPE HINT & PRICE CONTAINER */}
        <View style={styles.swipeHintPriceContainer}>
          {/* SWIPE HINT */}
          {contentWidth > screenWidth * 0.65 && (
            <MaterialIcons
              name="swipe-left"
              size={20}
              color={COLORS.placeholder}
              style={styles.swipe}
            />
          )}
          {/* PRICE */}
          <Text style={styles.estimatedPrice}>{price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // IMAGE SLIDER
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height: 450,
  },
  image: {
    width: width,
    height: 450,
  },

  // IMAGE THUMBNAILS
  thumbnailSwipePriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  thumbnailList: {
    width: "65%",
    marginLeft: 5,
  },
  thumbnailImg: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedThumbnail: {
    borderColor: COLORS.darkGreen,
    borderWidth: 2,
  },

  // SWIPE HINT & PRICE CONTAINER
  swipeHintPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    alignItems: "center",
  },
  estimatedPrice: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.darkGreen,
    color: "white",
    borderRadius: 5,
  },
});
