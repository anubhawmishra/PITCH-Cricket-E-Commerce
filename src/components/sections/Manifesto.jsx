import React from 'react';
import { SeamDivider } from '../common/SeamDivider';

export const Manifesto = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 lg:px-24 flex items-center justify-center text-center bg-pitch overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.07] noise-dark" />
      <SeamDivider />
      <div className="reveal relative z-10 max-w-4xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight uppercase mb-8 text-bone">
          The bat doesn't make<br className="hidden md:block" /> the player. But the<br className="hidden md:block" /> wrong one will break him.
        </h2>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-willow">— The Pitch Lab</p>
      </div>
    </section>
  );
};
