import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import batSsTonImg from '../assets/bat_ss_ton.jpg';
import { Check, Zap, RotateCcw, Info } from 'lucide-react';

const WOOD_OPTIONS = [
  {
    id: 'gr1-plus',
    name: 'Grade 1+ English Willow',
    tag: 'Elite',
    basePrice: 16999,
    grains: '12–16 Straight Grains — Maximum Power & Pop',
    color: 'border-willow bg-willow/8',
  },
  {
    id: 'gr1',
    name: 'Grade 1 English Willow',
    tag: 'Pro',
    basePrice: 12999,
    grains: '8–12 Grains — Excellent Power & Durability',
    color: 'border-bone/20',
  },
  {
    id: 'gr2',
    name: 'Grade 2 English Willow',
    tag: 'Club',
    basePrice: 9499,
    grains: '6–8 Grains — Reliable Everyday Match Bat',
    color: 'border-bone/20',
  },
];

const SWEET_SPOT_OPTIONS = [
  { id: 'low', label: 'Low Profile', desc: 'Low bounce pitches & leg-side' },
  { id: 'mid', label: 'Mid Profile', desc: 'All-round balanced player' },
  { id: 'high', label: 'High Profile', desc: 'Bouncy pitches & top edges' },
];

const WEIGHT_OPTIONS = ['2lb 7.5oz', '2lb 8.5oz', '2lb 9.5oz', '2lb 10.5oz'];

const HANDLE_OPTIONS = [
  { id: 'semi-oval', label: 'Semi-Oval' },
  { id: 'round', label: 'Round' },
  { id: 'full-oval', label: 'Full Oval' },
];

