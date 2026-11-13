import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useProducts } from "../context/ProductsContext";
import { Colors, Fonts, Spacings } from "../constants/theme";

export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleAdd = () => {
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

    addProduct({
      id: Date.now().toString(),
      name: name.trim(),
      price: parsedPrice,
      description: description.trim(),
      imageUrl: require("../imgs/noImage.png"),
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
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
              placeholder="e.g. Keyboard"
              placeholderTextColor={Colors.textPlaceholder}
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

          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
            onPress={handleAdd}
          >
            <Entypo name="plus" size={20} color={Colors.background} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </Pressable>
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
    padding: Spacings.xLarge,
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
  },
  addButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacings.medium,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: Colors.primary,

    marginTop: Spacings.small,
  },
  addButtonPressed: {
    opacity: 0.85,
  },
  addButtonText: {
    fontFamily: Fonts.monoBold,
    fontSize: 14,
    color: Colors.background,
    letterSpacing: 0.8,
  },
});
