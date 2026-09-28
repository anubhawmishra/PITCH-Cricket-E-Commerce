import React from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useStore();

  const featured = PRODUCTS.slice(0, 4);

  return (
    <section id="products" className="border-b border-black/10 bg-bone text-carbon">
      <div className="reveal p-6 lg:p-12 border-b border-black/10 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">
          Signature Series
        </h2>
        <p className="text-sm font-light text-carbon/60 max-w-md">
          The equipment our own lab would take onto the ground. Nothing here skips calibration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
        {featured.map((product) => (
          <div
            key={product.id}
            className="tilt-card group relative flex flex-col p-6 hover:bg-[#f8f8f8] transition-colors duration-300"
          >
            {product.badge && (
              <div className="absolute top-6 left-6 z-10 font-mono text-[9px] uppercase tracking-widest bg-seam text-bone px-2 py-1 rounded-full">
                {product.badge}
              </div>
            )}

            <div
              onClick={() => setQuickViewProduct(product)}
              className="tilt-inner relative aspect-[4/5] flex items-center justify-center mb-6 cursor-hover"
            >
              <img
                alt={product.name}
                className="tilt-pop object-contain w-full h-full drop-shadow-2xl"
                src={product.image}
              />
              <div className="absolute inset-x-0 bottom-0 bg-carbon/95 text-bone font-mono text-[9px] px-3 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
                <span>Grade: {product.grade ? product.grade.replace('Grade ', '') : '1'}</span>
                <span>{product.pickup ? `Pickup: ${product.pickup}` : product.fit ? `Fit: ${product.fit}` : product.guard ? `Guard: ${product.guard}` : `Shell: ${product.shell}`}</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="cursor-hover absolute top-2 right-2 w-11 h-11 bg-carbon text-bone rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-willow hover:text-bone z-20 shadow-lg border-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="mt-auto border-t border-black/10 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] font-mono text-carbon/50 uppercase tracking-[0.2em] mb-1">
                    {product.brand}
                  </p>
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-sm font-bold font-display uppercase tracking-wide cursor-hover hover:text-willow transition-colors"
                  >
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm font-mono font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
