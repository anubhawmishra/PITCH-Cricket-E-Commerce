import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProductState] = useState(null);

  // Parse URL hash to state
  const syncStateFromHash = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (!hash || hash === 'home') {
      setActivePage('home');
      setSelectedCategory('all');
      setQuickViewProductState(null);
    } else if (hash.startsWith('shop')) {
      setActivePage('shop');
      const parts = hash.split('/');
      if (parts[1]) {
        setSelectedCategory(parts[1]);
      } else {
        setSelectedCategory('all');
      }
      setQuickViewProductState(null);
    } else if (hash === 'customizer') {
      setActivePage('customizer');
      setQuickViewProductState(null);
    } else if (hash === 'journal') {
      setActivePage('journal');
      setQuickViewProductState(null);
    } else if (hash === 'about') {
      setActivePage('about');
      setQuickViewProductState(null);
    } else if (hash === 'track-order') {
      setActivePage('track-order');
      setQuickViewProductState(null);
    } else if (hash === 'shipping-returns') {
      setActivePage('shipping-returns');
      setQuickViewProductState(null);
    } else if (hash === 'contact') {
      setActivePage('contact');
      setQuickViewProductState(null);
    } else if (hash === 'faq') {
      setActivePage('faq');
      setQuickViewProductState(null);
    } else if (hash === 'account') {
      setIsAccountOpen(true);
    }
  };

  useEffect(() => {
    // Initial sync
    syncStateFromHash();

    // Listen for browser Back/Forward navigation
    const handlePopState = () => {
      syncStateFromHash();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (page, category = 'all') => {
    setActivePage(page);
    setSelectedCategory(category);

    let newHash = '#/';
    if (page !== 'home') {
      if (page === 'shop' && category && category !== 'all') {
        newHash = `#/shop/${category}`;
      } else {
        newHash = `#/${page}`;
      }
    }

    if (window.location.hash !== newHash) {
      window.history.pushState({ page, category }, '', newHash);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setQuickViewProduct = (product) => {
    setQuickViewProductState(product);
    if (product) {
      const productHash = `#/product/${product.id}`;
      if (window.location.hash !== productHash) {
        window.history.pushState({ product: product.id }, '', productHash);
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
