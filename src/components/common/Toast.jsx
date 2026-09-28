import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-carbonRaised border border-willow text-bone px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 font-mono text-xs animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-willow flex-shrink-0" />
      <span>{toastMessage}</span>
      <button
        onClick={() => setToastMessage(null)}
        className="ml-2 text-bone/50 hover:text-bone text-sm"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
