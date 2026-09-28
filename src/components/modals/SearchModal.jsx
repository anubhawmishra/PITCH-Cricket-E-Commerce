import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowUpRight } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, setQuickViewProduct } = useStore();
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.brand.toLowerCase().includes(query.toLowerCase()) ||
    item.categoryName.toLowerCase().includes(query.toLowerCase()) ||
    (item.grade && item.grade.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-carbon/95 backdrop-blur-xl flex flex-col p-6 lg:p-12 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center pb-8 border-b border-[var(--carbon-line)] max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 text-willow font-mono text-xs uppercase tracking-widest">
          <Search className="w-4 h-4" /> Lab Index Search
        </div>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="text-bone/60 hover:text-willow transition-colors p-2 font-mono text-xs uppercase tracking-widest flex items-center gap-1"
        >
          <span>Close</span> <X className="w-4 h-4" />
        </button>
      </div>

      {/* Input */}
      <div className="max-w-4xl mx-auto w-full pt-10 pb-6">
        <div className="relative border-b border-willow pb-4">
          <input
            autoFocus
            type="text"
            placeholder="TYPE TO SEARCH LAB EQUIPMENT (E.G., BATS, GLOVES, SHREY, GRADE 1)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xl sm:text-3xl font-display uppercase font-bold text-bone placeholder-bone/20 focus:outline-none focus:ring-0 tracking-tight"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-bone/40 hover:text-willow text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <span className="font-mono text-[10px] text-bone/40 uppercase tracking-widest mr-2">
            Trending Searches:
          </span>
          {['Grade 1 Willow', 'Batting Gloves', 'Shrey Helmet', 'Kookaburra Pads', 'Match Ball'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-bone/15 text-bone/70 hover:border-willow hover:text-willow transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      <div className="max-w-6xl mx-auto w-full flex-1 py-8">
        <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-6">
          {filteredProducts.length} Equipment Entries Found
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              className="group cursor-pointer p-4 bg-carbonRaised border border-[var(--carbon-line)] rounded hover:border-willow transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-square relative flex items-center justify-center p-4 bg-carbon rounded mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full willow-grade group-hover:filter-none transition-all duration-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-willow uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-bone/30 group-hover:text-willow transition-colors" />
                </div>
                <h4 className="font-display text-xs font-bold uppercase text-bone tracking-wide mt-1">
                  {product.name}
                </h4>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-bone/10 font-mono text-xs">
                  <span className="text-bone/50">{product.grade || product.categoryName}</span>
                  <span className="font-bold text-bone">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
