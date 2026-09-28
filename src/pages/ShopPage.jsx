import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useComparison } from '../context/ComparisonContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { SlidersHorizontal, ArrowUpDown, ArrowRight, Grid3X3, List, BarChart3, Heart } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const ShopPage = () => {
  const { selectedCategory, setSelectedCategory, setQuickViewProduct } = useStore();
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useComparison();

  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [view, setView] = useState('grid'); // 'grid' | 'list'
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = (catId) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(catId);
      setIsAnimating(false);
    }, 150);
  };

  let filtered = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const brands = ['all', ...new Set(PRODUCTS.map((p) => p.brand))];

  const savings = (p) => p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-carbon relative page-enter">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <div className="bg-carbonRaised border-b border-[var(--carbon-line)] py-14 px-6 lg:px-12 noise-dark">
          <div className="max-w-[1700px] mx-auto">
            <div className="flex items-center gap-3 mb-3 font-mono text-[9px] text-willow uppercase tracking-[0.35em]">
              <span className="w-1.5 h-1.5 rounded-full bg-willow animate-pulse" />
              Full Equipment Catalog
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-bone tracking-tight mb-3">
              Cricket Gear Index
            </h1>
            <p className="text-sm font-light text-bone/50 max-w-xl leading-relaxed">
              Top-grade English Willow bats, match leather balls, protective gear, kit bags and match clothing — all lab-certified.
            </p>
          </div>
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 pt-8">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 pb-6 border-b border-[var(--carbon-line)]">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`cursor-hover px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-200 border ${
                    selectedCategory === cat.id
                      ? 'bg-willow text-bone border-willow font-bold shadow-lg shadow-willow/15'
                      : 'border-bone/10 text-bone/55 hover:border-bone/30 hover:text-bone'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
              {/* Brand Filter */}
              <div className="flex items-center gap-2 bg-carbonRaised border border-bone/10 rounded px-3 py-2 text-xs font-mono text-bone/70">
                <SlidersHorizontal className="w-3.5 h-3.5 text-willow flex-shrink-0" />
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs text-bone cursor-pointer uppercase font-mono min-w-0"
                  aria-label="Filter by brand"
                >
                  <option value="all" className="bg-carbon">All Brands</option>
                  {brands.filter((b) => b !== 'all').map((brand) => (
                    <option key={brand} value={brand} className="bg-carbon">{brand}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-carbonRaised border border-bone/10 rounded px-3 py-2 text-xs font-mono text-bone/70">
                <ArrowUpDown className="w-3.5 h-3.5 text-willow flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs text-bone cursor-pointer uppercase font-mono min-w-0"
                  aria-label="Sort products"
                >
                  <option value="featured" className="bg-carbon">Featured</option>
                  <option value="price-low" className="bg-carbon">Price: Low to High</option>
                  <option value="price-high" className="bg-carbon">Price: High to Low</option>
                  <option value="rating" className="bg-carbon">Highest Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-carbonRaised border border-bone/10 rounded p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-willow text-bone' : 'text-bone/40 hover:text-bone'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-willow text-bone' : 'text-bone/40 hover:text-bone'}`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Count */}
              <span className="font-mono text-[10px] text-bone/30 uppercase tracking-wider">
                {filtered.length} item{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`pt-8 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-display text-2xl font-bold uppercase text-bone/20 mb-2">No Results</p>
                <p className="font-mono text-xs text-bone/30 uppercase tracking-wider">Try adjusting your filters</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); }}
                  className="mt-6 font-mono text-[10px] uppercase tracking-wider text-willow border border-willow/30 px-4 py-2 rounded hover:bg-willow/10 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={() => setQuickViewProduct(product)}
                    onAdd={() => addToCart(product)}
                    onCompare={() => addToCompare(product)}
                    isComparing={isInCompare(product.id)}
                    savings={savings(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((product) => (
                  <ProductListRow
                    key={product.id}
                    product={product}
                    onView={() => setQuickViewProduct(product)}
                    onAdd={() => addToCart(product)}
                    onCompare={() => addToCompare(product)}
                    isComparing={isInCompare(product.id)}
                    savings={savings(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ─── Product Card (Grid) ─── */
const ProductCard = ({ product, onView, onAdd, onCompare, isComparing, savings }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="tilt-card group relative flex flex-col bg-carbonRaised border border-[var(--carbon-line)] rounded-sm hover:border-willow/40 transition-all duration-300 card-glow overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
        {product.badge && (
          <span className="font-mono text-[8px] uppercase tracking-widest bg-willow text-bone px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {savings > 0 && (
          <span className="font-mono text-[8px] uppercase tracking-widest bg-green-500/90 text-bone px-2.5 py-1 rounded-full">
            -{savings}% Off
          </span>
        )}
      </div>

      {/* Compare button (top right) */}
      <button
        onClick={(e) => { e.stopPropagation(); onCompare(); }}
        title={isComparing ? 'In comparison' : 'Add to compare'}
        className={`absolute top-3 right-3 z-20 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
          isComparing
            ? 'bg-willow border-willow text-bone'
            : 'bg-carbon/80 border-bone/20 text-bone/40 hover:border-willow hover:text-willow opacity-0 group-hover:opacity-100'
        }`}
      >
        <BarChart3 className="w-3 h-3" />
      </button>

      {/* Image */}
      <div
        onClick={onView}
        className="tilt-inner relative aspect-[4/5] flex items-center justify-center bg-carbon/40 cursor-pointer overflow-hidden"
      >
        <img
          alt={product.name}
          className="tilt-pop object-contain w-full h-full willow-grade p-6 group-hover:scale-105 transition-transform duration-700"
          src={product.image}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/30 transition-colors duration-300 flex items-center justify-center">
          <div className={`font-mono text-[9px] uppercase tracking-widest text-bone bg-carbon/80 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            Quick View <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        {/* Spec bar */}
        <div className="absolute inset-x-0 bottom-0 bg-carbon/95 text-bone font-mono text-[8px] px-3 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
          <span>{product.grade || 'Lab Spec'}</span>
          <span>{product.pickup || 'Pro'}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 mt-auto border-t border-[var(--carbon-line)] flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-mono text-willow uppercase tracking-[0.2em] mb-1">{product.brand}</p>
            <h3
              onClick={onView}
              className="text-sm font-bold font-display uppercase tracking-wide cursor-pointer hover:text-willow transition-colors leading-tight"
            >
              {product.name}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 mt-1">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`text-[8px] ${star <= Math.floor(product.rating) ? 'text-amber-400' : 'text-bone/20'}`}>★</span>
                  ))}
                </div>
                <span className="font-mono text-[8px] text-bone/40">({product.reviews})</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-mono font-bold text-bone">₹{product.price.toLocaleString('en-IN')}</p>
            {product.originalPrice && (
              <p className="text-[9px] font-mono text-bone/30 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="cursor-hover w-full py-2.5 bg-willow text-bone hover:bg-red-700 text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 border-none rounded-sm shadow-sm"
        >
          + Add To Bag
        </button>
      </div>
    </div>
  );
};

