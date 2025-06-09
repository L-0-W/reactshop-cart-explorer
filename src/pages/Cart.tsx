
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'electronics': return 'Eletrônicos';
      case 'jewelery': return 'Joias';
      case "men's clothing": return 'Roupas Masculinas';
      case "women's clothing": return 'Roupas Femininas';
      default: return category;
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCategoryChange={() => {}} selectedCategory="all" />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-6">
              Adicione alguns produtos incríveis ao seu carrinho!
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Continuar comprando
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCategoryChange={() => {}} selectedCategory="all" />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continuar comprando
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Carrinho de Compras ({items.length} {items.length === 1 ? 'item' : 'itens'})
            </h1>

            {items.map(item => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-20 h-20 object-contain bg-gray-50 rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {getCategoryName(item.product.category)}
                      </p>
                      <p className="text-lg font-bold text-blue-600 mt-2">
                        R$ {(item.product.price * 5.5).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="truncate pr-2">
                        {item.product.title} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        R$ {(item.product.price * item.quantity * 5.5).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      R$ {(getCartTotal() * 5.5).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Finalizar Compra
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
