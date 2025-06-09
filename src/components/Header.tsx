
import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { fetchCategories } from '../services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const Header = memo(({ onCategoryChange, selectedCategory }: HeaderProps) => {
  const { getCartItemsCount } = useCart();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const cartItemsCount = getCartItemsCount();

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
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl font-bold hover:text-yellow-300 transition-colors duration-200"
          >
            <Store className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              ReactShop
            </span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <Select onValueChange={onCategoryChange} value={selectedCategory}>
                <SelectTrigger className="w-32 sm:w-40 lg:w-52 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors text-xs sm:text-sm">
                  <SelectValue placeholder="✨ Filtrar">
                    <span className="hidden sm:inline">✨ Filtrar por categoria</span>
                    <span className="sm:hidden">✨ Filtrar</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20">
                  <SelectItem value="all" className="hover:bg-purple-50">
                    🌟 <span className="hidden sm:inline">Todas as categorias</span><span className="sm:hidden">Todas</span>
                  </SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="hover:bg-purple-50">
                      {category === 'electronics' && '🔌'} 
                      {category === 'jewelery' && '💎'} 
                      {category === "men's clothing" && '👔'} 
                      {category === "women's clothing" && '👗'} 
                      {' '}
                      <span className="hidden sm:inline">
                        {getCategoryName(category)}
                      </span>
                      <span className="sm:hidden">
                        {getCategoryName(category).slice(0, 8)}...
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Link to="/carrinho">
              <Button 
                variant="ghost" 
                className="relative text-white hover:bg-white/20 transition-colors bg-white/10 backdrop-blur-sm p-2 sm:p-3"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
