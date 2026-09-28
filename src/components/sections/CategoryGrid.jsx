import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import batSsTonImg from '../../assets/bat_ss_ton.jpg';
import ballKookaburraTurfImg from '../../assets/ball_kookaburra_turf.jpg';
import padsDscProImg from '../../assets/pads_dsc_pro.jpg';
import poloDscMatchImg from '../../assets/polo_dsc_match.jpg';

export const CategoryGrid = () => {
  const { navigateTo } = useStore();

  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (!fine) return;

    const cards = document.querySelectorAll('.tilt-card');
    const handlers = [];

    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.02)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      handlers.push({ card, handleMouseMove, handleMouseLeave });
    });

    return () => {
      handlers.forEach(({ card, handleMouseMove, handleMouseLeave }) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section className="border-b border-[var(--carbon-line)]" data-purpose="categories">
      <div className="reveal p-6 lg:p-12 border-b border-[var(--carbon-line)] flex justify-between items-end">
        <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight text-bone">
          The Archives
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="cursor-hover text-[10px] font-mono font-bold uppercase tracking-[0.2em] border-b border-willow text-willow pb-1 hover:opacity-60 transition-opacity bg-transparent p-0 cursor-pointer"
        >
          View Full Index
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--carbon-line)]">
        <button
          onClick={() => navigateTo('shop', 'bats')}
          className="tilt-card group relative aspect-[3/4] flex flex-col justify-between p-6 bg-carbonRaised hover:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden border-b lg:border-b-0 border-[var(--carbon-line)] text-left cursor-hover border-none cursor-pointer"
        >
          <div className="tilt-inner tilt-pop relative z-10 w-full flex justify-between items-start text-bone">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider">Bats</h3>
            <span className="font-mono text-[10px] text-willow">[ 42 ]</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              alt="Cricket Bats"
              className="willow-grade object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              src={batSsTonImg}
            />
          </div>
        </button>

        <button
          onClick={() => navigateTo('shop', 'protection')}
          className="tilt-card group relative aspect-[3/4] flex flex-col justify-between p-6 bg-carbonRaised hover:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden border-b lg:border-b-0 border-[var(--carbon-line)] text-left cursor-hover border-none cursor-pointer"
        >
          <div className="tilt-inner tilt-pop relative z-10 w-full flex justify-between items-start text-bone">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider">Protection</h3>
            <span className="font-mono text-[10px] text-willow">[ 28 ]</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              alt="Protection"
              className="willow-grade object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              src={padsDscProImg}
            />
          </div>
        </button>

        <button
          onClick={() => navigateTo('shop', 'clothing')}
          className="tilt-card group relative aspect-[3/4] flex flex-col justify-between p-6 bg-carbonRaised hover:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden text-left cursor-hover border-none cursor-pointer"
        >
          <div className="tilt-inner tilt-pop relative z-10 w-full flex justify-between items-start text-bone">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider">Clothing</h3>
            <span className="font-mono text-[10px] text-willow">[ 15 ]</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              alt="Clothing"
              className="willow-grade object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              src={poloDscMatchImg}
            />
          </div>
        </button>

        <button
          onClick={() => navigateTo('shop', 'leather')}
          className="tilt-card group relative aspect-[3/4] flex flex-col justify-between p-6 bg-carbonRaised hover:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden text-left cursor-hover border-none cursor-pointer"
        >
          <div className="tilt-inner tilt-pop relative z-10 w-full flex justify-between items-start text-bone">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider">Balls</h3>
            <span className="font-mono text-[10px] text-willow">[ 09 ]</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              alt="Cricket Balls"
              className="willow-grade object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              src={ballKookaburraTurfImg}
            />
          </div>
        </button>
      </div>
    </section>
  );
};
