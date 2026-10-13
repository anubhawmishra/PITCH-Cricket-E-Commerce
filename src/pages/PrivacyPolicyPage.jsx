import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Shield, Lock, Eye, Database, Cpu, UserCheck, AlertCircle, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PrivacyPolicyPage = () => {
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
              Legal &amp; Data Governance
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-bone">
              Privacy Policy
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy outlines how PITCH™ collects, processes, stores, and protects personal data, aligned with the principles of the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and applicable Indian data protection frameworks. This documentation is provided for operational transparency and technical readiness, and does not constitute formal legal certification.
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
          {/* Statutory Notice */}
          <div className="p-5 rounded bg-carbonRaised border-l-4 border-willow border border-bone/10 space-y-2">
            <div className="flex items-center gap-2 text-willow font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Notice to Users in India</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              This policy constitutes a notice under Section 5 of the Digital Personal Data Protection Act, 2023. By accessing or using the PITCH™ cricket equipment platform, you acknowledge the processing of personal data for the specific purposes specified herein.
            </p>
          </div>

          {/* 1. Data Fiduciary Identity */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Shield className="w-5 h-5 text-willow" /> 1. Data Fiduciary &amp; Entity Information
            </h2>
            <p>
              The platform is operated by the entity identified below (the <strong>"Data Fiduciary"</strong> under the DPDP Act, 2023):
            </p>
            <div className="p-4 rounded bg-carbonRaised border border-bone/10 font-mono text-xs space-y-1.5 text-bone/70">
              <p><span className="text-bone/40 uppercase">Platform Name:</span> PITCH™ Cricket E-Commerce Platform</p>
              <p><span className="text-bone/40 uppercase">Legal Entity:</span> [Owner Confirmation Required: Registered Business Entity Name]</p>
              <p><span className="text-bone/40 uppercase">Registered Office:</span> [Owner Confirmation Required: Principal Business Address in India]</p>
              <p><span className="text-bone/40 uppercase">Contact Email:</span> <a href="mailto:support@pitchcricket.com" className="text-willow hover:underline">support@pitchcricket.com</a></p>
              <p><span className="text-bone/40 uppercase">Grievance Portal:</span> <button onClick={() => navigateTo('grievance-redressal')} className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer">View Grievance Officer Details</button></p>
            </div>
          </section>

          {/* 2. Personal Data We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Database className="w-5 h-5 text-willow" /> 2. Personal Data We Collect
            </h2>
            <p>
              We practice strict data minimization. We only collect personal data genuinely required to operate our cricket equipment marketplace, process orders, and provide customer support:
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-willow font-bold uppercase block">A. Account &amp; Authentication Data</span>
                <p className="text-bone/70 font-sans">
                  When you register an account, we collect your <strong>Full Name</strong>, <strong>Email Address</strong>, an encrypted <strong>Password Hash</strong> (processed using one-way bcrypt hashing with cost factor 12; raw passwords are never stored or logged), and optional <strong>Telephone Number</strong>.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-willow font-bold uppercase block">B. Shipping &amp; Transaction Details</span>
                <p className="text-bone/70 font-sans">
                  When placing an order, we collect delivery coordinates including your <strong>Delivery Name</strong>, <strong>Delivery Address</strong> (Street, City, State, Pincode), <strong>Recipient Telephone Number</strong>, ordered gear items, prices, and order reference numbers.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-willow font-bold uppercase block">C. Technical &amp; Functional Storage (No Advertising Cookies)</span>
                <p className="text-bone/70 font-sans">
                  We use browser local storage strictly for essential functional operations: <code>pitch_token</code> (maintaining your authenticated session) and <code>pitch_willow_cart</code> (preserving your active shopping bag across visits). We do <strong>not</strong> deploy third-party advertising, profiling, or cross-site tracking cookies.
                </p>
              </div>

              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-willow font-bold uppercase block">D. AI Cricket Advisor Interactions (FRIDAY)</span>
                <p className="text-bone/70 font-sans">
                  When you interact with FRIDAY, our AI shopping assistant, your query message and non-personal equipment context (currently viewed bat specs, comparison items, cart product names) are processed to provide equipment guidance. We do not transmit passwords, card details, or banking information to the AI model.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Sensitive Financial Data Exclusion */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Lock className="w-5 h-5 text-willow" /> 3. Payment Data &amp; Financial Security
            </h2>
            <p>
              PITCH™ does <strong>not</strong> collect, process, or store sensitive payment credentials on our servers.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li>We never store credit card numbers, debit card numbers, CVV codes, net banking passwords, or UPI PINs.</li>
              <li>Live transactions are processed through RBI-authorized payment aggregators (Razorpay) adhering to PCI-DSS Level 1 compliance and RBI Tokenization Guidelines.</li>
              <li>When the platform operates in demonstration or sandbox mode, all payment options are simulated test flows and no financial charge occurs.</li>
            </ul>
          </section>

          {/* 4. Purpose of Processing */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Eye className="w-5 h-5 text-willow" /> 4. Purposes of Processing
            </h2>
            <p>We process your personal data solely for legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li><strong>Account Administration:</strong> Creating, securing, and managing your customer account.</li>
              <li><strong>Order Fulfillment:</strong> Processing custom bat specifications, packing, dispatching, and tracking shipments.</li>
              <li><strong>Customer Support:</strong> Responding to equipment queries, warranty requests, and order assistance.</li>
              <li><strong>Equipment Advisory:</strong> Providing cricket gear recommendations through our FRIDAY assistant.</li>
              <li><strong>Statutory Compliance:</strong> Maintaining accounting, invoice, and tax records as required by Indian law (including the Central Goods and Services Tax Act, 2017, the Companies Act, 2013, and the Income-tax Act, 1961).</li>
            </ul>
          </section>

          {/* 5. Sub-Processors & Data Sharing */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <Cpu className="w-5 h-5 text-willow" /> 5. Third-Party Sub-Processors
            </h2>
            <p>
              We share personal data only with trusted infrastructure and technical service providers who process data strictly under contractual confidentiality:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs border border-bone/10">
                <thead>
                  <tr className="bg-carbonRaised text-willow border-b border-bone/10">
                    <th className="py-2.5 px-3">Service Provider</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Data Processed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone/10 text-bone/70">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-bone">Neon Inc.</td>
                    <td className="py-2.5 px-3">Managed Serverless PostgreSQL Database</td>
                    <td className="py-2.5 px-3">Encrypted account, address, and order records</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-bone">Render Services Inc.</td>
                    <td className="py-2.5 px-3">Backend API Hosting</td>
                    <td className="py-2.5 px-3">API requests, authentication tokens</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-bone">Vercel Inc.</td>
                    <td className="py-2.5 px-3">Frontend Edge Hosting</td>
                    <td className="py-2.5 px-3">Static web delivery &amp; client-side routing</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-bone">Razorpay Software Pvt. Ltd.</td>
                    <td className="py-2.5 px-3">Payment Aggregation</td>
                    <td className="py-2.5 px-3">Order IDs, transaction amounts, payment status</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-bone">Google LLC</td>
                    <td className="py-2.5 px-3">Generative AI (Gemini Flash API)</td>
                    <td className="py-2.5 px-3">Chat messages and gear specification queries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Rights of the Data Principal */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <UserCheck className="w-5 h-5 text-willow" /> 6. Rights of the Data Principal (Your Rights)
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023, you enjoy statutory rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-bone font-bold uppercase block">Right to Access Summary</span>
                <p className="text-bone/60 font-sans text-xs">
                  Request a summary of personal data being processed and the processing activities undertaken.
                </p>
              </div>
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-bone font-bold uppercase block">Right to Correction &amp; Update</span>
                <p className="text-bone/60 font-sans text-xs">
                  Correct inaccurate, misleading, or outdated personal data through your account dashboard or by contacting us.
                </p>
              </div>
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-bone font-bold uppercase block">Right to Erasure (Deletion)</span>
                <p className="text-bone/60 font-sans text-xs">
                  Request erasure of your personal data when it is no longer required for the purpose for which it was collected, subject to statutory retention obligations.
                </p>
              </div>
              <div className="p-4 rounded bg-carbonRaised border border-bone/10 space-y-1">
                <span className="text-bone font-bold uppercase block">Right to Grievance Redressal</span>
                <p className="text-bone/60 font-sans text-xs">
                  Readily accessible grievance redressal regarding any act or omission regarding your personal data.
                </p>
              </div>
            </div>
            <p className="text-xs text-bone/60">
              To exercise any of these rights, contact our Grievance Officer at <a href="mailto:grievance@pitchcricket.com" className="text-willow hover:underline">grievance@pitchcricket.com</a> or use the Account deletion feature in your client profile.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <FileText className="w-5 h-5 text-willow" /> 7. Data Retention Policy
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected or to comply with statutory legal requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-bone/70 text-xs">
              <li><strong>Active Accounts:</strong> Retained while your account remains active. You may request account deletion at any time.</li>
              <li><strong>Order &amp; Invoicing Records:</strong> Retained as required under applicable Indian statutory laws, including Section 36 of the Central Goods and Services Tax Act, 2017 (mandating retention of accounts and records for 72 months from the annual return due date), Section 128(5) of the Companies Act, 2013 (mandating retention of books of account and vouchers for 8 financial years for incorporated companies), and Section 44AA of the Income-tax Act, 1961. Non-statutory personal data is anonymized upon erasure requests.</li>
              <li><strong>Inquiry Records:</strong> Customer care inquiries are retained for up to 180 days after resolution.</li>
            </ul>
          </section>

          {/* 8. Contact & Grievance */}
          <section className="space-y-3 p-6 rounded bg-carbonRaised border border-bone/15">
            <h2 className="text-lg font-display font-bold uppercase tracking-wider text-bone">
              8. Contact &amp; Grievance Officer
            </h2>
            <p className="text-xs text-bone/70 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our designated Grievance Officer:
            </p>
            <div className="font-mono text-xs text-bone/80 space-y-1 pt-2">
              <p><strong>Designation:</strong> Grievance Officer, PITCH™ Cricket</p>
              <p><strong>Email:</strong> <a href="mailto:grievance@pitchcricket.com" className="text-willow hover:underline">grievance@pitchcricket.com</a></p>
              <p><strong>Response Timeline:</strong> Acknowledged within 48 hours; resolved within 30 days.</p>
              <p><strong>Detailed Redressal Procedure:</strong> <button onClick={() => navigateTo('grievance-redressal')} className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer">Visit Grievance Redressal Portal</button></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
