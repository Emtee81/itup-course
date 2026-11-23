export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
}
