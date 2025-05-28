
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    // Reduzido o delay para melhor responsividade
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 300);
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
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm border border-gray-200">
      <Link to={`/produto/${product.id}`}>
        <div className="relative overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            {getCategoryIcon(product.category)} {product.category}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-6 bg-white">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-6 pt-0 space-x-3 bg-white">
        <Link to={`/produto/${product.id}`} className="flex-1">
          <Button 
            variant="outline" 
            className="w-full border-purple-200 hover:bg-purple-50 transition-colors"
          >
            👀 Ver detalhes
          </Button>
        </Link>
        
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors ${
            isAdding ? 'opacity-75' : ''
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
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
