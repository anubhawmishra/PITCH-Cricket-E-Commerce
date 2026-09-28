import React, { useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';

export const Hero = () => {
  const { navigateTo } = useStore();
  const heroRef = useRef(null);
  const hero3dRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (!fine) return;

    const hero = heroRef.current;
    const hero3d = hero3dRef.current;
    if (!hero || !hero3d) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      hero3d.style.transform = `rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`;
    };

    const handleMouseLeave = () => {
      hero3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-purpose="hero"
      className="hero-scene relative border-b border-[var(--carbon-line)] min-h-[92vh] flex items-center overflow-hidden noise-dark"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon to-carbonRaised" />

      {/* ambient seam ball, 3D */}
      <div className="ball-scene absolute -right-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-70 hidden lg:block pointer-events-none">
        <div className="ball" />
      </div>

      <div
        ref={hero3dRef}
        id="hero3d"
        className="hero-3d relative z-10 w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        <div className="lg:col-span-7">
          <div className="reveal flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-seam animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-willow">
              Lab Status: Grade&nbsp;A+&nbsp;Willow In Stock
            </span>
          </div>

          <h1 className="reveal reveal-delay-1 text-6xl sm:text-7xl xl:text-[7.5rem] font-display font-extrabold leading-[0.88] tracking-tight uppercase text-bone">
            Built<br />For The<br /><span className="text-willow">Middle.</span>
          </h1>

          <p className="reveal reveal-delay-2 text-base md:text-lg text-bone/60 font-light max-w-md mt-10 leading-relaxed">
            Every blade we sell has been pressed, scanned and pickup-calibrated before it ever reaches a crease. This isn't sporting goods retail — it's an equipment lab.
          </p>

          <div className="reveal reveal-delay-3 mt-12 flex items-center gap-5">
            <button
              onClick={() => navigateTo('shop', 'bats')}
              className="magnetic cursor-hover inline-flex items-center justify-center px-9 py-4 border border-bone/25 text-bone rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:border-willow hover:text-willow transition-colors bg-transparent"
            >
              Shop Signature
            </button>
            <button
              onClick={() => navigateTo('customizer')}
              className="magnetic cursor-hover inline-flex items-center justify-center px-9 py-4 bg-willow text-bone rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-colors shadow-lg shadow-willow/20"
            >
              Custom Bat Builder
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="reveal reveal-delay-2 relative aspect-[3/4] flex items-center justify-center">
            <img
              alt="Premium cricket bat"
              className="willow-grade group relative z-10 object-contain w-full h-full drop-shadow-2xl"
              src="https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>
      </div>

      <div className="reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone/40">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-willow to-transparent" />
      </div>
    </section>
  );
};
