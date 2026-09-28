import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Package, Search, CheckCircle2, Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';
import batSsTonImg from '../assets/bat_ss_ton.jpg';
import ballKookaburraTurfImg from '../assets/ball_kookaburra_turf.jpg';

export const TrackOrderPage = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [activeOrder, setActiveOrder] = useState({
    id: 'PITCH-89241',
    customer: 'Cricket Enthusiast',
    date: 'August 12, 2026',
    estDelivery: 'August 16, 2026',
    courier: 'DHL Express (Air Freight)',
    trackingNo: 'DHL-981245012',
    status: 'shipped',
    currentStep: 4,
    items: [
      { name: 'TON Player Edition Willow Bat (2lb 8.5oz)', price: '₹14,999', img: batSsTonImg },
      { name: 'Turf Red Match Ball (156g Test Spec)', price: '₹2,999', img: ballKookaburraTurfImg }
    ],
    timeline: [
      { step: 1, title: 'Order Placed', desc: 'Order received and confirmed', time: 'Aug 12, 10:14 AM', done: true },
      { step: 2, title: 'Wood Selection & Inspection', desc: 'Grain check & weight balance passed', time: 'Aug 12, 02:30 PM', done: true },
      { step: 3, title: 'Pre-Knocked & Oiled', desc: '10,000 pneumatic press strikes completed', time: 'Aug 13, 11:00 AM', done: true },
      { step: 4, title: 'Quality Check & Packed', desc: 'Dispatched from Willow Lab', time: 'Aug 13, 04:45 PM', done: true },
      { step: 5, title: 'Out for Delivery', desc: 'With local courier partner', time: 'Expected Aug 16', done: false }
    ]
  });

  const handleLookup = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    const cleaned = orderIdInput.trim().toUpperCase();
    if (cleaned.includes('74129')) {
      setActiveOrder({
        id: 'PITCH-74129',
        customer: 'Cricket Enthusiast',
        date: 'August 14, 2026',
        estDelivery: 'August 18, 2026',
        courier: 'Blue Dart Express',
        trackingNo: 'BD-40918237',
        status: 'processing',
        currentStep: 2,
        items: [
          { name: 'Custom Handcrafted Bat (Mid Sweet Spot)', price: '₹17,499', img: batSsTonImg }
        ],
        timeline: [
          { step: 1, title: 'Order Placed', desc: 'Order received and confirmed', time: 'Aug 14, 09:00 AM', done: true },
          { step: 2, title: 'Wood Selection & Inspection', desc: 'Selecting Grade 1+ English Willow cleft', time: 'Aug 14, 01:15 PM', done: true },
          { step: 3, title: 'Pre-Knocked & Oiled', desc: 'Scheduled for pneumatic knocking', time: 'Pending', done: false },
          { step: 4, title: 'Quality Check & Packed', desc: 'Pending final laser scan', time: 'Pending', done: false },
          { step: 5, title: 'Out for Delivery', desc: 'Pending dispatch', time: 'Pending', done: false }
        ]
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[1700px] mx-auto bg-carbon relative">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-16 px-6 lg:px-12 noise-dark">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-willow uppercase tracking-[0.3em] bg-willow/10 border border-willow/30 px-3.5 py-1.5 rounded-full">
              <Package className="w-3.5 h-3.5" /> Order Tracking Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase text-bone tracking-tight">
              Track Your Order
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-xl mx-auto leading-relaxed">
              Enter your Order Number (e.g. <span className="text-willow font-mono font-bold">PITCH-89241</span>) to check real-time workshop processing and shipping status.
            </p>

            {/* Search Input Form */}
            <form onSubmit={handleLookup} className="max-w-md mx-auto pt-4 flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Order ID (e.g. PITCH-89241)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="w-full bg-carbon border border-bone/20 rounded px-4 py-3.5 text-xs font-mono text-bone uppercase focus:border-willow focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="cursor-hover px-6 py-3.5 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors flex items-center gap-1.5 border-none cursor-pointer"
              >
                <Search className="w-4 h-4" /> Track
              </button>
            </form>

            <div className="pt-2 text-[11px] font-mono text-bone/40">
              Try sample orders: {' '}
              <button onClick={() => setOrderIdInput('PITCH-89241')} className="text-willow underline cursor-pointer bg-transparent border-none p-0 mr-2">PITCH-89241</button>
              <button onClick={() => setOrderIdInput('PITCH-74129')} className="text-willow underline cursor-pointer bg-transparent border-none p-0">PITCH-74129</button>
            </div>
          </div>
        </section>

        {/* Order Details & Timeline */}
        {activeOrder && (
          <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-12 space-y-10">
            {/* Header info card */}
            <div className="bg-carbonRaised border border-[var(--carbon-line)] rounded-lg p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-willow uppercase tracking-widest block">Active Shipment</span>
                <h2 className="font-display text-2xl font-bold uppercase text-bone">{activeOrder.id}</h2>
                <p className="text-xs text-bone/60 font-mono">Customer: {activeOrder.customer} • Placed: {activeOrder.date}</p>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs text-bone/80 border-t md:border-t-0 md:border-l border-bone/10 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[10px] text-bone/40 block uppercase">Est. Delivery</span>
                  <strong className="text-willow">{activeOrder.estDelivery}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-bone/40 block uppercase">Courier Partner</span>
                  <strong className="text-bone">{activeOrder.courier}</strong>
                </div>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="bg-carbonRaised border border-[var(--carbon-line)] rounded-lg p-6 lg:p-8 space-y-6">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-bone flex items-center gap-2">
                <Truck className="w-5 h-5 text-willow" /> Order Status Timeline
              </h3>

              <div className="relative border-l-2 border-willow/30 ml-4 pl-6 space-y-8">
                {activeOrder.timeline.map((t) => (
                  <div key={t.step} className="relative">
                    <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                      t.done ? 'bg-willow text-carbon' : 'bg-carbon border-2 border-bone/30'
                    }`}>
                      {t.done && <CheckCircle2 className="w-4 h-4 text-willow" />}
                    </span>

                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className={`font-mono text-sm font-bold uppercase ${t.done ? 'text-bone' : 'text-bone/40'}`}>
                          {t.title}
                        </h4>
                        <span className="font-mono text-[10px] text-willow bg-willow/10 px-2 py-0.5 rounded">
                          {t.time}
                        </span>
                      </div>
                      <p className="text-xs text-bone/60 font-light mt-1">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items List */}
            <div className="bg-carbonRaised border border-[var(--carbon-line)] rounded-lg p-6 lg:p-8 space-y-6">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-bone">
                Package Contents
              </h3>

              <div className="divide-y divide-bone/10">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded bg-carbon p-2 border border-bone/10" />
                      <div>
                        <h4 className="font-display text-sm font-bold uppercase text-bone">{item.name}</h4>
                        <span className="font-mono text-[10px] text-bone/50 uppercase">Verified Lab Inspection Passed</span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-willow">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
