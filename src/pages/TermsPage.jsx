import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FileText, ShieldAlert, Award, Scale, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TermsPage = () => {
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
              User Agreement &amp; Operating Rules
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-bone">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-2xl mx-auto leading-relaxed">
              These terms govern your access to and purchase of cricket equipment on PITCH™, in accordance with the Consumer Protection Act, 2019, the Consumer Protection (E-Commerce) Rules, 2020, and the Indian Contract Act, 1872.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-bone/40 bg-carbon px-3 py-1.5 rounded border border-bone/10">
              <span>Last Updated: October 2026</span>
              <span>·</span>
              <span>Effective Date: 11 October 2026</span>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12 space-y-12 font-sans text-sm text-bone/80 leading-relaxed">

          {/* Sandbox Disclosure */}
          <div className="p-5 rounded bg-carbonRaised border-l-4 border-amber-500 border border-bone/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Platform Operating Status — Sandbox &amp; Demonstration Mode</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              PITCH™ is currently deployed in a demonstration and portfolio environment. The checkout portal supports test payment flows (UPI, mock cards, net banking). No real monetary charges will be debited during test orders unless explicitly switched to production gateway mode.
            </p>
          </div>

          {/* 1. Acceptance & Eligibility */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Scale className="w-5 h-5 text-willow" /> 1. Acceptance of Terms &amp; Eligibility
            </h2>
            <p>
              By accessing this website, registering an account, or purchasing cricket equipment from PITCH™, you enter into a legally binding agreement governed by these Terms and Conditions.
            </p>
            <p className="text-xs text-bone/70">
              You must be at least 18 years of age or possess the legal consent of a parent or guardian to enter into transactions on this platform under the Indian Contract Act, 1872.
            </p>
          </section>

          {/* 2. Account Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <CheckCircle className="w-5 h-5 text-willow" /> 2. User Accounts &amp; Security
            </h2>
            <p>
              When creating an account, you agree to provide truthful, accurate, and current information. You are solely responsible for safeguarding your login credentials. If you suspect unauthorized access to your account, you must immediately notify our support team.
            </p>
          </section>

          {/* 3. Product Catalog & Natural Willow Specifications */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Award className="w-5 h-5 text-willow" /> 3. Cricket Equipment &amp; Natural Willow Characteristics
            </h2>
            <p>
              Cricket bats crafted from Grade 1+ English Willow and Kashmir Willow are manufactured from natural timber. Consequently:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li><strong>Grain Variation:</strong> Natural wood features grain curvature, minor pin marks, and colour shading. Such variations are intrinsic proof of genuine cleft wood and are not manufacturing defects.</li>
              <li><strong>Weight Tolerance:</strong> Willow is hygroscopic (absorbs and releases moisture based on humidity). Bat weights are stated with a normal manufacturing tolerance of ±15–25 grams.</li>
              <li><strong>Knocking-in &amp; Preparation:</strong> Unpressed or factory-knocked bats require appropriate hand knocking-in with a mallet and oiling prior to match play against high-velocity leather balls. Premature usage without proper knocking voids warranty protection.</li>
            </ul>
          </section>

          {/* 4. Custom Bat Builder / Personalized Orders */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <FileText className="w-5 h-5 text-willow" /> 4. Custom Bat Configurator Orders
            </h2>
            <p>
              Orders configured through our 5-step Custom Bat Builder represent bespoke, made-to-order sporting goods:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li><strong>Order Confirmation:</strong> Custom specifications (cleft selection, spine height, edge thickness, handle shape, laser engraving) are final once production begins.</li>
              <li><strong>Cancellation Window:</strong> You may cancel a custom bat order within 12 hours of placement. After 12 hours, raw cleft preparation commences and cancellation cannot be accepted.</li>
              <li><strong>Non-Returnable for Change of Mind:</strong> Under the Consumer Protection (E-Commerce) Rules, 2020, custom-engraved or personalized goods cannot be returned for change of mind, though warranty for manufacturing defects remains intact.</li>
            </ul>
          </section>

          {/* 5. Pricing, Taxes & Payment */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Scale className="w-5 h-5 text-willow" /> 5. Pricing &amp; Payment Terms
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li>All prices are displayed in Indian Rupees (INR ₹) and are inclusive of applicable Goods and Services Tax (GST) unless explicitly itemized otherwise.</li>
              <li>Shipping charges, if applicable, are calculated and clearly shown during checkout before payment authorization.</li>
              <li>We reserve the right to cancel orders arising from typographical or technical pricing errors, with prompt and full refund of any sums debited.</li>
            </ul>
          </section>

          {/* 6. Shipping & Delivery */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <CheckCircle className="w-5 h-5 text-willow" /> 6. Shipping, Title &amp; Delivery
            </h2>
            <p>
              Orders are dispatched via insured courier partners. Delivery estimates (typically 2–4 business days for domestic metro centers) are indicative. Title and risk of loss pass to the customer upon delivery to the confirmed shipping address. Please review our <button onClick={() => navigateTo('shipping-returns')} className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer">Shipping &amp; Returns Policy</button> for comprehensive shipping terms.
            </p>
          </section>

          {/* 7. Warranty & Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <ShieldAlert className="w-5 h-5 text-willow" /> 7. Equipment Warranty &amp; Limitations
            </h2>
            <p>
              Our cricket equipment is engineered for athletic performance. Warranty terms are subject to standard sporting equipment conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li>English Willow bats carry a 6-month limited warranty covering handle breakage and structural delamination arising strictly from manufacturing defects.</li>
              <li>Normal surface wear, surface cracks from hard seam impact, moisture damage, edge damage from mistimed yorkers, and damage resulting from composite ball usage are excluded from warranty.</li>
              <li>PITCH™'s total liability shall not exceed the purchase price paid for the specific item in dispute.</li>
            </ul>
          </section>

          {/* 8. Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <FileText className="w-5 h-5 text-willow" /> 8. Intellectual Property
            </h2>
            <p>
              All trademarks, product designs, graphics, UI interfaces, sound designs, and software code on PITCH™ are the intellectual property of Anubhaw Mishra / PITCH™ Cricket and are protected under Indian and international copyright and trademark laws.
            </p>
          </section>

          {/* 9. Governing Law & Dispute Resolution */}
          <section className="space-y-3 p-6 rounded bg-carbonRaised border border-bone/15">
            <h2 className="text-lg font-display font-bold uppercase tracking-wider text-bone">
              9. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-xs text-bone/70 leading-relaxed">
              These Terms and any dispute arising out of or related to this platform shall be governed by the laws of India. Subject to applicable consumer protection legislation, courts in [Owner Confirmation Required: City / State, India] shall have exclusive jurisdiction.
            </p>
            <div className="pt-2 text-xs font-mono text-bone/60">
              Consumer Grievances: Contact our <button onClick={() => navigateTo('grievance-redressal')} className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer">Grievance Redressal Officer</button> for formal resolution.
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
