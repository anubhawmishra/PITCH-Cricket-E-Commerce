import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactPage = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Bat Selection Query', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    showToast('Message sent! Our cricket gear team will respond within 2 hours.');
    setFormData({ name: '', email: '', subject: 'Bat Selection Query', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[1700px] mx-auto bg-carbon relative">
      <Header />

      <main className="flex-grow pb-24">
        {/* Banner */}
        <section className="border-b border-[var(--carbon-line)] bg-carbonRaised py-16 px-6 lg:px-12 noise-dark">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="font-mono text-[10px] text-willow uppercase tracking-[0.3em] block">
              24/7 Cricket Support Team
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase text-bone tracking-tight">
              Contact Us
            </h1>
            <p className="text-sm font-light text-bone/60 max-w-xl mx-auto leading-relaxed">
              Need help choosing the right bat weight or tracking an order? Get in touch with our team of master bat makers and gear specialists.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded bg-carbonRaised border border-bone/15 space-y-6">
              <h3 className="font-display text-lg font-bold uppercase text-bone border-b border-bone/10 pb-3">
                Customer Support Info
              </h3>

              <div className="space-y-4 font-mono text-xs text-bone/80">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-willow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-bone/40 block uppercase">Email Support</span>
                    <a href="mailto:support@pitchcricket.com" className="text-bone hover:text-willow font-bold">support@pitchcricket.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-willow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-bone/40 block uppercase">WhatsApp &amp; Phone Line</span>
                    <span className="text-bone font-bold">+91 98765 43210 / +44 20 7946 0912</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-willow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-bone/40 block uppercase">Workshop &amp; Showroom</span>
                    <span className="text-bone/70 block">Pitch Willow Lab, Industrial Estate, Norfolk, UK &amp; Mumbai, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-willow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-bone/40 block uppercase">Operating Hours</span>
                    <span className="text-bone/70 block">Mon - Sat: 9:00 AM - 8:00 PM (IST / GMT)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded bg-carbonRaised border border-bone/15 space-y-6">
              <h3 className="font-display text-lg font-bold uppercase text-bone border-b border-bone/10 pb-3">
                Send Us A Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-bone/60 uppercase mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-4 py-3 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-bone/60 uppercase mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-4 py-3 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-bone/60 uppercase mb-1.5">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-carbon border border-bone/20 rounded px-4 py-3 text-xs font-mono text-bone focus:border-willow focus:outline-none cursor-pointer"
                >
                  <option value="Bat Selection Query">Bat Weight &amp; Selection Query</option>
                  <option value="Order Tracking">Order Tracking &amp; Delivery</option>
                  <option value="Custom Bat Builder">Custom Bat Configurator</option>
                  <option value="Warranty & Returns">Warranty &amp; Returns</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-bone/60 uppercase mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help you choose or customize your cricket gear?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-carbon border border-bone/20 rounded px-4 py-3 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="cursor-hover w-full py-4 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
