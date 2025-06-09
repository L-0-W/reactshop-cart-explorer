
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

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'electronics': return 'Eletrônicos';
      case 'jewelery': return 'Joias';
      case "men's clothing": return 'Roupas Masculinas';
      case "women's clothing": return 'Roupas Femininas';
      default: return category;
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm border border-gray-200 h-full flex flex-col w-full max-w-xs mx-auto">
      <Link to={`/produto/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative overflow-hidden bg-white aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-2 xs:p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] xs:text-xs px-1.5 py-0.5">
            {getCategoryIcon(product.category)} 
            <span className="hidden sm:inline ml-1">{getCategoryName(product.category)}</span>
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-3 h-3 xs:w-4 xs:h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-3 xs:p-4 bg-white flex-1 flex flex-col">
          <h3 className="font-bold text-sm xs:text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors flex-1 leading-tight">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 xs:w-4 xs:h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600">
              R$ {(product.price * 5.5).toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-3 xs:p-4 pt-0 bg-white flex flex-col xs:flex-row gap-2">
        <Link to={`/produto/${product.id}`} className="w-full xs:flex-1">
          <Button 
            variant="outline" 
            className="w-full border-purple-200 hover:bg-purple-50 transition-colors text-xs xs:text-sm"
            size="sm"
          >
            <span className="hidden sm:inline">👀 Ver detalhes</span>
            <span className="sm:hidden">👀 Detalhes</span>
          </Button>
        </Link>
        
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full xs:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors text-xs xs:text-sm ${
            isAdding ? 'opacity-75' : ''
          }`}
          size="sm"
        >
          {isAdding ? (
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Adicionando...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5" />
              <span className="hidden sm:inline">Adicionar</span>
              <span className="sm:hidden">+</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
