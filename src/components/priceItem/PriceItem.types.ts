export interface Price {
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface Product {
  id: string;
  title: string;
  prices: Price;
  price?: string; // Optional property to hold the selected price
  features: Record<string, boolean>;
}

export interface PricesData {
  products: Product[];
}