import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Zap, AlertTriangle } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, authMode, setAuthMode, setIsAuthModalOpen, login, register } = useAuth();
  const { navigateTo } = useStore();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const isLogin = authMode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          setIsLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password, formData.phone);
      }
      setFormData({ name: '', email: '', password: '', phone: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const update = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-carbon/90 backdrop-blur-md modal-backdrop"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-carbonRaised border border-bone/10 rounded-sm shadow-2xl z-10 modal-enter">
        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="cursor-hover absolute top-4 right-4 p-2 text-bone/40 hover:text-willow transition-colors bg-transparent border-none rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded bg-willow/10 border border-willow/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-willow" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-bone">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="font-mono text-[9px] text-bone/40 uppercase tracking-widest">PITCH™ Cricket Lab</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-950/40 border border-red-900/30 rounded px-3 py-2.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <p className="font-mono text-[10px] text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Field icon={<User className="w-3.5 h-3.5" />} label="Full Name">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={update('name')}
                  placeholder="Your full name"
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-bone placeholder-bone/30 font-sans"
                />
              </Field>
            )}

            <Field icon={<Mail className="w-3.5 h-3.5" />} label="Email">
              <input
                type="email"
                required
                value={formData.email}
                onChange={update('email')}
                placeholder="your@email.com"
                className="w-full bg-transparent border-none focus:outline-none text-sm text-bone placeholder-bone/30 font-sans"
                autoComplete="email"
              />
            </Field>

            <Field icon={<Lock className="w-3.5 h-3.5" />} label="Password" action={
              <button type="button" onClick={() => setShowPassword(s => !s)} className="text-bone/30 hover:text-bone transition-colors bg-transparent border-none p-0">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            }>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={update('password')}
                placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
                className="w-full bg-transparent border-none focus:outline-none text-sm text-bone placeholder-bone/30 font-sans"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </Field>

            {!isLogin && (
              <Field icon={<Phone className="w-3.5 h-3.5" />} label="Phone (optional)">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={update('phone')}
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-bone placeholder-bone/30 font-sans"
                />
              </Field>
            )}

            {!isLogin && (
              <div className="pt-2 text-[10px] font-mono text-bone/50 leading-relaxed">
                By creating an account, you consent to our{' '}
                <button
                  type="button"
                  onClick={() => { setIsAuthModalOpen(false); navigateTo('privacy-policy'); }}
                  className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline"
                >
                  Privacy Policy
                </button>
                {' '}and agree to our{' '}
                <button
                  type="button"
                  onClick={() => { setIsAuthModalOpen(false); navigateTo('terms'); }}
                  className="text-willow hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline"
                >
                  Terms &amp; Conditions
                </button>
                .
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-hover w-full py-4 bg-willow text-bone font-mono text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors border-none flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border border-bone/40 border-t-bone rounded-full animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In to Pitch Lab' : 'Create Pitch Lab Account'
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center font-mono text-[10px] text-bone/40 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setAuthMode(isLogin ? 'register' : 'login'); setError(''); }}
              className="text-willow hover:text-bone transition-colors bg-transparent border-none p-0 cursor-pointer font-bold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

          {/* Benefits */}
          {!isLogin && (
            <div className="mt-6 pt-5 border-t border-bone/[0.07] space-y-2">
              <p className="font-mono text-[8px] uppercase tracking-widest text-bone/30 mb-3">Benefits of your Pitch account</p>
              {['Order tracking & history', 'Wishlist synced across devices', 'Faster checkout with saved addresses', 'Early access to new arrivals'].map(b => (
                <div key={b} className="flex items-center gap-2 font-mono text-[9px] text-bone/50">
                  <span className="w-1 h-1 rounded-full bg-willow flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ icon, label, children, action }) => (
  <div>
    <label className="block font-mono text-[9px] uppercase tracking-widest text-bone/40 mb-1.5">{label}</label>
    <div className="flex items-center gap-2.5 bg-carbon border border-bone/10 rounded-sm px-3.5 py-3 focus-within:border-willow/50 transition-colors">
      <span className="text-bone/30 flex-shrink-0">{icon}</span>
      {children}
      {action && <span className="flex-shrink-0">{action}</span>}
    </div>
  </div>
);
