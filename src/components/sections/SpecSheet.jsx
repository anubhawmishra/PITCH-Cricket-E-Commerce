import React from 'react';

export const SpecSheet = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10 bg-bone text-carbon blueprint-grid" data-purpose="values">
      <div className="reveal p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between h-72">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-seam">Willow Grade</span>
        <div>
          <p className="font-display text-4xl md:text-5xl font-bold mb-3">A+ / GR.1</p>
          <p className="text-xs text-carbon/60 leading-relaxed max-w-xs">
            Hand-selected, unbleached English willow with a minimum of eight straight grains, sun-dried for eighteen months before a blade is pressed.
          </p>
        </div>
      </div>
      <div className="reveal reveal-delay-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between h-72">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-seam">Pickup Calibration</span>
        <div>
          <p className="font-display text-4xl md:text-5xl font-bold mb-3">142g <span className="text-xl align-top">±2</span></p>
          <p className="text-xs text-carbon/60 leading-relaxed max-w-xs">
            Every blade is sensor-balanced for how it swings, not just how it sits on a scale. Pickup is weighed separately from static mass.
          </p>
        </div>
      </div>
      <div className="reveal reveal-delay-2 p-8 md:p-12 flex flex-col justify-between h-72">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-seam">Press Tolerance</span>
        <div>
          <p className="font-display text-4xl md:text-5xl font-bold mb-3">0.3mm</p>
          <p className="text-xs text-carbon/60 leading-relaxed max-w-xs">
            Compressed to a tolerance finer than a human hair — tuned for maximum ping without compromising the willow's structure.
          </p>
        </div>
      </div>
    </section>
  );
};
