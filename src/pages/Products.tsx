
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

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
    <div className="min-h-screen bg-gray-50">
      <Header onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo à ReactShop
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra produtos incríveis com os melhores preços. 
            {selectedCategory !== 'all' && (
              <span className="block mt-2 text-blue-600 font-semibold">
                Categoria: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </span>
            )}
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-6">
              {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
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
