import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Award, Flame, Scale, ChevronRight, ArrowRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const TIMELINE = [
  { year: '2019', title: 'The Willow Lab Begins', desc: 'Founded by former cricketers and master bat makers with one obsession — building the perfect blade.' },
  { year: '2021', title: 'First Grade 1+ Cleft', desc: 'Sourced our first premium English Willow harvest from Norfolk, hand-selected from 2,400 clefts.' },
  { year: '2023', title: 'Custom Lab Opens', desc: 'Launched the Custom Bat Builder — giving every player a bat configured to their exact playing style.' },
  { year: '2025', title: 'Global Shipping', desc: 'Extended our express air freight network to 40+ countries — serving players from Mumbai to Melbourne.' },
  { year: '2026', title: 'Performance Lab', desc: 'Evolved into the Pitch Performance Lab — bringing scientific precision to bat selection and calibration.' },
];

const PHILOSOPHY = [
  {
    Icon: Award,
    title: 'Grade 1+ English Willow',
    desc: 'Every bat starts life as a hand-selected Grade 1+ English Willow cleft — chosen from the top percentile of the harvest for straightness of grain, moisture content and fiber density. We refuse to compromise at the source.',
  },
  {
    Icon: Scale,
    title: 'Balanced Pickup & Feel',
    desc: 'A heavier bat is not a better bat. We obsess over balance — distributing mass through the blade\'s profile and shaping the handle to create a bat that feels feather-light in your hands while delivering explosive power at contact.',
  },
  {
    Icon: Flame,
    title: 'Pre-Knocked & Match Ready',
    desc: 'Every bat leaves our workshop pre-knocked with 10,000 pneumatic press strikes and treated with raw linseed oil. You receive a game-ready blade — no preparation, no waiting.',
  },
];

export const AboutPage = () => {
  const { navigateTo } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-carbon relative page-enter">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative bg-carbonRaised border-b border-[var(--carbon-line)] py-24 px-6 lg:px-12 noise-dark overflow-hidden">
          <div className="absolute inset-0 blueprint-grid-light opacity-60" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-willow/[0.04] to-transparent" />

          <div className="max-w-[1700px] mx-auto relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5 font-mono text-[9px] text-willow uppercase tracking-[0.35em]">
                <span className="w-1.5 h-1.5 rounded-full bg-willow animate-pulse" />
                The Pitch Cricket Manifesto
              </div>
              <h1 className="text-5xl sm:text-7xl font-display font-black uppercase text-bone tracking-tight leading-[0.95] mb-8">
                Crafted For<br />
                <span className="text-willow">Passionate</span><br />
                Cricketers.
              </h1>
              <p className="text-base font-light text-bone/55 max-w-xl leading-relaxed">
                Founded by former players and master bat makers, Pitch Cricket was built to bring laboratory-grade equipment directly to cricketers who demand more than what the shelf can offer.
              </p>

              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={() => navigateTo('shop')}
                  className="cursor-hover inline-flex items-center gap-2 px-7 py-3.5 bg-willow text-bone font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-red-700 transition-colors border-none group"
                >
                  Explore Equipment
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo('customizer')}
                  className="cursor-hover inline-flex items-center gap-2 px-7 py-3.5 border border-bone/20 text-bone font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:border-willow hover:text-willow transition-all bg-transparent group"
                >
                  Build Custom Bat
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Pillars */}
        <section className="py-20 px-6 lg:px-12 border-b border-[var(--carbon-line)]">
          <div className="max-w-[1700px] mx-auto">
            <div className="reveal text-center mb-14">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-willow mb-3">Our Philosophy</p>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-bone">Three Pillars of Performance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHILOSOPHY.map((item, i) => (
                <div key={item.title} className={`reveal reveal-delay-${i} group p-8 rounded-sm border border-bone/[0.07] hover:border-willow/30 bg-carbonRaised transition-all duration-300 space-y-5`}>
                  <div className="w-12 h-12 rounded-sm bg-willow/10 border border-willow/20 flex items-center justify-center group-hover:bg-willow/20 transition-colors">
                    <item.Icon className="w-6 h-6 text-willow" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-bone mb-3">{item.title}</h3>
                    <p className="text-sm text-bone/50 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 lg:px-12 border-b border-[var(--carbon-line)] bg-bone text-carbon blueprint-grid">
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-center mb-14">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-seam mb-3">Brand Journey</p>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">From Cleft to Lab</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[88px] sm:left-24 top-0 bottom-0 w-px bg-black/10" />

              <div className="space-y-12">
                {TIMELINE.map((event, i) => (
                  <div key={event.year} className={`reveal reveal-delay-${Math.min(i, 3)} relative flex gap-8 sm:gap-12`}>
                    {/* Year */}
                    <div className="w-[72px] sm:w-20 flex-shrink-0 text-right pt-1">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-seam">{event.year}</span>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-[82px] sm:left-[90px] top-1.5 w-4 h-4 rounded-full bg-bone border-2 border-seam z-10" />

                    {/* Content */}
                    <div className="flex-1 pl-8">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-carbon mb-2">{event.title}</h3>
                      <p className="text-sm text-carbon/55 font-light leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-16 px-6 lg:px-12 border-b border-[var(--carbon-line)]">
          <div className="max-w-[1700px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[var(--carbon-line)]">
            {[
              { value: '2,400+', label: 'Clefts Inspected Yearly', delay: '' },
              { value: '40+', label: 'Countries Served', delay: 'reveal-delay-1' },
              { value: '48h', label: 'Express Dispatch', delay: 'reveal-delay-2' },
              { value: '6-Month', label: 'Bat Warranty', delay: 'reveal-delay-3' },
            ].map((stat) => (
              <div key={stat.label} className={`reveal ${stat.delay} text-center md:px-8`}>
                <p className="font-display text-3xl md:text-4xl font-black text-willow mb-2">{stat.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="reveal">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-willow mb-4">Ready to Play?</p>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-bone mb-6">
                Upgrade Your<br /><span className="text-willow">Cricket Kit.</span>
              </h2>
              <p className="text-sm text-bone/50 font-light max-w-md mx-auto">
                Whether you need a signature bat off the shelf or a fully custom build — Pitch Lab has the blade for your game.
              </p>
            </div>
            <div className="reveal reveal-delay-1 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="cursor-hover px-8 py-4 bg-willow text-bone font-mono text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-red-700 transition-colors border-none"
              >
                Explore Equipment Catalog
              </button>
              <button
                onClick={() => navigateTo('customizer')}
                className="cursor-hover px-8 py-4 border border-bone/20 text-bone font-mono text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:border-willow hover:text-willow transition-all bg-transparent"
              >
                Configure Custom Bat
              </button>
            </div>

            <div className="reveal reveal-delay-2 pt-8 border-t border-bone/[0.07]">
              <p className="font-mono text-[9px] uppercase tracking-widest text-bone/20">
                Designed & Developed by <span className="text-bone/40">Anubhaw Mishra</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
