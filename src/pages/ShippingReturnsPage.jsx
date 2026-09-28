import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Truck, ShieldCheck, RefreshCw, Globe, Check } from 'lucide-react';

export const ShippingReturnsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-[1700px] mx-auto bg-carbon relative">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-16 px-6 lg:px-12 noise-dark">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="font-mono text-[10px] text-willow uppercase tracking-[0.3em] block">
              Customer Care &amp; Guarantees
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase text-bone tracking-tight">
              Shipping &amp; Returns
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-xl mx-auto leading-relaxed">
              We ship cricket gear worldwide with insured express air freight. All products carry our 30-day hassle-free return and replacement guarantee.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-12 space-y-12">
          {/* 3 Core Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <Truck className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">Fast Express Delivery</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Orders are dispatched within 24-48 hours. Express Air Freight delivers in 3-5 business days across India, UK, Australia, and worldwide.
              </p>
            </div>

            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <RefreshCw className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">30-Day Easy Returns</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Not satisfied with your purchase? Return unused products in original packaging within 30 days for a 100% full refund or size exchange.
              </p>
            </div>

            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <ShieldCheck className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">Bat Warranty Protection</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Every English Willow bat comes with a 6-month handle and blade replacement warranty against manufacturing defects.
              </p>
            </div>
          </div>

          {/* Shipping Rates Table */}
          <div className="bg-carbonRaised border border-[var(--carbon-line)] rounded-lg p-8 space-y-6">
            <h2 className="font-display text-xl font-bold uppercase text-bone flex items-center gap-2">
              <Globe className="w-5 h-5 text-willow" /> Shipping Rates &amp; Delivery Timelines
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-bone/20 text-willow uppercase">
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Delivery Time</th>
                    <th className="py-3 px-4">Shipping Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone/10 text-bone/80">
                  <tr>
                    <td className="py-3.5 px-4 font-bold">India (Metro Cities)</td>
                    <td className="py-3.5 px-4">2 - 4 Business Days</td>
                    <td className="py-3.5 px-4 text-green-400 font-bold">FREE over ₹4,999 (else ₹199)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold">United Kingdom / Europe</td>
                    <td className="py-3.5 px-4">3 - 6 Business Days</td>
                    <td className="py-3.5 px-4">₹1,499 Air Express</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold">Australia / New Zealand</td>
                    <td className="py-3.5 px-4">4 - 7 Business Days</td>
                    <td className="py-3.5 px-4">₹1,899 Air Express</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold">USA / Canada</td>
                    <td className="py-3.5 px-4">4 - 6 Business Days</td>
                    <td className="py-3.5 px-4">₹1,699 Air Express</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
