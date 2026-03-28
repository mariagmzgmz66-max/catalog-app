export interface ProductFormat {
  description?: string;
  totalWeight?: number;
}

export interface ProductPrice {
  amount?: number;
  currency?: string;
  unit?: string;
}

export interface Product {
  id: number;
  name: string;
  category_id?: number[];
  parent?: number;
  photo?: string;
  price: ProductPrice;
  format: ProductFormat;
  subProducts?: Product[];  
}