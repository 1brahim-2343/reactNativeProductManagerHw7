import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Spacings } from "../constants/theme";
import { Product } from "../data/products";

export default function Header({products}:{products:Product[]}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubcontainer}>
        <View style={styles.headerImageContainer}>
          <Image
            source={require("../imgs/logo.png")}
            style={styles.headerLogo}
          />
        </View>
        <Text style={styles.headerText}>Inventory</Text>
      </View>
      <View style={styles.headerSubcontainer}>
        <Text style={styles.headerText}>
          {products.length < 10 ? `0${products.length}` : products.length}
        </Text>
        <Text style={styles.headerText}>Items</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: Spacings.xLarge,
    flexDirection: "row",
    gap: Spacings.large,
    justifyContent: "space-between",
  },
  headerSubcontainer: {
    flexDirection: "row",
    gap: Spacings.large,
  },
  headerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    borderWidth: 6,
    width: 24,
    height: 24,
  },
  headerLogo: {
    width: 48,
    height: 48,
  },
  headerText: {
    fontFamily: Fonts.mono,
    fontSize: 16,
    color: Colors.text,
  },
});