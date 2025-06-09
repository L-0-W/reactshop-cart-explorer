
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { TrendingUp, Crown } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const MostPurchasedSection = () => {
  const [mostPurchased, setMostPurchased] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMostPurchased = async () => {
      try {
        const products = await fetchProducts();
        // Sortear por rating e número de avaliações para simular "mais comprados"
        const sorted = products
          .sort((a, b) => (b.rating.rate * b.rating.count) - (a.rating.rate * a.rating.count))
          .slice(0, 8); // Top 8 produtos
        setMostPurchased(sorted);
      } catch (error) {
        console.error('Error loading most purchased:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMostPurchased();
  }, []);

  if (loading) {
    return (
      <div className="mb-6 xs:mb-8 sm:mb-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
      <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 lg:p-8 border border-orange-200/30">
        {/* Header da Seção */}
        <div className="text-center mb-4 xs:mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
            <Crown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-500 animate-bounce" />
            <TrendingUp className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-500 animate-pulse" />
            <Crown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-500 animate-bounce" />
          </div>
          
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-1.5 xs:mb-2 sm:mb-3">
            🔥 Itens Mais Comprados 🔥
          </h2>
          
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto px-2">
            ⭐ Os produtos favoritos dos nossos clientes! ⭐
          </p>
          
          <div className="flex items-center justify-center mt-2 xs:mt-3 sm:mt-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium animate-pulse">
              🚀 Tendência em alta!
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative px-2 xs:px-4 sm:px-8 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1 xs:-ml-2 sm:-ml-4">
              {mostPurchased.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-1 xs:pl-2 sm:pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                >
                  <div className="relative">
                    {/* Badge de destaque */}
                    <div className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full shadow-lg animate-pulse">
                      🏆 TOP
                    </div>
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden sm:flex -left-2 xs:-left-4 lg:-left-8 bg-white/90 hover:bg-white border-orange-200 hover:border-orange-300 text-orange-600 hover:text-orange-700" />
            <CarouselNext className="hidden sm:flex -right-2 xs:-right-4 lg:-right-8 bg-white/90 hover:bg-white border-orange-200 hover:border-orange-300 text-orange-600 hover:text-orange-700" />
          </Carousel>
        </div>

        {/* Indicadores móveis */}
        <div className="flex sm:hidden justify-center mt-3 xs:mt-4 space-x-2">
          <div className="text-xs text-gray-600 bg-white/60 px-2 xs:px-3 py-1 rounded-full">
            👈 Deslize para ver mais 👉
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostPurchasedSection;
