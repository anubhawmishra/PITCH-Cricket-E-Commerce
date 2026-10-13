import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, Mail, Clock, MapPin, Phone, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const GrievanceRedressalPage = () => {
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
              Consumer Protection &amp; Governance
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-bone">
              Grievance Redressal
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-2xl mx-auto leading-relaxed">
              Statutory grievance redressal mechanism established pursuant to Rule 4(4) and Rule 5(3)(e) of the Consumer Protection (E-Commerce) Rules, 2020 and Section 13 of the Digital Personal Data Protection Act, 2023.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-bone/40 bg-carbon px-3 py-1.5 rounded border border-bone/10">
              <span>Statutory Compliance: Rule 4(4) CP(EC) Rules 2020</span>
              <span>·</span>
              <span>Effective Date: 11 October 2026</span>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12 space-y-12 font-sans text-sm text-bone/80 leading-relaxed">

          {/* Statutory Mandate Note */}
          <div className="p-5 rounded bg-carbonRaised border-l-4 border-willow border border-bone/10 space-y-2">
            <div className="flex items-center gap-2 text-willow font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Mandatory Statutory Redressal Timelines</span>
            </div>
            <p className="text-xs text-bone/70 leading-relaxed">
              Under Rule 4(4) of the Consumer Protection (E-Commerce) Rules, 2020, our Grievance Officer will acknowledge receipt of any consumer complaint within <strong>48 hours</strong> and resolve the grievance within <strong>one month (30 calendar days)</strong> from the date of receipt.
            </p>
          </div>

          {/* Grievance Officer Card */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <FileText className="w-5 h-5 text-willow" /> Designated Grievance Officer Details
            </h2>
            <p className="text-xs text-bone/70">
              Consumers and Data Principals may direct formal escalations, consumer disputes, or personal data rights requests to:
            </p>

            <div className="p-6 rounded-lg bg-carbonRaised border border-bone/15 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block">Officer Name</span>
                  <p className="text-bone font-bold text-sm">[Owner Confirmation Required: Designated Officer Name]</p>
                </div>

                <div className="space-y-1">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block">Designation</span>
                  <p className="text-bone font-bold text-sm">Grievance &amp; Compliance Officer</p>
                </div>

                <div className="space-y-1">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-willow" /> Official Grievance Email
                  </span>
                  <a href="mailto:grievance@pitchcricket.com" className="text-willow hover:underline font-bold text-sm block">
                    grievance@pitchcricket.com
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-willow" /> Direct Telephone
                  </span>
                  <p className="text-bone font-bold text-sm">[Owner Confirmation Required: +91-XXXXXXXXXX]</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-willow" /> Physical Postal Address
                  </span>
                  <p className="text-bone/80 font-sans text-xs">
                    [Owner Confirmation Required: Principal Business Address / Registered Office, City, State, Pincode, India]
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="text-bone/40 uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-willow" /> Working Hours
                  </span>
                  <p className="text-bone/80 font-sans text-xs">
                    Monday to Friday: 10:00 AM – 6:00 PM IST (Excluding National &amp; Public Holidays)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3-Tier Escalation Process */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-bone flex items-center gap-2 border-b border-bone/10 pb-2">
              <CheckCircle2 className="w-5 h-5 text-willow" /> Grievance Escalation Process
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded bg-carbonRaised border border-bone/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold text-willow uppercase tracking-wider">Level 1: Front-Line Customer Support</h3>
                  <span className="font-mono text-[10px] text-bone/40 bg-carbon px-2 py-0.5 rounded">Typical Turnaround: 24 Hours</span>
                </div>
                <p className="text-xs text-bone/70 leading-relaxed font-sans">
                  For regular inquiries, shipping updates, sizing questions, or initial return requests, please write to our support desk at <a href="mailto:support@pitchcricket.com" className="text-willow hover:underline">support@pitchcricket.com</a> with your Order ID. Over 95% of issues are resolved immediately at this stage.
                </p>
              </div>

              <div className="p-5 rounded bg-carbonRaised border border-bone/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold text-willow uppercase tracking-wider">Level 2: Formal Grievance Escalation</h3>
                  <span className="font-mono text-[10px] text-bone/40 bg-carbon px-2 py-0.5 rounded">Acknowledgment: 48h · Resolution: &le; 30 Days</span>
                </div>
                <p className="text-xs text-bone/70 leading-relaxed font-sans">
                  If your issue remains unresolved after 48 hours, or if you are dissatisfied with the Level 1 resolution, forward your complaint with your Ticket/Order ID to <a href="mailto:grievance@pitchcricket.com" className="text-willow hover:underline">grievance@pitchcricket.com</a>. You will receive an official acknowledgment and unique grievance tracking reference within 48 hours.
                </p>
              </div>

              <div className="p-5 rounded bg-carbonRaised border border-bone/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold text-willow uppercase tracking-wider">Level 3: Regulatory &amp; External Remedies</h3>
                  <span className="font-mono text-[10px] text-bone/40 bg-carbon px-2 py-0.5 rounded">Statutory Right</span>
                </div>
                <p className="text-xs text-bone/70 leading-relaxed font-sans">
                  If your grievance is not resolved satisfactorily within 30 calendar days, you retain the statutory right to escalate through official Indian governmental consumer avenues:
                </p>
                <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-bone/70">
                  <li><strong>National Consumer Helpline (NCH):</strong> Dial toll-free <code>1915</code> or register at <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="text-willow hover:underline">consumerhelpline.gov.in</a>.</li>
                  <li><strong>E-Daakhil Portal:</strong> File electronic consumer disputes at <a href="https://edaakhil.nic.in" target="_blank" rel="noopener noreferrer" className="text-willow hover:underline">edaakhil.nic.in</a>.</li>
                  <li><strong>Data Protection Board of India:</strong> For personal data breaches or DPDP non-compliance (upon formal notification and constitution by the Central Government).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Useful Cross-Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => navigateTo('shipping-returns')}
              className="p-4 rounded bg-carbonRaised border border-bone/10 hover:border-willow/40 transition-colors text-left group cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-bone/40 uppercase block">Review Policies</span>
                <span className="font-display text-sm font-bold text-bone group-hover:text-willow transition-colors">Shipping, Delivery &amp; Returns</span>
              </div>
              <ArrowRight className="w-4 h-4 text-bone/40 group-hover:text-willow transition-colors" />
            </button>

            <button
              onClick={() => navigateTo('privacy-policy')}
              className="p-4 rounded bg-carbonRaised border border-bone/10 hover:border-willow/40 transition-colors text-left group cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-bone/40 uppercase block">Privacy &amp; DPDP</span>
                <span className="font-display text-sm font-bold text-bone group-hover:text-willow transition-colors">Privacy Policy &amp; Data Rights</span>
              </div>
              <ArrowRight className="w-4 h-4 text-bone/40 group-hover:text-willow transition-colors" />
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