export const CustomizerPage = () => {
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [cleftGrade, setCleftGrade] = useState(WOOD_OPTIONS[0]);
  const [sweetSpot, setSweetSpot] = useState('mid');
  const [handleType, setHandleType] = useState('semi-oval');
  const [weight, setWeight] = useState('2lb 8.5oz');
  const [engravingText, setEngravingText] = useState('');
  const [knockIn, setKnockIn] = useState(true);
  const [oiling, setOiling] = useState(false);
  const [step, setStep] = useState(1);

  const extraCost = (knockIn ? 800 : 0) + (oiling ? 300 : 0) + (engravingText.trim().length > 0 ? 500 : 0);
  const totalPrice = cleftGrade.basePrice + extraCost;

  const handleAddCustomBat = () => {
    const customProduct = {
      id: `custom-bat-${Date.now()}`,
      name: `Custom Handcrafted Bat — ${sweetSpot.toUpperCase()} Spot`,
      brand: 'PITCH Custom Lab',
      category: 'bats',
      categoryName: 'Bats',
      price: totalPrice,
      rating: 5.0,
      reviews: 1,
      image: batSsTonImg,
      badge: 'Custom Built',
      description: `Custom handcrafted bat. Wood: ${cleftGrade.name}. Sweet Spot: ${sweetSpot}. Handle: ${handleType}.`,
    };
    addToCart(customProduct, {
      weight,
      knockIn,
      oiling,
      engraving: engravingText.trim().length > 0,
      engravingText,
      handleType,
    });
  };

  const handleReset = () => {
    setCleftGrade(WOOD_OPTIONS[0]);
    setSweetSpot('mid');
    setHandleType('semi-oval');
    setWeight('2lb 8.5oz');
    setEngravingText('');
    setKnockIn(true);
    setOiling(false);
    setStep(1);
  };

  const STEPS = ['Wood', 'Profile', 'Handle', 'Extras'];

  return (
    <div className="flex flex-col min-h-screen bg-carbon relative page-enter">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-14 px-6 lg:px-12 noise-dark">
          <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-[9px] text-willow uppercase tracking-[0.35em]">
                <Zap className="w-3.5 h-3.5" />
                Custom Bat Configurator
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-bone tracking-tight">
                Build Your Bat
              </h1>
              <p className="text-sm font-light text-bone/50 max-w-lg mt-3 leading-relaxed">
                Choose your English Willow grade, sweet spot profile, handle type and custom laser engraving. Every bat is handcrafted and dispatched within 48 hours.
              </p>
            </div>

            <div className="bg-carbon border border-willow/25 rounded-sm p-6 font-mono text-right min-w-[180px]">
              <span className="text-bone/40 uppercase tracking-widest text-[9px] block mb-1">Your Configuration</span>
              <span className="text-3xl font-black text-willow block">₹{totalPrice.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-bone/50 block mt-1">Weight: {weight}</span>
              {extraCost > 0 && (
                <span className="text-[9px] text-green-400 block mt-0.5">+₹{extraCost.toLocaleString('en-IN')} services</span>
              )}
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <div className="border-b border-[var(--carbon-line)] bg-carbonRaised/50 px-6 lg:px-12 py-4">
          <div className="max-w-[1700px] mx-auto flex items-center gap-0">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => setStep(i + 1)}
                  className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                    step === i + 1 ? 'text-willow' : step > i + 1 ? 'text-bone/60' : 'text-bone/25'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    step > i + 1 ? 'bg-willow text-bone' : step === i + 1 ? 'border border-willow text-willow' : 'border border-bone/20 text-bone/25'
                  }`}>
                    {step > i + 1 ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:block">{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${step > i + 1 ? 'bg-willow/40' : 'bg-bone/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-carbonRaised border border-[var(--carbon-line)] rounded-sm overflow-hidden">
              {/* Preview Header */}
              <div className="flex justify-between items-center font-mono text-[9px] uppercase text-willow tracking-widest border-b border-[var(--carbon-line)] px-5 py-3 bg-carbon">
                <span>PITCH Lab Specimen</span>
                <span>{cleftGrade.id.toUpperCase()}</span>
              </div>

              {/* Bat Image */}
              <div className="relative flex items-center justify-center bg-carbon/60 p-8" style={{ minHeight: '340px' }}>
                <img
                  src={batSsTonImg}
                  alt="Custom Bat Preview"
                  className="object-contain max-h-72 w-auto willow-grade drop-shadow-2xl transition-all duration-500"
                  style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                />

                {/* Engraving overlay */}
                {engravingText && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-carbon/90 border border-willow/40 px-3 py-1 text-[9px] font-mono tracking-[0.2em] text-willow uppercase transform -rotate-90 whitespace-nowrap shadow-xl">
                    {engravingText}
                  </div>
                )}

                {/* Sweet spot indicator */}
                <div className={`absolute right-6 ${sweetSpot === 'low' ? 'bottom-16' : sweetSpot === 'high' ? 'top-16' : 'top-1/2 -translate-y-1/2'} flex flex-col items-center gap-1`}>
                  <div className="w-2 h-12 bg-willow/40 rounded-full">
                    <div className={`w-full bg-willow rounded-full transition-all duration-500 ${
                      sweetSpot === 'mid' ? 'h-8 mt-2' : sweetSpot === 'low' ? 'h-10 mt-2' : 'h-10'
                    }`} />
                  </div>
                  <span className="font-mono text-[7px] text-willow uppercase tracking-wider">{sweetSpot}</span>
                </div>
              </div>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-0 font-mono text-[10px] text-bone/55 border-t border-[var(--carbon-line)]">
                {[
                  { label: 'Wood', value: cleftGrade.id.toUpperCase() },
                  { label: 'Sweet Spot', value: sweetSpot.toUpperCase() },
                  { label: 'Weight', value: weight },
                  { label: 'Handle', value: handleType.replace('-', ' ').toUpperCase() },
                  { label: 'Knock-In', value: knockIn ? 'YES (+₹800)' : 'NO' },
                  { label: 'Engraving', value: engravingText ? `"${engravingText.slice(0,8)}…"` : 'NONE' },
                ].map((spec, i) => (
                  <div key={spec.label} className={`px-4 py-3 ${i % 2 === 0 ? 'border-r border-[var(--carbon-line)]' : ''} ${i < 4 ? 'border-b border-[var(--carbon-line)]' : ''}`}>
                    <p className="text-bone/30 text-[8px] uppercase tracking-widest mb-0.5">{spec.label}</p>
                    <p className="text-bone font-bold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Config Steps */}
          <div className="lg:col-span-8 space-y-8">

            {/* Step 1: Wood Quality */}
            <div className={`transition-opacity duration-200 ${step < 1 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <SectionHeader
                num={1}
                title="Wood Quality"
                subtitle="English Willow Grade"
                active={step >= 1}
              />
              <div className="grid grid-cols-1 gap-3 mt-4">
                {WOOD_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setCleftGrade(item); setStep(Math.max(step, 2)); }}
                    className={`cursor-hover p-5 rounded-sm border text-left transition-all ${
                      cleftGrade.id === item.id
                        ? 'border-willow bg-willow/8 text-bone'
                        : 'border-bone/10 bg-carbonRaised text-bone/60 hover:border-bone/25 hover:text-bone'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${cleftGrade.id === item.id ? 'border-willow' : 'border-bone/30'}`}>
                          {cleftGrade.id === item.id && <div className="w-2 h-2 rounded-full bg-willow" />}
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold uppercase tracking-wide">{item.name}</p>
                          <p className="font-mono text-[10px] text-bone/40 mt-0.5">{item.grains}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[8px] uppercase tracking-widest bg-carbon/60 border border-bone/10 px-2 py-0.5 rounded text-bone/50">{item.tag}</span>
                        <p className="font-mono text-sm font-bold text-willow mt-1">₹{item.basePrice.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sweet Spot */}
            <div className={`transition-opacity duration-200 ${step < 2 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <SectionHeader num={2} title="Sweet Spot Profile" subtitle="Blade Position" active={step >= 2} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {SWEET_SPOT_OPTIONS.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => { setSweetSpot(spot.id); setStep(Math.max(step, 3)); }}
                    className={`cursor-hover p-4 rounded-sm border text-left transition-all ${
                      sweetSpot === spot.id
                        ? 'border-willow bg-willow/10 text-bone'
                        : 'border-bone/10 bg-carbonRaised text-bone/55 hover:border-bone/25 hover:text-bone'
                    }`}
                  >
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1">{spot.label}</p>
                    <p className="font-mono text-[9px] text-bone/40">{spot.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Weight & Handle */}
            <div className={`transition-opacity duration-200 ${step < 3 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <SectionHeader num={3} title="Weight & Handle" subtitle="Physical Specification" active={step >= 3} />
              
              <div className="mt-4 space-y-5">
                {/* Weight */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40 mb-3">Bat Weight</p>
                  <div className="grid grid-cols-4 gap-2">
                    {WEIGHT_OPTIONS.map((wt) => (
                      <button
                        key={wt}
                        type="button"
                        onClick={() => { setWeight(wt); setStep(Math.max(step, 4)); }}
                        className={`cursor-hover py-3 px-2 rounded-sm border text-center font-mono text-[10px] transition-all ${
                          weight === wt
                            ? 'border-willow bg-willow text-bone font-bold'
                            : 'border-bone/10 bg-carbonRaised text-bone/55 hover:border-bone/25 hover:text-bone'
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Handle */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40 mb-3">Handle Type</p>
                  <div className="grid grid-cols-3 gap-2">
                    {HANDLE_OPTIONS.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setHandleType(h.id)}
                        className={`cursor-hover py-3 rounded-sm border text-center font-mono text-[10px] transition-all ${
                          handleType === h.id
                            ? 'border-willow bg-willow/10 text-bone font-bold'
                            : 'border-bone/10 bg-carbonRaised text-bone/55 hover:border-bone/25 hover:text-bone'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Extras */}
            <div className={`transition-opacity duration-200 ${step < 4 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <SectionHeader num={4} title="Extras & Engraving" subtitle="Lab Services" active={step >= 4} />

              <div className="mt-4 space-y-4">
                {/* Knock-In */}
                <label className={`cursor-hover flex items-center justify-between p-5 rounded-sm border transition-all ${knockIn ? 'border-willow bg-willow/8' : 'border-bone/10 bg-carbonRaised'}`}>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] font-bold text-bone uppercase tracking-wide">Ready-To-Play Knock-In (+₹800)</p>
                    <p className="font-mono text-[9px] text-bone/40 mt-0.5">10,000 pneumatic press strikes — arrive ready for match play</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={knockIn}
                    onChange={(e) => setKnockIn(e.target.checked)}
                    className="accent-willow w-4 h-4 ml-4"
                  />
                </label>

                {/* Oiling */}
                <label className={`cursor-hover flex items-center justify-between p-5 rounded-sm border transition-all ${oiling ? 'border-willow bg-willow/8' : 'border-bone/10 bg-carbonRaised'}`}>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] font-bold text-bone uppercase tracking-wide">Linseed Oiling (+₹300)</p>
                    <p className="font-mono text-[9px] text-bone/40 mt-0.5">Raw linseed oil treatment to protect and condition the willow fibers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={oiling}
                    onChange={(e) => setOiling(e.target.checked)}
                    className="accent-willow w-4 h-4 ml-4"
                  />
                </label>

                {/* Engraving */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40 mb-2">Laser Name Engraving (+₹500 if filled)</p>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="YOUR NAME / INITIALS / NUMBER..."
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                    className="w-full bg-carbonRaised border border-bone/10 rounded-sm px-4 py-3.5 text-sm font-mono text-bone uppercase focus:border-willow focus:outline-none transition-colors placeholder-bone/20"
                    aria-label="Custom engraving text"
                  />
                  <p className="font-mono text-[9px] text-bone/30 mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {engravingText.length}/20 characters — laser-etched on back edge
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-bone/10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddCustomBat}
                className="cursor-hover flex-1 py-5 bg-willow text-bone font-mono text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm hover:bg-red-700 transition-colors shadow-xl shadow-willow/20 border-none flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Add Custom Bat — ₹{totalPrice.toLocaleString('en-IN')}
              </button>
              <button
                onClick={handleReset}
                className="cursor-hover px-6 py-5 border border-bone/15 text-bone/55 font-mono text-[11px] uppercase tracking-[0.2em] rounded-sm hover:border-bone/30 hover:text-bone transition-all bg-transparent flex items-center gap-2"
                aria-label="Reset customizer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const SectionHeader = ({ num, title, subtitle, active }) => (
  <div className="flex items-center gap-3">
    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 ${active ? 'bg-willow text-bone' : 'border border-bone/20 text-bone/25'}`}>
      {num}
    </span>
    <div>
      <h3 className={`font-display text-sm font-bold uppercase tracking-wider ${active ? 'text-bone' : 'text-bone/30'}`}>{title}</h3>
      <p className="font-mono text-[9px] uppercase tracking-widest text-bone/30">{subtitle}</p>
    </div>
  </div>
);
