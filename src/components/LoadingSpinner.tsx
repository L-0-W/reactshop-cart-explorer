
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-64">
      <div className="relative">
        {/* Spinner principal com gradiente colorido */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1">
          <div className="bg-white rounded-full h-full w-full"></div>
        </div>
        
        {/* Efeitos adicionais */}
        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-purple-400 opacity-20"></div>
        <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-30"></div>
        
        {/* Texto animado */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium gradient-text animate-pulse">
            Carregando...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
