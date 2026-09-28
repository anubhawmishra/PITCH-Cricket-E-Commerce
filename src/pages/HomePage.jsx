import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import realBallImg from '../assets/cricket_ball_real.jpg';
import batSsTonImg from '../assets/bat_ss_ton.jpg';
import ballKookaburraTurfImg from '../assets/ball_kookaburra_turf.jpg';
import padsDscProImg from '../assets/pads_dsc_pro.jpg';
import poloDscMatchImg from '../assets/polo_dsc_match.jpg';
import { ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react';

export const HomePage = () => {
  const { addToCart } = useCart();
  const { navigateTo, setQuickViewProduct } = useStore();

  const heroRef = useRef(null);
  const hero3dRef = useRef(null);

  const ssProduct = PRODUCTS.find((p) => p.id === 'bat-ss-player-edition') || PRODUCTS[0];
  const kookaburraBallProduct = PRODUCTS.find((p) => p.id === 'ball-kookaburra-super-test-red') || PRODUCTS[1];
  const padsProduct = PRODUCTS.find((p) => p.id === 'pads-dsc-pro-white') || PRODUCTS[2];
  const bagProduct = PRODUCTS.find((p) => p.id === 'bag-dsc-gold-wheelie') || PRODUCTS[3];

  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;

    // ---- Reveal on scroll ----
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));

    let cardCleanupList = [];
    let magneticCleanupList = [];

    if (fine) {
      // ---- Hero parallax tilt ----
      const hero = heroRef.current;
      const hero3d = hero3dRef.current;
      let handleHeroMouseMove, handleHeroMouseLeave;
      if (hero && hero3d) {
        handleHeroMouseMove = (e) => {
          const rect = hero.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          hero3d.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 4}deg)`;
        };
        handleHeroMouseLeave = () => {
          hero3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
        };
        hero.addEventListener('mousemove', handleHeroMouseMove);
        hero.addEventListener('mouseleave', handleHeroMouseLeave);
      }

      // ---- Tilt cards ----
      document.querySelectorAll('.tilt-card').forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.02)`;
        };
        const handleMouseLeave = () => {
          card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
        };
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        cardCleanupList.push({ card, handleMouseMove, handleMouseLeave });
      });

      // ---- Magnetic buttons ----
      document.querySelectorAll('.magnetic').forEach((btn) => {
        const handleMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const px = e.clientX - rect.left - rect.width / 2;
          const py = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${px * 0.22}px, ${py * 0.3}px)`;
        };
        const handleMouseLeave = () => {
          btn.style.transform = 'translate(0,0)';
        };
        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        magneticCleanupList.push({ btn, handleMouseMove, handleMouseLeave });
      });

      return () => {
        io.disconnect();
        cardCleanupList.forEach(({ card, handleMouseMove, handleMouseLeave }) => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
        if (hero && hero3d) {
          hero.removeEventListener('mousemove', handleHeroMouseMove);
          hero.removeEventListener('mouseleave', handleHeroMouseLeave);
        }
        magneticCleanupList.forEach(({ btn, handleMouseMove, handleMouseLeave }) => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }

    return () => io.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-carbon font-sans page-enter">
      <Header />

      <main className="flex-grow">
        {/* ═══════════════ HERO ═══════════════ */}
        <section
          ref={heroRef}
          className="hero-scene relative min-h-[94vh] flex items-center overflow-hidden border-b border-[var(--carbon-line)]"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-carbon via-carbon to-[#0a0202]" />
          <div className="absolute inset-0 blueprint-grid-light opacity-100" />
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-willow/[0.04] to-transparent pointer-events-none" />
          
          {/* Mobile ball BG */}
          <div
            onClick={() => setQuickViewProduct(kookaburraBallProduct)}
            className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] z-0 cursor-pointer"
          >
            <div className="absolute -inset-8 rounded-full bg-willow/10 blur-3xl pointer-events-none" />
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(230,0,0,0.3)] opacity-50">
              <img src={realBallImg} alt="Cricket ball" className="w-full h-full object-cover rounded-full animate-spin-3d" />
            </div>
          </div>

          {/* 3D scene */}
          <div
            ref={hero3dRef}
            className="hero-3d relative z-10 w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-[1700px] mx-auto py-24 lg:py-0"
          >
            {/* Left: Text */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="reveal reveal-delay-1 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-willow bg-willow/10 border border-willow/20 px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-willow animate-pulse" />
                Next-Gen Cricket Performance Lab
              </div>

              <h1 className="reveal text-5xl sm:text-6xl xl:text-[5.5rem] 2xl:text-[7rem] font-display font-black leading-[0.9] tracking-tight uppercase text-bone mb-4">
                Built For<br />
                <span className="text-willow">The Game.</span>
              </h1>
              <h2 className="reveal reveal-delay-1 text-5xl sm:text-6xl xl:text-[5.5rem] 2xl:text-[7rem] font-display font-black leading-[0.9] tracking-tight uppercase text-bone/40 mb-8">
                Made For You.
              </h2>

              <p className="reveal reveal-delay-2 text-sm sm:text-base text-bone/55 font-light max-w-md leading-relaxed mb-10">
                Grade 1+ English Willow bats, match leather balls and custom-built precision equipment — engineered for players who refuse to compromise.
              </p>

              <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigateTo('shop', 'bats')}
                  className="magnetic cursor-hover group inline-flex items-center justify-center gap-2 px-8 py-4 bg-willow text-bone rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg shadow-willow/20"
                >
                  Shop Equipment
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo('customizer')}
                  className="magnetic cursor-hover inline-flex items-center justify-center gap-2 px-8 py-4 border border-bone/20 text-bone rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:border-willow hover:text-willow transition-all bg-transparent"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Custom Bat Builder
                </button>
              </div>

              {/* Stats */}
              <div className="reveal reveal-delay-4 flex items-center gap-8 mt-12 pt-8 border-t border-bone/[0.08]">
                {[
                  { value: 'Grade 1+', label: 'Willow Quality' },
                  { value: '48h', label: 'Express Dispatch' },
                  { value: '30-Day', label: 'Returns' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-lg font-bold text-bone">{stat.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-bone/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D Ball showcase */}
            <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 items-center justify-center relative">
              <div className="reveal reveal-delay-2 relative w-[440px] xl:w-[560px] 2xl:w-[640px] aspect-square">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border border-willow/15 animate-spin-slow pointer-events-none" />
                <div className="absolute -inset-12 rounded-full border border-dashed border-bone/[0.06] animate-spin-slow-reverse pointer-events-none" />
                <div className="absolute -inset-24 rounded-full border border-willow/[0.06] pointer-events-none" />

                {/* Red glow */}
                <div className="absolute inset-0 rounded-full bg-willow/10 blur-3xl" />

                {/* Ball */}
                <button
                  onClick={() => setQuickViewProduct(kookaburraBallProduct)}
                  className="tilt-card group relative w-full h-full rounded-full overflow-hidden shadow-[0_0_100px_rgba(230,0,0,0.3)] border border-willow/30 hover:border-willow/60 transition-all duration-700 cursor-hover"
                  aria-label="View Kookaburra match ball"
                >
                  <img
                    src={realBallImg}
                    alt="Photorealistic Red Cricket Match Ball"
                    className="w-full h-full object-cover rounded-full animate-spin-3d group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-carbon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-bone/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-carbon/70 px-4 py-2 rounded-full">
                    View Product
                  </div>
                </button>

                {/* Product label */}
                <div className="absolute -right-4 top-1/4 glass rounded-lg px-4 py-3 space-y-1">
                  <p className="font-mono text-[9px] text-willow uppercase tracking-widest">Kookaburra</p>
                  <p className="font-display text-xs font-bold text-bone">Super Test Red</p>
                  <p className="font-mono text-[10px] text-bone font-bold">₹2,999</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone/30 pointer-events-none z-10">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-willow/60 to-transparent" />
          </div>
        </section>

        {/* ═══════════════ MARQUEE ═══════════════ */}
        <div className="overflow-hidden bg-willow text-bone py-3 flex items-center border-y border-willow/80">
          <div className="animate-marquee whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
            <span>GRADE 1+ ENGLISH WILLOW &nbsp;✦&nbsp; HAND-FINISHED POWER EDGES &nbsp;✦&nbsp; MATCH-SPEC LEATHER BALLS &nbsp;✦&nbsp; WORLDWIDE EXPRESS DISPATCH &nbsp;✦&nbsp; CUSTOM LASER ENGRAVING &nbsp;✦&nbsp; 30-DAY RETURNS &nbsp;✦&nbsp; PRE-KNOCKED & READY TO PLAY &nbsp;✦&nbsp; </span>
            <span>GRADE 1+ ENGLISH WILLOW &nbsp;✦&nbsp; HAND-FINISHED POWER EDGES &nbsp;✦&nbsp; MATCH-SPEC LEATHER BALLS &nbsp;✦&nbsp; WORLDWIDE EXPRESS DISPATCH &nbsp;✦&nbsp; CUSTOM LASER ENGRAVING &nbsp;✦&nbsp; 30-DAY RETURNS &nbsp;✦&nbsp; PRE-KNOCKED & READY TO PLAY &nbsp;✦&nbsp; </span>
          </div>
        </div>

        {/* ═══════════════ SPEC SHEET ═══════════════ */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black/[0.08] bg-bone text-carbon blueprint-grid">
          {[
            {
              tag: 'Wood Quality',
              headline: 'Grade 1+',
              desc: 'Hand-selected English Willow with 12–16 straight grains for maximum power transfer and long bat life.',
              delay: '',
            },
            {
              tag: 'Pickup & Balance',
              headline: 'Balanced',
              desc: 'Weight perfectly distributed for a lightweight feel in hands — enabling faster swing speed on match day.',
              delay: 'reveal-delay-1',
            },
            {
              tag: 'Sweet Spot',
              headline: 'Maximized',
              desc: 'Deep-pressed profile creates a large, explosive sweet spot engineered for consistent boundary-hitting.',
              delay: 'reveal-delay-2',
            },
          ].map((item, i) => (
            <div
              key={item.tag}
              className={`reveal ${item.delay} p-10 md:p-14 border-b md:border-b-0 ${i < 2 ? 'md:border-r' : ''} border-black/[0.08] flex flex-col justify-between min-h-[280px]`}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-seam">{item.tag}</span>
              <div>
                <p className="font-display text-4xl lg:text-5xl font-black mb-3 tracking-tight">{item.headline}</p>
                <p className="text-xs text-carbon/55 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ═══════════════ CATEGORIES ═══════════════ */}
        <section className="border-b border-[var(--carbon-line)]">
          <div className="reveal p-6 lg:p-12 border-b border-[var(--carbon-line)] flex justify-between items-end max-w-[1700px] mx-auto">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-willow mb-2">Shop By Category</p>
              <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-tight text-bone">The Archives</h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="cursor-hover flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-willow hover:text-bone transition-colors bg-transparent border-none p-0 group"
            >
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--carbon-line)] max-w-[1700px] mx-auto">
            {[
              { label: 'Bats', count: '42', img: batSsTonImg, category: 'bats' },
              { label: 'Protection', count: '28', img: padsDscProImg, category: 'protection' },
              { label: 'Clothing', count: '15', img: poloDscMatchImg, category: 'clothing' },
              { label: 'Balls', count: '09', img: ballKookaburraTurfImg, category: 'leather' },
            ].map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => navigateTo('shop', cat.category)}
                className={`tilt-card group relative aspect-[3/4] flex flex-col justify-between p-6 bg-carbonRaised hover:bg-[#141414] transition-colors duration-500 overflow-hidden border-b lg:border-b-0 border-[var(--carbon-line)] text-left cursor-hover border-x-0 border-t-0 ${
                  i >= 2 ? 'border-t lg:border-t-0' : ''
                }`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-willow/0 group-hover:bg-willow/[0.03] transition-colors duration-500" />

                <div className="tilt-inner tilt-pop relative z-10 flex justify-between items-start text-bone w-full">
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider">{cat.label}</h3>
                  <span className="font-mono text-[9px] text-willow">[ {cat.count} ]</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <img
                    alt={cat.label}
                    className="willow-grade object-contain w-full h-full group-hover:scale-108 transition-transform duration-700 drop-shadow-2xl"
                    src={cat.img}
                  />
                </div>

                <div className="tilt-inner tilt-pop relative z-10 flex items-center gap-1.5 text-willow font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop {cat.label} <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ═══════════════ SIGNATURE PRODUCTS ═══════════════ */}
        <section className="border-b border-black/[0.08] bg-bone text-carbon">
          <div className="reveal p-6 lg:p-12 border-b border-black/[0.08] text-center flex flex-col items-center max-w-[1700px] mx-auto">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-seam mb-3">Curated Selection</p>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">Signature Series</h2>
            <p className="text-sm font-light text-carbon/50 max-w-md">Equipment the Pitch Lab would bring to the crease. Nothing here skips calibration.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08] max-w-[1700px] mx-auto">
            {[ssProduct, kookaburraBallProduct, padsProduct, bagProduct].map((product, i) => (
              <div
                key={product.id}
                className="tilt-card group relative flex flex-col p-6 lg:p-8 hover:bg-[#f9f9f7] transition-colors duration-300"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 font-mono text-[8px] uppercase tracking-widest bg-carbon text-bone px-2.5 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Image */}
                <div
                  className="tilt-inner relative aspect-[4/5] flex items-center justify-center mb-6 cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  <img
                    alt={product.name}
                    className="tilt-pop object-contain w-full h-full drop-shadow-xl willow-grade"
                    src={product.image}
                  />
                  {/* Hover spec bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-carbon text-bone font-mono text-[8px] px-3 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
                    <span>Grade: {product.grade || 'Lab Spec'}</span>
                    <span>{product.pickup ? `Pickup: ${product.pickup}` : 'Pro Spec'}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-auto border-t border-black/[0.08] pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-mono text-carbon/40 uppercase tracking-[0.2em] mb-1">{product.brand}</p>
                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="text-sm font-bold font-display uppercase tracking-wide cursor-pointer hover:text-willow transition-colors leading-tight"
                      >
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold whitespace-nowrap">₹{product.price.toLocaleString('en-IN')}</p>
                      {product.originalPrice && (
                        <p className="text-[10px] font-mono text-carbon/40 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="cursor-hover w-full py-3 bg-carbon text-bone hover:bg-willow text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 border-none group"
                  >
                    <span>+ Add To Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-10 border-t border-black/[0.08] max-w-[1700px] mx-auto">
            <button
              onClick={() => navigateTo('shop')}
              className="cursor-hover inline-flex items-center gap-2 px-8 py-3.5 border border-carbon/20 text-carbon font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-carbon hover:text-bone transition-all bg-transparent rounded-full group"
            >
              View Full Catalog
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* ═══════════════ MANIFESTO QUOTE ═══════════════ */}
        <section className="relative py-28 md:py-40 px-6 lg:px-24 flex items-center justify-center text-center bg-pitch overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 blueprint-grid-light" />
          <div className="absolute inset-0 bg-gradient-to-b from-carbon via-pitch to-carbon" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-willow/[0.05] blur-3xl pointer-events-none" />

          {/* Seam line top */}
          <div className="absolute top-0 left-0 right-0">
            <svg viewBox="0 0 400 6" preserveAspectRatio="none" className="w-full h-1.5">
              <path d="M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3 T 120 3 T 140 3 T 160 3 T 180 3 T 200 3 T 220 3 T 240 3 T 260 3 T 280 3 T 300 3 T 320 3 T 340 3 T 360 3 T 380 3 T 400 3" stroke="#E60000" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
            </svg>
          </div>

          <div className="reveal relative z-10 max-w-4xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-willow mb-8">— The Pitch Lab</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.05] tracking-tight uppercase mb-8 text-bone">
              The bat doesn't make<br className="hidden md:block" />
              the player. But the<br className="hidden md:block" />
              <span className="text-willow">wrong one will break him.</span>
            </h2>
            <button
              onClick={() => navigateTo('about')}
              className="cursor-hover inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 hover:text-willow transition-colors bg-transparent border-none p-0 group"
            >
              Our Manifesto
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* ═══════════════ WHY PITCH ═══════════════ */}
        <section className="bg-bone text-carbon border-b border-black/[0.08] py-16 px-6 lg:px-12">
          <div className="max-w-[1700px] mx-auto">
            <div className="reveal text-center mb-12">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-seam mb-3">Why Choose Pitch</p>
              <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight">Performance Guaranteed</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: '6-Month Warranty',
                  desc: 'Every English Willow bat is protected by our manufacturing defect warranty. We stand behind every cleft.',
                  delay: '',
                },
                {
                  icon: Globe,
                  title: 'Worldwide Dispatch',
                  desc: 'Express air freight to India, UK, Australia, USA and 40+ countries. Metro India delivery in 2–4 days.',
                  delay: 'reveal-delay-1',
                },
                {
                  icon: Zap,
                  title: 'Pre-Knocked & Ready',
                  desc: '10,000 pneumatic press strikes and light linseed oiling. Your bat arrives ready for match play.',
                  delay: 'reveal-delay-2',
                },
              ].map((item) => (
                <div key={item.title} className={`reveal ${item.delay} p-8 rounded-sm border border-black/[0.08] space-y-4 hover:border-carbon/20 transition-colors`}>
                  <item.icon className="w-8 h-8 text-seam" />
                  <h3 className="font-display text-base font-bold uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-carbon/55 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ STOCKISTS ═══════════════ */}
        <section className="py-16 border-b border-[var(--carbon-line)] bg-carbon">
          <div className="max-w-[1700px] mx-auto px-6">
            <p className="reveal text-center font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-bone/30 mb-12">
              Official Stockist & Partner — Premium Cricket Manufacturers
            </p>
            <div className="reveal reveal-delay-1 flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-20">
              {[
                { name: 'SS CRICKET', desc: 'TON Series' },
                { name: 'KOOKABURRA', desc: 'Turf Match' },
                { name: 'GRAY-NICOLLS', desc: 'Legend Series' },
                { name: 'DSC CRICKET', desc: 'Pro Protection' },
                { name: 'SHREY', desc: 'Masterclass' },
                { name: 'GUNN & MOORE', desc: 'English Willow' },
                { name: 'SG CRICKET', desc: 'Test Leather' },
              ].map((brand) => (
                <div key={brand.name} className="flex flex-col items-center group cursor-hover">
                  <span className="font-display text-base sm:text-xl font-black tracking-tight text-bone/25 group-hover:text-willow transition-all duration-300 uppercase">
                    {brand.name}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-bone/20 group-hover:text-bone/40 transition-colors mt-0.5">
                    {brand.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
