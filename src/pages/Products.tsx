
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import { Sparkles, ShoppingBag, TrendingUp } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-blue-200/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative glass-effect rounded-3xl p-12 border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <ShoppingBag className="w-16 h-16 text-purple-600 animate-float" />
                <Sparkles className="w-6 h-6 absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
                <TrendingUp className="w-6 h-6 absolute -bottom-2 -left-2 text-green-500 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold gradient-text mb-6 animate-bounce-in">
              🌟 Bem-vindo à ReactShop! 🌟
            </h1>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Descubra produtos incríveis com os melhores preços em nossa loja virtual! ✨
              {selectedCategory !== 'all' && (
                <span className="block mt-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
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
            <div className="flex items-center justify-center mb-8">
              <div className="glass-effect rounded-full px-6 py-3 border border-white/20 animate-bounce-in">
                <span className="text-lg font-semibold text-gray-700">
                  🎯 {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {/* Grid de produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
