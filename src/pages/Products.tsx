
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = searchParams.get('categoria') || 'all';
  const sortBy = searchParams.get('ordenar') || 'default';

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
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newSearchParams.delete('categoria');
    } else {
      newSearchParams.set('categoria', category);
    }
    if (sortBy !== 'default') {
      newSearchParams.set('ordenar', sortBy);
    }
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (sort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedCategory !== 'all') {
      newSearchParams.set('categoria', selectedCategory);
    }
    if (sort === 'default') {
      newSearchParams.delete('ordenar');
    } else {
      newSearchParams.set('ordenar', sort);
    }
    setSearchParams(newSearchParams);
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
      
      <main className="container mx-auto px-4 xs:px-6 sm:px-8 py-4 xs:py-6 sm:py-8">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <div className="p-4 xs:p-6 sm:p-8">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-purple-600" />
            </div>
            
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🌟 Bem-vindo à ReactShop! 🌟
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Descubra produtos incríveis com os melhores preços! ✨
              {selectedCategory !== 'all' && (
                <span className="block mt-2 text-base xs:text-lg sm:text-xl font-semibold text-purple-600">
                  📂 Categoria: {getCategoryDisplayName(selectedCategory)}
                </span>
              )}
            </p>
          </div>
        </div>

        {selectedCategory === 'all' && <MostPurchasedSection />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 xs:mb-8 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 xs:px-6 py-2 shadow-md border border-white/40">
                <span className="text-sm xs:text-base font-medium text-gray-700">
                  🎯 {productCount} produto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-white/40 shadow-md">
                <Select onValueChange={handleSortChange} value={sortBy}>
                  <SelectTrigger className="w-48 xs:w-56 sm:w-64 bg-transparent border-none text-sm">
                    <SelectValue placeholder="🔄 Ordenar por" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20">
                    <SelectItem value="default" className="hover:bg-purple-50">
                      📋 Ordem padrão
                    </SelectItem>
                    <SelectItem value="price-asc" className="hover:bg-purple-50">
                      💰⬆️ Preço: menor para maior
                    </SelectItem>
                    <SelectItem value="price-desc" className="hover:bg-purple-50">
                      💰⬇️ Preço: maior para menor
                    </SelectItem>
                    <SelectItem value="name-asc" className="hover:bg-purple-50">
                      🔤⬆️ Nome: A a Z
                    </SelectItem>
                    <SelectItem value="name-desc" className="hover:bg-purple-50">
                      🔤⬇️ Nome: Z a A
                    </SelectItem>
                    <SelectItem value="category" className="hover:bg-purple-50">
                      📁 Categoria
                    </SelectItem>
                    <SelectItem value="rating" className="hover:bg-purple-50">
                      ⭐ Melhor avaliação
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedCategory === 'all' && (
              <div className="text-center mb-6 xs:mb-8">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  📦 Todos os Produtos 📦
                </h2>
                <p className="text-sm xs:text-base text-gray-600 mt-2">
                  Explore nossa coleção completa
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 xs:gap-6 lg:gap-8 place-items-center">
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
