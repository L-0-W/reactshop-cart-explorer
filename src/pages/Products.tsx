
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import MostPurchasedSection from '../components/MostPurchasedSection';
import { ShoppingBag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const sortedProducts = useMemo(() => {
    if (sortBy === 'default') return products;
    
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [products, sortBy]);

  const productCount = useMemo(() => sortedProducts.length, [sortedProducts.length]);

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
      
      <main className="container mx-auto px-2 xs:px-3 sm:px-4 lg:px-6 py-3 xs:py-4 sm:py-6 lg:py-8">
        {/* Hero Section responsivo sem fundo branco */}
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 lg:mb-12">
          <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
            <div className="flex justify-center mb-2 xs:mb-3 sm:mb-4">
              <ShoppingBag className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
            </div>
            
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 xs:mb-3 sm:mb-4">
              🌟 Bem-vindo à ReactShop! 🌟
            </h1>
            
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto px-1 xs:px-2">
              Descubra produtos incríveis com os melhores preços! ✨
              {selectedCategory !== 'all' && (
                <span className="block mt-1 xs:mt-2 text-sm xs:text-base sm:text-lg lg:text-xl font-semibold text-purple-600">
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
            {/* Contador de produtos e ordenação responsivos */}
            <div className="flex flex-col xs:flex-row items-center justify-between mb-4 xs:mb-6 sm:mb-8 gap-3 xs:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 shadow-md border border-white/40">
                <span className="text-xs xs:text-sm sm:text-base font-medium text-gray-700">
                  🎯 {productCount} produto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Seletor de ordenação */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-white/40 shadow-md">
                <Select onValueChange={handleSortChange} value={sortBy}>
                  <SelectTrigger className="w-32 xs:w-40 sm:w-48 lg:w-56 bg-transparent border-none text-xs sm:text-sm">
                    <SelectValue placeholder="🔄 Ordenar por">
                      <span className="hidden sm:inline">🔄 Ordenar por</span>
                      <span className="sm:hidden">🔄 Ordenar</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20">
                    <SelectItem value="default" className="hover:bg-purple-50">
                      📋 <span className="hidden sm:inline">Ordem padrão</span><span className="sm:hidden">Padrão</span>
                    </SelectItem>
                    <SelectItem value="price-asc" className="hover:bg-purple-50">
                      💰⬆️ <span className="hidden sm:inline">Preço: menor para maior</span><span className="sm:hidden">Menor preço</span>
                    </SelectItem>
                    <SelectItem value="price-desc" className="hover:bg-purple-50">
                      💰⬇️ <span className="hidden sm:inline">Preço: maior para menor</span><span className="sm:hidden">Maior preço</span>
                    </SelectItem>
                    <SelectItem value="name-asc" className="hover:bg-purple-50">
                      🔤⬆️ <span className="hidden sm:inline">Nome: A a Z</span><span className="sm:hidden">A-Z</span>
                    </SelectItem>
                    <SelectItem value="name-desc" className="hover:bg-purple-50">
                      🔤⬇️ <span className="hidden sm:inline">Nome: Z a A</span><span className="sm:hidden">Z-A</span>
                    </SelectItem>
                    <SelectItem value="category" className="hover:bg-purple-50">
                      📁 <span className="hidden sm:inline">Categoria</span><span className="sm:hidden">Categoria</span>
                    </SelectItem>
                    <SelectItem value="rating" className="hover:bg-purple-50">
                      ⭐ <span className="hidden sm:inline">Melhor avaliação</span><span className="sm:hidden">Avaliação</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Título da seção de todos os produtos */}
            {selectedCategory === 'all' && (
              <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  📦 Todos os Produtos 📦
                </h2>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 mt-1 xs:mt-2">
                  Explore nossa coleção completa
                </p>
              </div>
            )}
            
            {/* Grid responsivo otimizado para todos os tamanhos */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
              {sortedProducts.map((product) => (
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
