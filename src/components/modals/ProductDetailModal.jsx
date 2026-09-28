import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { X, ShieldCheck, Check, Star, Wrench } from 'lucide-react';

export const ProductDetailModal = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState('2lb 8.5oz');
  const [knockInService, setKnockInService] = useState(true);
  const [oilingService, setOilingService] = useState(true);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      weight: selectedWeight,
      knockIn: knockInService,
      oiling: oilingService,
      quantity: 1,
    });
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-carbon/90 backdrop-blur-md"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-4xl bg-carbonRaised border border-[var(--carbon-line)] text-bone rounded-lg overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 text-bone/50 hover:text-willow transition-colors p-2 bg-carbon/80 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="p-8 bg-carbon flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[var(--carbon-line)]">
          {quickViewProduct.badge && (
            <span className="absolute top-6 left-6 font-mono text-[9px] uppercase tracking-widest bg-willow text-bone px-3 py-1 rounded-full">
              {quickViewProduct.badge}
            </span>
          )}

          <div className="w-full aspect-square relative flex items-center justify-center p-6">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="mt-4 font-mono text-[10px] text-bone/50 uppercase tracking-widest text-center">
            PITCH LAB VERIFIED ITEM #{quickViewProduct.id}
          </div>
        </div>

        {/* Product Details Column */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-willow uppercase tracking-wider font-bold">
                {quickViewProduct.brand}
              </span>
              <div className="flex items-center gap-1 font-mono text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{quickViewProduct.rating} ({quickViewProduct.reviews} reviews)</span>
              </div>
            </div>

            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-bone mt-2">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-mono text-2xl font-extrabold text-bone">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="font-mono text-xs text-bone/40 line-through">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-bone/60 font-light leading-relaxed mt-4">
              {quickViewProduct.description}
            </p>

            {/* Spec breakdown */}
            <div className="mt-6 space-y-3 font-mono text-xs border-t border-bone/10 pt-4">
              <span className="text-[10px] text-willow font-bold uppercase tracking-widest">
                Lab Calibration Options
              </span>

              {quickViewProduct.category === 'bats' && (
                <>
                  <div>
                    <label className="block text-[10px] text-bone/60 uppercase mb-1">
                      Calibrated Weight Selection
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['2lb 7.5oz', '2lb 8.5oz', '2lb 9.5oz'].map((wt) => (
                        <button
                          key={wt}
                          type="button"
                          onClick={() => setSelectedWeight(wt)}
                          className={`py-1.5 px-2 rounded border text-[10px] transition-colors ${
                            selectedWeight === wt
                              ? 'border-willow bg-willow/20 text-bone font-bold'
                              : 'border-bone/20 text-bone/60 hover:border-bone/40'
                          }`}
                        >
                          {wt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-center justify-between text-[11px] p-2.5 rounded bg-carbon border border-bone/10 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-willow" />
                        <span>Lab Machine Knock-in (10k strikes)</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={knockInService}
                        onChange={(e) => setKnockInService(e.target.checked)}
                        className="accent-willow"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Add button */}
          <div className="mt-8 pt-4 border-t border-bone/10 flex gap-4">
            <button
              onClick={handleAdd}
              data-cursor-text="ADD BAG"
              className="cursor-hover flex-1 py-4 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Add To Lab Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
