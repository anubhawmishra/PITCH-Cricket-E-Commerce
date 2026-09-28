import React from 'react';

export const Stockists = () => {
  const brands = [
    { name: 'SS CRICKET', desc: 'TON Series' },
    { name: 'KOOKABURRA', desc: 'Turf Match Leather' },
    { name: 'GRAY-NICOLLS', desc: 'Legend Series' },
    { name: 'DSC CRICKET', desc: 'Pro Protection & Bags' },
    { name: 'SHREY', desc: 'Masterclass Protection' },
    { name: 'GUNN & MOORE', desc: 'English Willow' },
    { name: 'SG CRICKET', desc: 'Test Match Leather' },
  ];

  return (
    <section className="py-16 border-b border-black/10 bg-bone text-carbon">
      <div className="max-w-7xl mx-auto px-6">
        <p className="reveal text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-carbon/50 mb-10">
          Official Stockist &amp; Partner For Premium Manufacturers
        </p>
        <div className="reveal reveal-delay-1 flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center group cursor-hover">
              <span className="font-display text-lg sm:text-2xl font-extrabold tracking-tight text-carbon/70 group-hover:text-willow transition-colors uppercase">
                {brand.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-carbon/40 group-hover:text-carbon transition-colors">
                {brand.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