/* ─── Product List Row ─── */
const ProductListRow = ({ product, onView, onAdd, savings }) => (
  <div className="group flex gap-5 p-5 bg-carbonRaised border border-[var(--carbon-line)] rounded-sm hover:border-willow/40 transition-all duration-300">
    <div
      className="w-24 h-24 flex-shrink-0 bg-carbon/40 rounded flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={onView}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain p-2 willow-grade group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[8px] font-mono text-willow uppercase tracking-[0.2em]">{product.brand}</p>
          {product.badge && (
            <span className="font-mono text-[7px] uppercase tracking-widest bg-willow/10 text-willow border border-willow/20 px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <h3
          onClick={onView}
          className="font-display text-sm font-bold uppercase tracking-wide cursor-pointer hover:text-willow transition-colors mb-1"
        >
          {product.name}
        </h3>
        <p className="text-xs text-bone/40 font-light line-clamp-2">{product.description}</p>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
        <div className="text-right">
          <p className="font-mono text-base font-bold">₹{product.price.toLocaleString('en-IN')}</p>
          {product.originalPrice && (
            <p className="font-mono text-[9px] text-bone/30 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="cursor-hover px-5 py-2.5 bg-willow text-bone hover:bg-red-700 text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-colors border-none rounded-sm whitespace-nowrap"
        >
          + Add To Bag
        </button>
      </div>
    </div>
  </div>
);
