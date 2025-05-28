
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import { ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        let productsData: Product[];
        
        if (selectedCategory === 'all') {
          productsData = await fetchProducts();
        } else {
          productsData = await fetchProductsByCategory(selectedCategory);
        }
        
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Memoizar o contador para evitar re-renders desnecessários
  const productCount = useMemo(() => products.length, [products.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section simplificado */}
        <div className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-purple-600" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🌟 Bem-vindo à ReactShop! 🌟
            </h1>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Descubra produtos incríveis com os melhores preços! ✨
              {selectedCategory !== 'all' && (
                <span className="block mt-2 text-xl font-semibold text-purple-600">
                  📂 Categoria: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
              )}
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Contador de produtos */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-md border border-white/40">
                <span className="text-base font-medium text-gray-700">
                  🎯 {productCount} produto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {/* Grid de produtos otimizado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
