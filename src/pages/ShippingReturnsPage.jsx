import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Truck, ShieldCheck, RefreshCw, Globe, CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShippingReturnsPage = () => {
  const { navigateTo } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-[1700px] mx-auto bg-carbon relative text-bone">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-16 px-6 lg:px-12 noise-dark">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="font-mono text-[10px] text-willow uppercase tracking-[0.3em] block">
              Fulfillment, Cancellations &amp; Guarantees
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-bone">
              Shipping &amp; Returns Policy
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-2xl mx-auto leading-relaxed">
              Transparent delivery schedules, cancellation rights, and hassle-free returns for cricket equipment crafted for champions. Formulated with reference to the consumer guidelines of the Consumer Protection (E-Commerce) Rules, 2020.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-bone/40 bg-carbon px-3 py-1.5 rounded border border-bone/10">
              <span>Last Updated: October 2026</span>
              <span>·</span>
              <span>Effective Date: 11 October 2026</span>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12 space-y-12 font-sans text-sm text-bone/80 leading-relaxed">

          {/* 3 Core Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <Truck className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">Insured Express Shipping</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Dispatched within 24–48 hours via premium air freight partners. Tracked door-to-door with comprehensive transit insurance.
              </p>
            </div>

            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <RefreshCw className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">30-Day Easy Returns</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Unused standard gear in original packaging can be returned within 30 days of delivery for a 100% full refund or exchange.
              </p>
            </div>

            <div className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3">
              <ShieldCheck className="w-7 h-7 text-willow" />
              <h3 className="font-display text-base font-bold uppercase text-bone">6-Month Bat Warranty</h3>
              <p className="text-xs text-bone/60 leading-relaxed font-light">
                Every English Willow bat carries a 6-month limited warranty protecting against manufacturing defects in handle and blade joint.
              </p>
            </div>
          </div>

          {/* 1. Shipping Rates & Timelines */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Globe className="w-5 h-5 text-willow" /> 1. Shipping Timelines &amp; Delivery Rates
            </h2>
            <p>
              We partner with India's leading logistics providers (BlueDart, Delhivery, DTDC) and international express carriers (DHL Express, FedEx) to ensure secure delivery of precision cricket equipment.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs border border-bone/10">
                <thead>
                  <tr className="bg-carbonRaised text-willow border-b border-bone/10">
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Estimated Transit</th>
                    <th className="py-3 px-4">Courier Partner</th>
                    <th className="py-3 px-4">Shipping Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone/10 text-bone/80">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-bone">India (Tier-1 Metro Cities)</td>
                    <td className="py-3.5 px-4">2 – 4 Business Days</td>
                    <td className="py-3.5 px-4">BlueDart / Delhivery Air</td>
                    <td className="py-3.5 px-4 text-green-400 font-bold">FREE over ₹4,999 (else ₹199)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-bone">India (Rest of Country)</td>
                    <td className="py-3.5 px-4">4 – 6 Business Days</td>
                    <td className="py-3.5 px-4">Delhivery / DTDC Express</td>
                    <td className="py-3.5 px-4 text-green-400 font-bold">FREE over ₹4,999 (else ₹249)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-bone">United Kingdom &amp; Europe</td>
                    <td className="py-3.5 px-4">4 – 7 Business Days</td>
                    <td className="py-3.5 px-4">DHL Express International</td>
                    <td className="py-3.5 px-4">₹1,499 Air Freight</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-bone">Australia &amp; New Zealand</td>
                    <td className="py-3.5 px-4">5 – 8 Business Days</td>
                    <td className="py-3.5 px-4">DHL Express / FedEx</td>
                    <td className="py-3.5 px-4">₹1,899 Air Freight</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-bone">USA &amp; Canada</td>
                    <td className="py-3.5 px-4">4 – 7 Business Days</td>
                    <td className="py-3.5 px-4">FedEx Priority Air</td>
                    <td className="py-3.5 px-4">₹1,699 Air Freight</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-bone/60">
              * Note: Custom Bat Builder bespoke orders undergo raw cleft profiling, spine carving, balancing, and binding which requires an additional <strong>3 to 5 business days</strong> of master bat-maker crafting prior to dispatch. Transit times are indicative estimates from carrier dispatch and exclude customs clearance or remote-area transit delays.
            </p>
          </section>

          {/* 2. Cancellation Policy */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Clock className="w-5 h-5 text-willow" /> 2. Order Cancellation Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-2">
                <span className="text-willow font-bold uppercase block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Standard Catalog Gear
                </span>
                <p className="text-bone/70 font-sans text-xs leading-relaxed">
                  You may cancel standard stock orders free of charge at any time <strong>prior to warehouse dispatch</strong>. Once the shipment has been handed over to the courier partner and a tracking AWB is generated, the order cannot be cancelled in transit, but can be returned upon delivery under our 30-day return policy.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-2">
                <span className="text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Custom Bat Lab Orders
                </span>
                <p className="text-bone/70 font-sans text-xs leading-relaxed">
                  Bespoke bats crafted through our Custom Bat Builder may be cancelled within <strong>12 hours</strong> of order placement. After 12 hours, raw cleft cutting, weight balance shaving, and laser personalization begin and the order can no longer be cancelled.
                </p>
              </div>
            </div>

            <p className="text-xs text-bone/70">
              To cancel an order, navigate to your <strong>Account &gt; Orders</strong> dashboard or email <a href="mailto:support@pitchcricket.com" className="text-willow hover:underline font-mono">support@pitchcricket.com</a> with your Order ID.
            </p>
          </section>

          {/* 3. Return & Replacement Policy */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <RefreshCw className="w-5 h-5 text-willow" /> 3. Returns &amp; Replacement Guidelines
            </h2>
            <p>
              We want you to feel complete confidence in your cricket gear. We accept returns and size exchanges under the following clear conditions:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1.5">
                <span className="text-willow font-bold uppercase block">A. 30-Day Change-of-Mind Return Window</span>
                <p className="text-bone/70 font-sans text-xs leading-relaxed">
                  You have 30 calendar days from the date of delivery to return standard items for a full refund or size replacement. The product must be brand new, unknocked, unplayed, with all factory labels, holographic tags, and original protective cases intact.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1.5">
                <span className="text-willow font-bold uppercase block">B. Damaged, Defective, or Incorrect Deliveries</span>
                <p className="text-bone/70 font-sans text-xs leading-relaxed">
                  If an item arrives damaged, materially defective, or does not match your order, notify us within <strong>48 hours</strong> of delivery with clear photographs or an unboxing video. We will arrange a free reverse pickup and dispatch an immediate priority replacement or full refund including all shipping costs.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-red-500/20 space-y-1.5">
                <span className="text-red-400 font-bold uppercase block flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> C. Non-Returnable Items
                </span>
                <ul className="list-disc pl-5 font-sans text-xs text-bone/70 space-y-1">
                  <li>Custom-engraved bats or personalized cleft orders tailored to bespoke customer dimensions (except in cases of manufacturing defect).</li>
                  <li>Personal protective equipment (abdominal guards, inner groin protectors, athletic supporters) once the hygienic packaging seal has been broken.</li>
                  <li>Cricket bats that have been oiled, knocked-in, or used in net sessions or match play.</li>
                  <li>Items returned without original packaging, barcode tags, or accessories.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Refund Processing & Timelines */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <ShieldCheck className="w-5 h-5 text-willow" /> 4. Refund Timelines &amp; Settlement
            </h2>
            <div className="p-5 rounded bg-carbonRaised border border-bone/10 space-y-3 text-xs leading-relaxed">
              <p>
                Refunds are processed promptly upon receipt and quality inspection of the returned merchandise at our fulfillment center:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-bone/70 font-mono">
                <li><strong>Quality Inspection:</strong> 1 to 2 business days after the return package is delivered to our warehouse.</li>
                <li><strong>Refund Authorization:</strong> Automatically initiated immediately upon inspection approval.</li>
                <li><strong>Settlement Timeline:</strong> <strong>5 to 7 business days</strong> to reflect in your original payment method (Bank Account, UPI ID, or Credit/Debit Card) in alignment with standard commercial practice and the Consumer Protection (E-Commerce) Rules, 2020.</li>
                <li><strong>Cash on Delivery (COD) Returns:</strong> Refunded via direct NEFT / IMPS bank transfer or UPI ID upon receipt of customer bank details.</li>
              </ul>
              <div className="p-3 rounded bg-carbon border border-bone/10 text-[11px] text-bone/60 font-mono">
                * Note on Demonstration Sandbox: In sandbox demo mode, transactions simulate the complete payment and refund lifecycle. No real bank debits or credits occur.
              </div>
            </div>
          </section>

          {/* 5. How to Initiate a Return */}
          <section className="p-6 rounded bg-carbonRaised border border-bone/15 space-y-3 font-mono text-xs">
            <h3 className="font-display text-base font-bold uppercase text-bone">How to Initiate a Return or Exchange</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-bone/70 font-sans">
              <li>Log in to your account and locate the order under <strong>Order History</strong>, or email <a href="mailto:support@pitchcricket.com" className="text-willow hover:underline font-mono">support@pitchcricket.com</a> with your Order ID.</li>
              <li>Specify the reason for return and whether you prefer an exchange or refund. Attach photo evidence if the item arrived damaged.</li>
              <li>Our logistics team will schedule a doorstep reverse pickup via BlueDart or Delhivery. Securely pack the item in its original box with all protective foams and tags.</li>
              <li>Track your return package online. Once received and inspected, your refund or replacement tracking number will be sent to your email.</li>
            </ol>
            <div className="pt-2">
              <p className="text-[11px] text-bone/50 font-mono">
                Need escalation? Visit our <button onClick={() => navigateTo('grievance-redressal')} className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer">Grievance Redressal Portal</button> for formal resolution.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};
