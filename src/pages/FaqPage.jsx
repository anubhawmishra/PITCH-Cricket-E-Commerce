import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do I choose the right cricket bat weight for my playing style?',
      a: 'Choose bat weight based on your hitting style and wrist strength. Aggressive boundary hitters prefer mid-to-heavy bats (2lb 9oz – 2lb 10oz) for maximum power, while touch players and opening batters prefer lightweight bats (2lb 7oz – 2lb 8.5oz) for fast swing speed.'
    },
    {
      q: 'What is the difference between Grade 1+ and Grade 1 English Willow?',
      a: 'Grade 1+ English Willow represents the top 1% of harvested timber with 12 to 16 straight, unblemished grains offering peak hitting power. Grade 1 English Willow features 8 to 12 clean grains and excellent performance for pro match play.'
    },
    {
      q: 'Are your bats pre-knocked and ready to play immediately?',
      a: 'Yes! All bats undergo our 10,000 pneumatic press knocking-in and light raw linseed oiling service so they are ready for net practice and match play out of the box.'
    },
    {
      q: 'How long does shipping take, and is it trackable?',
      a: 'Metro orders in India deliver in 2-4 business days. International air express to UK, Australia, USA, and worldwide takes 3-6 business days. Every order includes a live tracking number.'
    },
    {
      q: 'What is the return and replacement policy?',
      a: 'We offer a 30-day hassle-free return policy. If your unused item is in original condition, you can return it for a full refund or size exchange. All bats include a 6-month warranty against manufacturing defects.'
    },
    {
      q: 'Can I engrave my name or initials on a custom bat?',
      a: 'Absolutely! Our Custom Bat Builder lets you enter up to 20 characters for precision laser name engraving along the back edge of the bat.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-[1700px] mx-auto bg-carbon relative">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-16 px-6 lg:px-12 noise-dark">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-willow uppercase tracking-[0.3em] bg-willow/10 border border-willow/30 px-3.5 py-1.5 rounded-full">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase text-bone tracking-tight">
              Cricket Gear FAQ
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about choosing cricket bats, knocking-in, leather balls, international shipping, and warranties.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-carbonRaised border border-[var(--carbon-line)] rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
                >
                  <span className="font-display text-base font-bold uppercase text-bone hover:text-willow transition-colors">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-carbon flex items-center justify-center text-willow flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 font-sans text-xs text-bone/70 leading-relaxed border-t border-bone/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};
