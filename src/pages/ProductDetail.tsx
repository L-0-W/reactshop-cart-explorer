
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { fetchProduct } from '../services/api';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await fetchProduct(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'electronics': return 'Eletrônicos';
      case 'jewelery': return 'Joias';
      case "men's clothing": return 'Roupas Masculinas';
      case "women's clothing": return 'Roupas Femininas';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header onCategoryChange={() => {}} selectedCategory="all" />
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header onCategoryChange={() => {}} selectedCategory="all" />
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-6 xs:py-8 text-center">
          <h1 className="text-xl xs:text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h1>
          <Link to="/">
            <Button>Voltar à loja</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header onCategoryChange={() => {}} selectedCategory="all" />
      
      <main className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 xs:mb-6 text-sm xs:text-base">
          <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
          Voltar à loja
        </Link>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 p-3 xs:p-4 sm:p-6 lg:p-8">
              <div className="space-y-3 xs:space-y-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full max-w-sm xs:max-w-md mx-auto object-contain bg-gray-50 rounded-lg"
                />
              </div>

              <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                <div>
                  <Badge className="mb-2 xs:mb-3 bg-blue-100 text-blue-800 text-xs xs:text-sm">
                    {getCategoryName(product.category)}
                  </Badge>
                  <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-3 xs:mb-4">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center space-x-1.5 xs:space-x-2 mb-3 xs:mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 xs:w-5 xs:h-5 ${
                            i < Math.floor(product.rating.rate)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs xs:text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count} avaliações)
                    </span>
                  </div>

                  <p className="text-2xl xs:text-3xl sm:text-4xl font-bold text-blue-600 mb-4 xs:mb-6">
                    R$ {(product.price * 5.5).toFixed(2)}
                  </p>
                </div>

                <div>
                  <h3 className="text-base xs:text-lg font-semibold mb-2 xs:mb-3">Descrição</h3>
                  <p className="text-sm xs:text-base text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex space-x-2 xs:space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm xs:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 xs:w-5 xs:h-5 mr-1.5 xs:mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetail;
