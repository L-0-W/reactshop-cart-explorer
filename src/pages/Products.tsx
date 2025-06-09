
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import MostPurchasedSection from '../components/MostPurchasedSection';
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

  const productCount = useMemo(() => products.length, [products.length]);

  const getCategoryDisplayName = (category: string) => {
    switch(category) {
      case 'electronics': return 'Eletrônicos';
      case 'jewelery': return 'Joias';
      case "men's clothing": return 'Roupas Masculinas';
      case "women's clothing": return 'Roupas Femininas';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Hero Section responsivo */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-white/40">
            <div className="flex justify-center mb-3 sm:mb-4">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              🌟 Bem-vindo à ReactShop! 🌟
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto px-2">
              Descubra produtos incríveis com os melhores preços! ✨
              {selectedCategory !== 'all' && (
                <span className="block mt-2 text-base sm:text-lg lg:text-xl font-semibold text-purple-600">
                  📂 Categoria: {getCategoryDisplayName(selectedCategory)}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Seção de Itens Mais Comprados */}
        {selectedCategory === 'all' && <MostPurchasedSection />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Contador de produtos responsivo */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 shadow-md border border-white/40">
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  🎯 {productCount} produto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {/* Título da seção de todos os produtos */}
            {selectedCategory === 'all' && (
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  📦 Todos os Produtos 📦
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Explore nossa coleção completa
                </p>
              </div>
            )}
            
            {/* Grid responsivo otimizado */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
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
