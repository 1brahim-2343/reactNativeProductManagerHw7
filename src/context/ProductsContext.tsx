import React, { createContext, ReactNode, useContext, useState } from "react";
import { INITIAL_PRODUCTS, Product, UpdateProductDto } from "../data/products";

type ProductsContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: UpdateProductDto) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export default function ProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };
  const updateProduct = (id: string, updatedProduct: UpdateProductDto) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      ),
    );
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be inside ProductsContext provider");
  }
  return context;
}
