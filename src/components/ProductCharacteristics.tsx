
import React from 'react';
import { Product } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Package, Tag, Award } from 'lucide-react';

interface ProductCharacteristicsProps {
  product: Product;
}

const ProductCharacteristics = ({ product }: ProductCharacteristicsProps) => {
  const getCharacteristics = (product: Product) => {
    const characteristics = [];
    
    characteristics.push({
      icon: <Package className="w-5 h-5" />,
      label: 'ID do Produto',
      value: `#${product.id.toString().padStart(4, '0')}`
    });
    
    characteristics.push({
      icon: <Tag className="w-5 h-5" />,
      label: 'Categoria',
      value: getCategoryName(product.category)
    });
    
    characteristics.push({
      icon: <Star className="w-5 h-5" />,
      label: 'Avaliação',
      value: `${product.rating.rate}/5 (${product.rating.count} avaliações)`
    });
    
    characteristics.push({
      icon: <Award className="w-5 h-5" />,
      label: 'Qualidade',
      value: getQualityLevel(product.rating.rate)
    });
    
    if (product.category === 'electronics') {
      characteristics.push({
        icon: <Package className="w-5 h-5" />,
        label: 'Tipo',
        value: 'Produto Eletrônico'
      });
    }
    
    if (product.category === 'jewelery') {
      characteristics.push({
        icon: <Package className="w-5 h-5" />,
        label: 'Material',
        value: 'Joia Premium'
      });
    }
    
    if (product.category.includes('clothing')) {
      characteristics.push({
        icon: <Package className="w-5 h-5" />,
        label: 'Tipo',
        value: 'Vestuário'
      });
    }
    
    return characteristics;
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
  
  const getQualityLevel = (rating: number) => {
    if (rating >= 4.5) return 'Excelente';
    if (rating >= 4.0) return 'Muito Bom';
    if (rating >= 3.5) return 'Bom';
    if (rating >= 3.0) return 'Regular';
    return 'Básico';
  };
  
  const getQualityColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800';
    if (rating >= 4.0) return 'bg-blue-100 text-blue-800';
    if (rating >= 3.5) return 'bg-yellow-100 text-yellow-800';
    if (rating >= 3.0) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-6 h-6 text-purple-600" />
          <span>Características do Produto</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getCharacteristics(product).map((characteristic, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-purple-600">
                {characteristic.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{characteristic.label}</p>
                <p className="text-base font-semibold text-gray-900">{characteristic.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status de Qualidade:</span>
            <Badge className={getQualityColor(product.rating.rate)}>
              {getQualityLevel(product.rating.rate)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCharacteristics;
