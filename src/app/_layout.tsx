import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_900Black } from "@expo-google-fonts/inter/900Black";
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono/400Regular";
import { JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono/700Bold";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import ProductsProvider from "../context/ProductsContext";
import { Colors, Spacings } from "../constants/theme";

SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ProductsProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerTintColor: Colors.primary,
          headerTitleStyle: { color: Colors.text, fontFamily: "Inter_700Bold" },
          contentStyle: { backgroundColor: Colors.background},
        }}
      >
        <Stack.Screen name="index" options={{ title:'Inventory', headerShown: false}} />
        <Stack.Screen
          name="productDetails"
          options={{ title: "Product Details" }}
        />
        <Stack.Screen name="addProduct" options={{ title: "Add Product" }} />
      </Stack>
    </ProductsProvider>
  );
}