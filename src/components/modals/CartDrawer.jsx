import React from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotalPrice } = useCart();
  const { setIsCheckoutOpen } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-carbon/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-carbonRaised border-l border-[var(--carbon-line)] text-bone flex flex-col h-full z-10 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--carbon-line)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-willow animate-pulse" />
            <h2 className="font-display font-bold text-sm uppercase tracking-wider">
              Lab Equipment Bag
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            data-cursor-text="CLOSE"
            className="cursor-hover text-bone/60 hover:text-willow transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-bone/40 py-16">
              <div className="w-16 h-16 rounded-full border border-bone/10 flex items-center justify-center mb-4">
                <span className="font-mono text-2xl text-willow">0</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest mb-2">
                Your Lab Bag is Empty
              </p>
              <p className="text-xs text-bone/50 max-w-xs font-light">
                Explore our signature series or build a custom blade in the lab.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemKey}
                className="flex gap-4 p-4 rounded bg-carbon border border-[var(--carbon-line)] relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded bg-carbonRaised p-2 border border-bone/5"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] text-willow uppercase tracking-wider">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-bone/30 hover:text-willow transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-display text-xs font-bold uppercase tracking-wide text-bone mt-0.5">
                      {item.product.name}
                    </h4>

                    {item.options && (
                      <div className="mt-1 space-y-0.5 text-[9px] font-mono text-bone/50">
                        {item.options.weight && <div>Weight: {item.options.weight}</div>}
                        {item.options.knockIn && <div className="text-willow">+ Lab Knock-in Service (₹800)</div>}
                        {item.options.engraving && (
                          <div>Engraving: "{item.options.engravingText}"</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-bone/5">
                    <div className="flex items-center space-x-2 bg-carbonRaised rounded px-2 py-1 border border-bone/10">
                      <button
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        className="text-bone/60 hover:text-willow"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs px-1 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        className="text-bone/60 hover:text-willow"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-mono text-xs font-bold text-bone">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Math & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--carbon-line)] bg-carbon/50 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-bone/70">
              <span>Calibration Guarantee</span>
              <span className="text-willow flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
                Subtotal
              </span>
              <span className="font-display font-extrabold text-lg text-bone">
                ₹{subtotalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[10px] font-mono text-bone/40 leading-relaxed">
              Shipping & taxes calculated at checkout. Express dispatch within 24 hours.
            </p>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              data-cursor-text="CHECKOUT"
              className="cursor-hover w-full py-4 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
