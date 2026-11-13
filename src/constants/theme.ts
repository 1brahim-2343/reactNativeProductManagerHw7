export const Spacings = {
  extraSmall: 2,
  small: 4,
  medium: 6,
  mediumLarge: 8,
  large: 12,
  extraLarge: 16,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 48,
} as const;

export const Colors = {
  primary: "#D7FF3A",
  primaryOpacified: "#D7FF3A29",
  primaryDark: "#B8DB1C",
  primaryLight: "#2A3312",

  background: "#0C0C0B",
  surface: "#141413",
  surfaceSecondary: "#1B1B18",

  text: "#ECEAE0",
  textSecondary: "#7E7C72",
  textPlaceholder: "#4A4943",

  border: "#2A2A27",
  inactive: "#5A5951",

  success: "#3DDC84",
  error: "#FF5A4D",

  price: "#ECEAE0",
  cartBadge: "#FF5A4D",
} as const;


export const Fonts = {
  regular: "Inter_400Regular",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  black: "Inter_900Black",
  mono: "JetBrainsMono_400Regular",
  monoBold: "JetBrainsMono_700Bold",
} as const;
