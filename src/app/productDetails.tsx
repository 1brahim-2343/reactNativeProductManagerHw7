import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useProducts } from "../context/ProductsContext";
import { Colors, Fonts, Spacings } from "../constants/theme";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, updateProduct } = useProducts();
  const insets = useSafeAreaInsets();

  const product = products.find((item) => item.id === id);

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(
    product?.price !== undefined ? String(product.price) : "",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [focusedField, setFocusedField] = useState<
    "name" | "price" | "description" | null
  >(null);
  const [error, setError] = useState("");

  const handleSave = () => {
    const parsedPrice = parseFloat(price);

    if (!name.trim()) {
      setError("Product name cannot be empty.");
      return;
    }

    if (!price.trim() || parsedPrice <= 0) {
      setError("Please enter a valid price greater than zero.");
      return;
    }

    if (!description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    updateProduct(product!.id, {
      name: name.trim(),
      price: parsedPrice,
      description: description.trim(),
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="never"
        >
          <View style={styles.ImageContainer}>
            <Image source={product!.imageUrl} style={styles.Image} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>PRODUCT NAME</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "name" && styles.inputFocused,
                ]}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError("");
                }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Wireless Headphones"
                placeholderTextColor={Colors.textPlaceholder}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>PRICE (AZN)</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "price" && styles.inputFocused,
                ]}
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                  setError("");
                }}
                onFocus={() => setFocusedField("price")}
                onBlur={() => setFocusedField(null)}
                placeholder="0.00"
                placeholderTextColor={Colors.textPlaceholder}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>DESCRIPTION</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  focusedField === "description" && styles.inputFocused,
                ]}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  setError("");
                }}
                onFocus={() => setFocusedField("description")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter product details..."
                placeholderTextColor={Colors.textPlaceholder}
                multiline
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.buttonGroup}>
              <Pressable
                style={({ pressed }) => [
                  styles.buttonBase,
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleSave}
              >
                <AntDesign name="save" size={18} color={Colors.background} />
                <Text style={styles.primaryButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacings.extraLarge,
    paddingTop: Spacings.large,
    paddingBottom: Spacings.xxxLarge,
    gap: Spacings.xLarge,
  },
  ImageContainer: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    gap: Spacings.xLarge,
  },
  fieldGroup: {
    gap: Spacings.small,
  },
  label: {
    fontFamily: Fonts.monoBold,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: Spacings.large,
    paddingVertical: 14,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.text,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.error,
    marginTop: -Spacings.small,
  },
  buttonGroup: {
    gap: Spacings.large,
    marginTop: Spacings.small,
  },
  buttonBase: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacings.medium,
    paddingVertical: 16,
    paddingHorizontal: Spacings.extraLarge,
    borderRadius: 14,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  primaryButtonText: {
    fontFamily: Fonts.monoBold,
    fontSize: 14,
    color: Colors.background,
    letterSpacing: 0.8,
  },
});
