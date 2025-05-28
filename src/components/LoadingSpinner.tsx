
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-64">
      <div className="relative">
        {/* Spinner simples e otimizado */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        
        {/* Texto */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600">
            Carregando...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
