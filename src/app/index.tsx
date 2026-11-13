import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProducts } from "../context/ProductsContext";
import { Product } from "../data/products";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts, Spacings } from "../constants/theme";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import Entypo from "@expo/vector-icons/Entypo";

export default function HomeScreen() {
  const { products } = useProducts();

  const handleNavigation = (item: Product) => {
    router.push({
      pathname: "/productDetails",
      params: { id: item.id },
    });
  };
  return (
    <View style={styles.mainScreen}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <Header products={products} />
              <View style={styles.separator} />
              <View style={styles.titleRow}>
                <Text style={styles.screenTitle}>Products</Text>
                <Text style={styles.superscript}>({products.length})</Text>
              </View>
            </>
          }
          renderItem={({ item, index }) => (
            <ProductCard
              product={item}
              index={index}
              onPress={() => {
                handleNavigation(item);
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
      <Pressable
        style={({ pressed }) => [
          styles.bottomButton,
          pressed && styles.bottomButtonPressed,
        ]}
        onPress={() => router.push("/addProduct")}
      >
        <Text style={styles.bottomButtonText}>ADD PRODUCT</Text>
        <Entypo name="plus" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.textPlaceholder,
    marginTop: Spacings.xLarge,
    width: "100%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacings.xLarge,
  },
  screenTitle: {
    fontSize: 64,
    lineHeight: 70,
    color: Colors.text,
    fontFamily: Fonts.monoBold,
    letterSpacing: -5,
  },
  superscript: {
    fontSize: 22,
    lineHeight: 26,
    color: Colors.primary,
    fontFamily: Fonts.monoBold,
    letterSpacing: 0,
    marginLeft: 4,
    marginTop: 6,
  },
  listContent: {
    paddingBottom: 20,
  },
  bottomButton: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  bottomButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  bottomButtonText: {
    fontFamily: Fonts.monoBold,
    fontSize: 15,
    letterSpacing: 1.5,
  },
});
