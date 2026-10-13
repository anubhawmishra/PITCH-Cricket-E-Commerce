import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useStore();
  const { showToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to Pitch Lab Notes!');
    setEmail('');
  };

  return (
    <footer className="bg-carbon text-bone pt-20 border-t border-[var(--carbon-line)]">
      {/* Main Grid */}
      <div className="px-6 lg:px-12 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand + Newsletter */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <p className="font-display text-4xl font-black tracking-tighter text-bone mb-2">PITCH<span className="text-willow text-xl">™</span></p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                Next-Gen Cricket Performance Lab
              </p>
            </div>
            <p className="text-sm text-bone/50 font-light mb-8 max-w-sm leading-relaxed">
              Grade 1+ English Willow bats, match leather, and custom-built gear — curated for players who demand precision.
            </p>

            {/* Newsletter */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-willow mb-4">
                Lab Notes — Stay Updated
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-0 max-w-sm">
                <input
                  className="flex-1 bg-carbonRaised border border-bone/10 border-r-0 px-4 py-3 text-xs font-sans text-bone placeholder-bone/30 focus:outline-none focus:border-willow transition-colors"
                  placeholder="your@email.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
                <button
                  className="cursor-hover px-5 py-3 bg-willow text-bone font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors whitespace-nowrap border border-willow"
                  type="submit"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-bone/40 mb-6">Explore</p>
            <ul className="space-y-4">
              {[
                { label: 'New Arrivals', action: () => navigateTo('shop') },
                { label: 'Bats', action: () => navigateTo('shop', 'bats') },
                { label: 'Protection', action: () => navigateTo('shop', 'protection') },
                { label: 'Custom Bat Lab', action: () => navigateTo('customizer') },
                { label: 'Brand Heritage', action: () => navigateTo('about') },
                { label: 'Lab Journal', action: () => navigateTo('journal') },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="cursor-hover text-xs text-bone/60 hover:text-willow transition-colors text-left bg-transparent border-none p-0 link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-bone/40 mb-6">Support</p>
            <ul className="space-y-4">
              {[
                { label: 'Track Order', action: () => navigateTo('track-order') },
                { label: 'Shipping & Delivery', action: () => navigateTo('shipping-returns') },
                { label: 'Returns Policy', action: () => navigateTo('shipping-returns') },
                { label: 'Grievance Redressal', action: () => navigateTo('grievance-redressal') },
                { label: 'Contact Us', action: () => navigateTo('contact') },
                { label: 'FAQ', action: () => navigateTo('faq') },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="cursor-hover text-xs text-bone/60 hover:text-willow transition-colors text-left bg-transparent border-none p-0 link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-bone/40 mb-6">Get In Touch</p>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <p className="text-bone/30 text-[9px] uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:support@pitchcricket.com" className="text-bone/70 hover:text-willow transition-colors flex items-center gap-1">
                  support@pitchcricket.com
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div>
                <p className="text-bone/30 text-[9px] uppercase tracking-widest mb-1">Hours</p>
                <p className="text-bone/60">Mon–Sat: 9AM–8PM IST</p>
              </div>
              <div>
                <p className="text-bone/30 text-[9px] uppercase tracking-widest mb-1">Workshop</p>
                <p className="text-bone/60">Mumbai, India &amp; Norfolk, UK</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large PITCH watermark */}
      <div className="w-full overflow-hidden flex justify-center py-4">
        <h2 className="text-[16vw] leading-none font-display font-black tracking-tighter text-white/[0.04] select-none pointer-events-none">
          PITCH
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--carbon-line)] px-6 lg:px-12 py-5 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-bone/30">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <p>© 2026 PITCH CRICKET. All Rights Reserved.</p>
            <span className="text-bone/15">|</span>
            <p>Designed &amp; Developed by <span className="text-bone/50 hover:text-willow transition-colors">Anubhaw Mishra</span></p>
            <span className="text-bone/15">|</span>
            <span className="text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Demo Sandbox Environment</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-bone/80 transition-colors bg-transparent border-none p-0 cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-bone/80 transition-colors bg-transparent border-none p-0 cursor-pointer">
              Terms &amp; Conditions
            </button>
            <button onClick={() => navigateTo('grievance-redressal')} className="hover:text-bone/80 transition-colors bg-transparent border-none p-0 cursor-pointer">
              Grievance Redressal
            </button>
            <button onClick={() => navigateTo('shipping-returns')} className="hover:text-bone/80 transition-colors bg-transparent border-none p-0 cursor-pointer">
              Shipping &amp; Returns
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
