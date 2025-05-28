
import React, { useEffect, useState } from 'react';
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
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-200 transition-colors">
            <Store className="w-8 h-8" />
            <span>ReactShop</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Select onValueChange={onCategoryChange} value={selectedCategory}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link to="/carrinho">
              <Button variant="ghost" className="relative text-white hover:bg-white/10">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
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
