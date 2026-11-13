import { ImageSource, ImageSourcePropType } from "react-native";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: ImageSourcePropType;
}
export type UpdateProductDto = Pick<Product, "name" | "description" | "price">;
export const DEFAULT_IMAGE = "placeholder.png";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 89.9,
    description:
      "Over-ear wireless headphones with noise cancelling and up to 30 hours of battery life.",
    imageUrl: require("../imgs/headphones.jpg"),
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149,
    description:
      "Tracks steps, heart rate and sleep. Water resistant, with a bright always-on display.",
    imageUrl: require("../imgs/smartwatch.jpg"),
  },
  {
    id: "3",
    name: "Laptop 14 inch",
    price: 1299,
    description:
      "Lightweight 14 inch laptop with 16 GB RAM and a 512 GB SSD. Great for study and work.",
    imageUrl: require("../imgs/smartwatch.jpg"),
  },
  {
    id: "4",
    name: "Smartphone",
    price: 799,
    description:
      "6.1 inch OLED display, dual camera and all-day battery. Comes with 128 GB of storage.",
    imageUrl: require("../imgs/smartwatch.jpg"),
  },
  {
    id: "5",
    name: "Compact Camera",
    price: 549.5,
    description:
      "24 MP compact camera with a fast lens, 4K video and built-in Wi-Fi for quick sharing.",
    imageUrl: require("../imgs/camera.jpg",)
  },
  {
    id: "6",
    name: "Travel Backpack",
    price: 59.9,
    description:
      "Water resistant 25 L backpack with a padded laptop pocket and a hidden zip pocket.",
    imageUrl: require("../imgs/backpack.jpg"),
  },
];
