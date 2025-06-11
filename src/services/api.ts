
import axios from 'axios';
import { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

const cache = new Map();

export const fetchProducts = async (): Promise<Product[]> => {
  const cacheKey = 'all-products';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await api.get('/products');
  cache.set(cacheKey, response.data);
  return response.data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const cacheKey = `product-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await api.get(`/products/${id}`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const fetchProductCharacteristics = async (id: number): Promise<Product> => {
  const cacheKey = `characteristics-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await api.get(`/products/${id}`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const cacheKey = 'categories';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await api.get('/products/categories');
  cache.set(cacheKey, response.data);
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const cacheKey = `category-${category}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await api.get(`/products/category/${category}`);
  cache.set(cacheKey, response.data);
  return response.data;
};
