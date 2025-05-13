import React, { useState, useEffect } from 'react';
import { MousePointer, Move, RotateCcw } from 'lucide-react';

const NavigationInstructions = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem('hasSeenNavigationInstructions');
    if (hasSeenInstructions) {
      setIsVisible(false);
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('hasSeenNavigationInstructions', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg z-50 w-[400px] transition-all duration-300">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      
      <h3 className="text-lg font-semibold mb-4 text-center">Hướng dẫn điều hướng 3D</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MousePointer className="w-6 h-6 text-blue-500" />
          <p>Click chuột trái + kéo để xoay mô hình</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Move className="w-6 h-6 text-green-500" />
          <p>Click chuột phải + kéo để di chuyển</p>
        </div>
        
        <div className="flex items-center gap-3">
          <RotateCcw className="w-6 h-6 text-purple-500" />
          <p>Cuộn chuột để phóng to/thu nhỏ</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Click vào tên tòa nhà để di chuyển đến vị trí tương ứng
      </div>
    </div>
  );
};

export default NavigationInstructions;