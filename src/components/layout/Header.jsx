import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Search, User, LogOut, Menu, X, Zap } from 'lucide-react';

export const Header = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { navigateTo, activePage, setIsSearchOpen, setIsAccountOpen } = useStore();
  const { user, isAuthenticated, logout, openLogin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItemsCount);
  const [badgeBounce, setBadgeBounce] = useState(false);

  useEffect(() => {
    if (totalItemsCount > prevCount) {
      setBadgeBounce(true);
      const t = setTimeout(() => setBadgeBounce(false), 500);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItemsCount);
  }, [totalItemsCount, prevCount]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage]);

  const handleMobileNav = (page, category) => {
    setIsMobileMenuOpen(false);
    navigateTo(page, category);
  };

  const navLinks = [
    { label: 'Bats', action: () => navigateTo('shop', 'bats') },
    { label: 'Protection', action: () => navigateTo('shop', 'protection') },
    { label: 'Leather', action: () => navigateTo('shop', 'leather') },
    { label: 'Clothing', action: () => navigateTo('shop', 'clothing') },
    { label: 'Custom Lab', action: () => navigateTo('customizer'), highlight: true },
  ];

  return (
    <>
      <header
        id="site-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-carbon/95 backdrop-blur-xl border-b border-[var(--carbon-line)] h-[60px]'
            : 'bg-carbon/80 backdrop-blur-lg border-b border-[var(--carbon-line)] h-[80px]'
        }`}
      >
        <div className="grid grid-cols-3 items-center h-full px-5 lg:px-10 max-w-[1700px] mx-auto">
          {/* LEFT: Nav / Hamburger */}
          <div className="flex items-center gap-6">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-bone hover:text-willow transition-colors bg-transparent border-none p-0 flex items-center gap-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
              <span className="font-mono text-[9px] uppercase tracking-widest text-bone/60">
                {isMobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className={`cursor-hover relative text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-200 bg-transparent border-none p-0 group ${
                    link.highlight
                      ? 'text-willow hover:text-bone'
                      : 'text-bone/70 hover:text-bone'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    link.highlight ? 'bg-willow w-full' : 'bg-willow w-0 group-hover:w-full'
                  }`} />
                  {link.highlight && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5 text-willow" />
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* CENTER: Logo */}
          <div className="flex justify-center">
            <button
              onClick={() => navigateTo('home')}
              className="cursor-hover flex items-start gap-0.5 bg-transparent border-none p-0 group"
              aria-label="PITCH - Home"
            >
              <span className={`font-display font-black tracking-tighter text-bone group-hover:text-bone transition-all duration-300 ${
                isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
              }`}>
                PITCH
              </span>
              <span className="font-mono text-[8px] font-normal tracking-widest text-willow mt-0.5">™</span>
            </button>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex justify-end items-center gap-4 md:gap-6">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsAccountOpen(true)}
                  aria-label="My Account"
                  className="cursor-hover flex items-center gap-1.5 text-bone/70 hover:text-bone transition-colors bg-transparent border-none p-0 group"
                >
                  <User className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] hidden lg:block group-hover:text-willow transition-colors">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="cursor-hover text-bone/30 hover:text-willow transition-colors bg-transparent border-none p-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                aria-label="Sign In"
                className="cursor-hover hidden sm:flex items-center gap-1.5 text-bone/70 hover:text-bone transition-colors bg-transparent border-none p-0 group"
              >
                <User className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] hidden lg:block group-hover:text-willow transition-colors">Sign In</span>
              </button>
            )}

            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="cursor-hover flex items-center gap-1.5 text-bone/70 hover:text-bone transition-colors bg-transparent border-none p-0 group"
            >
              <Search className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] hidden lg:block group-hover:text-willow transition-colors">Search</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart — ${totalItemsCount} items`}
              className="cursor-hover flex items-center gap-2 group bg-transparent border-none p-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-bone/70 group-hover:text-bone transition-colors" />
                {totalItemsCount > 0 && (
                  <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-willow text-bone text-[8px] font-mono font-bold flex items-center justify-center ${badgeBounce ? 'badge-bounce' : ''}`}>
                    {totalItemsCount > 9 ? '9+' : totalItemsCount}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 group-hover:text-bone transition-colors hidden lg:block">
                Bag
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-carbon mobile-nav-overlay overflow-y-auto">
          <div className="pt-20 px-6 pb-12 flex flex-col min-h-full">
            {/* Menu Items */}
            <div className="flex-1 space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/30 mb-6">Navigation</p>
              {[
                { label: 'Shop All Gear', action: () => handleMobileNav('shop') },
                { label: 'Bats', action: () => handleMobileNav('shop', 'bats') },
                { label: 'Protection & Guards', action: () => handleMobileNav('shop', 'protection') },
                { label: 'Match Leather Balls', action: () => handleMobileNav('shop', 'leather') },
                { label: 'Clothing', action: () => handleMobileNav('shop', 'clothing') },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="block w-full text-left py-4 border-b border-white/[0.06] text-xl font-display font-bold uppercase tracking-tight text-bone hover:text-willow transition-colors bg-transparent border-x-0 border-t-0"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/30 mb-4 mt-4">Explore</p>
                {[
                  { label: '⚡ Custom Bat Builder', action: () => handleMobileNav('customizer'), highlight: true },
                  { label: 'Lab Journal', action: () => handleMobileNav('journal') },
                  { label: 'About Pitch', action: () => handleMobileNav('about') },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`block w-full text-left py-3.5 border-b border-white/[0.06] text-base font-mono uppercase tracking-wider transition-colors bg-transparent border-x-0 border-t-0 ${
                      item.highlight ? 'text-willow font-bold' : 'text-bone/70 hover:text-willow'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-white/[0.06] flex justify-between items-center">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsAccountOpen(true); }}
                className="font-mono text-[10px] uppercase tracking-widest text-willow font-bold bg-transparent border-none p-0"
              >
                Account / Login
              </button>
              <span className="font-mono text-[9px] text-bone/30 uppercase tracking-widest">PITCH™ Lab</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
