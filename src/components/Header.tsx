
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, Sparkles } from 'lucide-react';
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

const Header = ({ onCategoryChange, selectedCategory }: HeaderProps) => {
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

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 animate-gradient"></div>
      
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-2xl font-bold hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="relative">
              <Store className="w-8 h-8 animate-float" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
            <span className="gradient-text bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              ReactShop
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="glass-effect rounded-lg p-1">
              <Select onValueChange={onCategoryChange} value={selectedCategory}>
                <SelectTrigger className="w-52 bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                  <SelectValue placeholder="✨ Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20">
                  <SelectItem value="all" className="hover:bg-purple-50">
                    🌟 Todas as categorias
                  </SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="hover:bg-purple-50">
                      {category === 'electronics' && '🔌'} 
                      {category === 'jewelery' && '💎'} 
                      {category === "men's clothing" && '👔'} 
                      {category === "women's clothing" && '👗'} 
                      {' '}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Link to="/carrinho" className="group">
              <Button 
                variant="ghost" 
                className="relative text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 animate-bounce-in glass-effect"
              >
                <ShoppingCart className="w-6 h-6 group-hover:animate-wiggle" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white animate-pulse shadow-lg">
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
};

export default Header;
