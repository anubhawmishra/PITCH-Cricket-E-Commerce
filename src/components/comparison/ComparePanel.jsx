import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { useCart } from '../../context/CartContext';
import { X, Plus, Star, ShoppingBag, BarChart3, ChevronUp } from 'lucide-react';

const COMPARE_FIELDS = [
  { key: 'brand', label: 'Brand' },
  { key: 'category', label: 'Category' },
  { key: 'rating', label: 'Rating', render: (v) => v ? `${v}/5 ★` : '—' },
  { key: 'reviewCount', label: 'Reviews', render: (v) => v ? `${v} reviews` : '—' },
  { key: 'price', label: 'Price', render: (v) => v ? `₹${v.toLocaleString('en-IN')}` : '—' },
  { key: 'originalPrice', label: 'Original Price', render: (v) => v ? `₹${v.toLocaleString('en-IN')}` : '—' },
  { key: 'badge', label: 'Badge' },
  // Spec fields (from specs object)
  { key: 'specs.willow', label: 'Willow Grade', specKey: 'willow' },
  { key: 'specs.grains', label: 'Grains', specKey: 'grains' },
  { key: 'specs.weight', label: 'Weight', specKey: 'weight' },
  { key: 'specs.edge', label: 'Edge Thickness', specKey: 'edge' },
  { key: 'specs.spine', label: 'Spine Profile', specKey: 'spine' },
  { key: 'specs.sweetSpot', label: 'Sweet Spot', specKey: 'sweetSpot' },
  { key: 'specs.handle', label: 'Handle Type', specKey: 'handle' },
  { key: 'specs.knockIn', label: 'Knock-In', specKey: 'knockIn' },
  { key: 'specs.material', label: 'Material', specKey: 'material' },
  { key: 'specs.seam', label: 'Seam', specKey: 'seam' },
  { key: 'specs.playerLevel', label: 'Player Level', specKey: 'playerLevel' },
];

export const ComparePanel = () => {
  const { compareList, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useComparison();
  const { addToCart } = useCart();

  if (compareList.length === 0) return null;

  const getFieldValue = (product, field) => {
    if (field.specKey) {
      const val = product.specs?.[field.specKey];
      return val || null;
    }
    const val = product[field.key];
    return field.render ? field.render(val) : (val || null);
  };

  // Only show rows where at least one product has a value
  const activeFields = COMPARE_FIELDS.filter(field =>
    compareList.some(p => getFieldValue(p, field))
  );

  return (
    <>
      {/* Sticky bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9980] bg-carbon/95 backdrop-blur-xl border-t border-bone/10 transition-all duration-300 ${
          isCompareOpen ? 'translate-y-0' : 'translate-y-0'
        }`}
        style={{ maxHeight: isCompareOpen ? '85vh' : '72px', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(.16,1,.3,1)' }}
      >
        {/* Bar */}
        <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-b border-bone/[0.07]">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-4 h-4 text-willow" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone">
              Comparing <span className="text-willow font-bold">{compareList.length}</span> products
            </p>
            <div className="hidden sm:flex gap-2">
              {compareList.map(p => (
                <span key={p.id} className="font-mono text-[9px] text-bone/50 bg-carbonMid border border-bone/10 px-2 py-0.5 rounded">
                  {p.name?.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(o => !o)}
              className="cursor-hover flex items-center gap-1.5 px-3 py-1.5 bg-willow text-bone font-mono text-[9px] uppercase tracking-wider rounded border-none hover:bg-red-700 transition-colors"
            >
              {isCompareOpen ? 'Close' : 'View Comparison'}
              <ChevronUp className={`w-3 h-3 transition-transform ${isCompareOpen ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={clearCompare}
              className="p-1.5 text-bone/40 hover:text-willow transition-colors bg-transparent border-none"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full comparison table */}
        {isCompareOpen && (
          <div className="overflow-auto" style={{ maxHeight: 'calc(85vh - 56px)' }}>
            <div className="min-w-[600px]">
              {/* Product header row */}
              <div
                className="grid border-b border-bone/[0.07] bg-carbonMid sticky top-0 z-10"
                style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
              >
                <div className="px-4 py-3 font-mono text-[9px] text-bone/40 uppercase tracking-wider">Specification</div>
                {compareList.map(product => (
                  <div key={product.id} className="px-4 py-3 border-l border-bone/[0.07]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[8px] text-willow uppercase tracking-wider truncate">{product.brand}</p>
                        <p className="font-display text-xs font-bold text-bone leading-tight line-clamp-2">{product.name}</p>
                      </div>
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="ml-2 text-bone/30 hover:text-willow transition-colors bg-transparent border-none p-0 flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <img
                      src={typeof product.image === 'string' ? product.image : product.images?.[0]}
                      alt={product.name}
                      className="w-16 h-16 object-contain mx-auto my-2 willow-grade"
                    />
                    <button
                      onClick={() => addToCart(product)}
                      className="cursor-hover w-full py-2 bg-willow text-bone font-mono text-[8px] uppercase tracking-wider rounded border-none hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add to Bag
                    </button>
                  </div>
                ))}
              </div>

              {/* Data rows */}
              {activeFields.map((field, i) => (
                <div
                  key={field.key}
                  className={`grid border-b border-bone/[0.05] ${i % 2 === 0 ? 'bg-carbon' : 'bg-carbonMid/40'}`}
                  style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
                >
                  <div className="px-4 py-3 font-mono text-[9px] text-bone/40 uppercase tracking-wider flex items-center">
                    {field.label}
                  </div>
                  {compareList.map(product => {
                    const val = getFieldValue(product, field);
                    // Find best value for price (lowest = green), rating (highest = green)
                    let highlight = false;
                    if (field.key === 'price' && val) {
                      const prices = compareList.map(p => p.price).filter(Boolean);
                      highlight = product.price === Math.min(...prices);
                    }
                    if (field.key === 'rating' && val) {
                      const ratings = compareList.map(p => p.rating).filter(Boolean);
                      highlight = product.rating === Math.max(...ratings);
                    }
                    return (
                      <div key={product.id} className="px-4 py-3 border-l border-bone/[0.05]">
                        <span className={`font-mono text-xs ${
                          val ? (highlight ? 'text-green-400 font-bold' : 'text-bone/80') : 'text-bone/20'
                        }`}>
                          {val || '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer to prevent content being hidden behind bar */}
      <div className="h-[72px]" />
    </>
  );
};
