import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('pitch_willow_cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('pitch_willow_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, options = {}) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${JSON.stringify(options)}`;
      const existingIndex = prevCart.findIndex((item) => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += options.quantity || 1;
        return updated;
      } else {
        const extraCost = (options.knockIn ? 800 : 0) + (options.oiling ? 300 : 0) + (options.engraving ? 500 : 0);
        return [
          ...prevCart,
          {
            itemKey,
            id: product.id,
            product,
            options,
            quantity: options.quantity || 1,
            unitPrice: product.price + extraCost,
          },
        ];
      }
    });

    showToast(`Added ${product.name} to Lab Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotalPrice = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotalPrice,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
