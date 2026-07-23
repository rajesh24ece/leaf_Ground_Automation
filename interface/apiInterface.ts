export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
