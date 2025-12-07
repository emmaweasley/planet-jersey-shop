import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  club: string;
  type: 'home' | 'away' | 'third' | 'fourth';
  price: number;
  image: string;
  description?: string;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

// Product endpoints
export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);
export const createProduct = (product: Omit<Product, 'id'>) => api.post<Product>('/products', product);
export const updateProduct = (id: number, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

export default api;
