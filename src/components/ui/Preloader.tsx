// src/components/ui/Preloader.tsx
import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Preloader;
