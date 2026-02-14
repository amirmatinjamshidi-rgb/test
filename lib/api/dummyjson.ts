/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const dummyjsonApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for auth token if needed
dummyjsonApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
  role: string;
  company: {
    name: string;
    title: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const authApi = {
  login: async (credentials: any): Promise<LoginResponse> => {
    const response = await dummyjsonApi.post("/auth/login", credentials);
    return response.data;
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await dummyjsonApi.get("/auth/me");
    return response.data;
  },
};

export const productsApi = {
  getAll: async (params?: {
    limit?: number;
    skip?: number;
    q?: string;
  }): Promise<ProductsResponse> => {
    const endpoint = params?.q ? "/products/search" : "/products";
    const response = await dummyjsonApi.get(endpoint, { params });
    return response.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await dummyjsonApi.get(`/products/${id}`);
    return response.data;
  },
};

export const usersApi = {
  getAll: async (params?: {
    limit?: number;
    skip?: number;
    q?: string;
  }): Promise<UsersResponse> => {
    const endpoint = params?.q ? "/users/search" : "/users";
    const response = await dummyjsonApi.get(endpoint, { params });
    return response.data;
  },
  getById: async (id: number): Promise<User> => {
    const response = await dummyjsonApi.get(`/users/${id}`);
    return response.data;
  },
};
