
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    // Simula um delay para mostrar a animação
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 600);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'electronics': return '🔌';
      case 'jewelery': return '💎';
      case "men's clothing": return '👔';
      case "women's clothing": return '👗';
      default: return '✨';
    }
  };

  return (
    <Card className="group overflow-hidden card-hover shine-effect glass-effect border-white/20 backdrop-blur-sm animate-slide-in-up">
      <Link to={`/produto/${product.id}`}>
        <div className="relative overflow-hidden bg-gradient-to-br from-white/50 to-gray-50/50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge da categoria com emoji */}
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-bounce-in">
            {getCategoryIcon(product.category)} {product.category}
          </Badge>
          
          {/* Botão de favorito */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current animate-pulse' : ''}`} />
          </Button>
          
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        
        <CardContent className="p-6 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:gradient-text transition-all duration-300">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < Math.floor(product.rating.rate)
                      ? 'fill-yellow-400 text-yellow-400 animate-pulse'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-6 pt-0 space-x-3 bg-gradient-to-br from-white/80 to-gray-50/80">
        <Link to={`/produto/${product.id}`} className="flex-1">
          <Button 
            variant="outline" 
            className="w-full border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 transform hover:scale-105"
          >
            👀 Ver detalhes
          </Button>
        </Link>
        
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 ${
            isAdding ? 'animate-pulse scale-95' : ''
          }`}
        >
          {isAdding ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adicionando...</span>
            </div>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
