import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCart } from './CartContext';

const ComparisonContext = createContext();

const MAX_COMPARE = 4;

export const ComparisonProvider = ({ children }) => {
  const { showToast } = useCart();
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = useCallback((product) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) {
        showToast('Already in comparison');
        return prev;
      }
      if (prev.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} products`);
        return prev;
      }
      showToast(`${product.name} added to compare`);
      return [...prev, product];
    });
  }, [showToast]);

  const removeFromCompare = useCallback((productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    setIsCompareOpen(false);
  }, []);

  const isInCompare = useCallback((productId) => {
    return compareList.some(p => p.id === productId);
  }, [compareList]);

  return (
    <ComparisonContext.Provider value={{
      compareList,
      isCompareOpen,
      setIsCompareOpen,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      compareCount: compareList.length,
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
