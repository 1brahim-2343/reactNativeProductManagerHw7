import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../data/products";
import { Colors, Fonts, Spacings } from "../constants/theme";

interface ProductCardProps {
  product: Product;
  index: number;
  isSelected?: boolean;
  onPress: () => void;
}

export function ProductCard({ product, index, onPress }: ProductCardProps) {
  const rowNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
  const isFirstItem = product.id === "1";

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${product.name}`}
    >
      {isFirstItem ? <View style={styles.leftBar} /> : null}

      <View style={styles.indexColumn}>
        <Text style={styles.indexText}>{rowNumber}</Text>
      </View>

      <View style={styles.imageFrame}>
        <View style={styles.rectangleTopLeft} />
        <View style={styles.rectangleTopRight} />
        <View style={styles.rectangleBottomLeft} />
        <View style={styles.rectangleBottomRight} />

        <Image
          source={product.imageUrl}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoColumn}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.skuText}>ID/{product.id}</Text>
      </View>

      <View style={styles.priceColumn}>
        <Text style={styles.priceText}>{Math.floor(product.price)}</Text>
        <Text style={styles.currencyText}>AZN</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingRight: Spacings.xLarge,
    position: "relative",
  },
  rowPressed: {
    backgroundColor: "#141412",
  },
  leftBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
    backgroundColor: Colors.primary,
  },
  indexColumn: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  imageFrame: {
    width: 58,
    height: 58,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacings.large,
  },
  rectangleTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 5,
    height: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "gray",
  },
  rectangleTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 5,
    height: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  rectangleBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 5,
    height: 5,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "gray",
  },
  rectangleBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 5,
    height: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: 44,
    height: 44,
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.text,
  },
  skuText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: "#5A5951",
    letterSpacing: 0.5,
  },
  priceColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
    minWidth: 70,
  },
  priceText: {
    fontFamily: Fonts.monoBold,
    fontSize: 16,
    color: Colors.text,
  },
  currencyText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: "#5A5951",
    letterSpacing: 0.5,
  },
});
