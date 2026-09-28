import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import {
  X,
  CheckCircle,
  Shield,
  CreditCard,
  Truck,
  Smartphone,
  Building2,
  Lock,
  Zap,
  AlertTriangle,
  RefreshCw,
  QrCode,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export const CheckoutModal = () => {
  const { cart, subtotalPrice, clearCart } = useCart();
  const { isCheckoutOpen, setIsCheckoutOpen } = useStore();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Gateway Processing, 4: Confirmation
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi', // upi, card, netbanking, cod
  });

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const [cardData, setCardData] = useState({
    number: '4242 4242 4242 4242',
    name: 'TEST CRICKETER',
    expiry: '12/28',
    cvv: '888',
  });

  // UPI sandbox state
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [otp, setOtp] = useState('123456');
  const [processingState, setProcessingState] = useState(''); // 'authorizing', 'verifying_otp', 'success'
  const [orderRef, setOrderRef] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Start Sandbox Gateway Processing
      setStep(3);
      setProcessingState('authorizing');
      const genTxn = `TXN_TEST_${Math.floor(10000000 + Math.random() * 90000000)}`;
      const genOrder = `LAB-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnRef(genTxn);
      setOrderRef(genOrder);

      // Simulate 3D Secure / UPI Authorization pipeline
      setTimeout(() => {
        setProcessingState('verifying_otp');
      }, 1200);

      setTimeout(() => {
        setProcessingState('success');
        clearCart();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          setStep(4);
        }, 1000);
      }, 2600);
    }
  };

  const handleAutoFillTestCard = (type) => {
    if (type === 'visa') {
      setCardData({
        number: '4242 4242 4242 4242',
        name: 'TEST CRICKETER',
        expiry: '12/28',
        cvv: '888',
      });
    } else if (type === 'mastercard') {
      setCardData({
        number: '5555 5555 5555 4444',
        name: 'TEST CRICKETER',
        expiry: '08/29',
        cvv: '999',
      });
    } else if (type === 'rupay') {
      setCardData({
        number: '6070 1234 5678 9012',
        name: 'PRO BATSMAN',
        expiry: '10/30',
        cvv: '123',
      });
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setProcessingState('');
  };

  const copyUpiHandle = () => {
    navigator.clipboard.writeText('pitchlab@razorpay');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-carbon/90 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-carbonRaised border border-[var(--carbon-line)] text-bone rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        
        {/* Sandbox Test Mode Notification Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sandbox Test Gateway Active — No Real Money Deducted</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
            Test Mode
          </span>
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--carbon-line)] flex items-center justify-between bg-carbon">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-willow animate-pulse" />
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider">
                Pitch Lab Dispatch Checkout
              </h2>
              <p className="font-mono text-[9px] text-bone/50 uppercase tracking-widest">
                {step === 1 && 'Step 1 of 3 — Shipping Address'}
                {step === 2 && 'Step 2 of 3 — Sandbox Payment Gateway'}
                {step === 3 && 'Payment Gateway Processing...'}
                {step === 4 && 'Order Confirmed'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-bone/50 hover:text-willow transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-willow flex items-center gap-2">
                <Truck className="w-4 h-4" /> 1. Dispatch & Contact Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-3 py-2.5 text-xs text-bone focus:border-willow focus:outline-none font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-3 py-2.5 text-xs text-bone focus:border-willow focus:outline-none font-sans"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                    Delivery Address
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-3 py-2.5 text-xs text-bone focus:border-willow focus:outline-none font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-3 py-2.5 text-xs text-bone focus:border-willow focus:outline-none font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                    Pincode
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-carbon border border-bone/20 rounded px-3 py-2.5 text-xs text-bone focus:border-willow focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-bone/10 flex justify-between items-center">
                <span className="font-mono text-xs text-bone/60">
                  Subtotal: <strong className="text-bone">₹{subtotalPrice.toLocaleString('en-IN')}</strong>
                </span>
                <button
                  type="submit"
                  data-cursor-text="PAYMENT"
                  className="cursor-hover px-6 py-3 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
                >
                  Continue To Sandbox Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Sandbox Payment Gateway Options */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold uppercase tracking-widest text-willow flex items-center gap-2">
                  <Lock className="w-4 h-4" /> 2. Sandbox Payment Method
                </h3>
                <span className="font-mono text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> 256-Bit SSL Encrypted
                </span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Test Card', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building2 },
                  { id: 'cod', label: 'Pay on Delivery', icon: Truck },
                ].map((m) => {
                  const Icon = m.icon;
                  const active = formData.paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className={`p-3 rounded border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        active
                          ? 'border-willow bg-willow/15 text-bone'
                          : 'border-bone/15 bg-carbon text-bone/60 hover:border-bone/40'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-willow' : 'text-bone/50'}`} />
                      <span className="font-mono text-[10px] font-bold uppercase">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. UPI / QR Sandbox View */}
              {formData.paymentMethod === 'upi' && (
                <div className="p-5 rounded bg-carbon border border-bone/15 space-y-4">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Simulated Test QR Code */}
                    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-center shadow-lg border border-black/10">
                      <div className="w-32 h-32 bg-white flex flex-col items-center justify-center border-2 border-dashed border-carbon/20 rounded p-2">
                        <QrCode className="w-24 h-24 text-carbon" />
                        <span className="font-mono text-[8px] text-carbon font-bold uppercase tracking-wider mt-1">
                          TEST UPI SCAN
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-carbon/70 mt-1 font-semibold">
                        ₹{subtotalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                          Test UPI VPA / Handle
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="flex-1 bg-carbonRaised border border-bone/20 rounded px-3 py-2 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={copyUpiHandle}
                            className="px-3 py-2 bg-carbonRaised border border-bone/20 rounded text-[10px] font-mono text-bone hover:border-willow flex items-center gap-1 cursor-pointer"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedUpi ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {['user@okaxis', 'test@paytm', 'player@okhdfc'].map((vpa) => (
                          <button
                            key={vpa}
                            type="button"
                            onClick={() => setUpiId(vpa)}
                            className="text-[9px] font-mono px-2 py-1 rounded bg-carbonRaised border border-bone/15 text-bone/70 hover:text-willow hover:border-willow cursor-pointer"
                          >
                            {vpa}
                          </button>
                        ))}
                      </div>

                      <p className="font-mono text-[10px] text-amber-400/80">
                        ⚡ Click "Authorize Sandbox Payment" below to simulate instant UPI approval.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Test Card Sandbox View */}
              {formData.paymentMethod === 'card' && (
                <div className="p-5 rounded bg-carbon border border-bone/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-bone/60 uppercase">1-Click Test Cards:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleAutoFillTestCard('visa')}
                        className="px-2 py-0.5 bg-blue-900/40 border border-blue-500/40 rounded text-[9px] font-mono text-blue-300 hover:bg-blue-900/60 cursor-pointer"
                      >
                        Visa Test
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAutoFillTestCard('mastercard')}
                        className="px-2 py-0.5 bg-red-900/40 border border-red-500/40 rounded text-[9px] font-mono text-red-300 hover:bg-red-900/60 cursor-pointer"
                      >
                        Mastercard Test
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAutoFillTestCard('rupay')}
                        className="px-2 py-0.5 bg-green-900/40 border border-green-500/40 rounded text-[9px] font-mono text-green-300 hover:bg-green-900/60 cursor-pointer"
                      >
                        RuPay Test
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                        Card Number (Test Sandbox)
                      </label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full bg-carbonRaised border border-bone/20 rounded px-3 py-2 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full bg-carbonRaised border border-bone/20 rounded px-3 py-2 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-bone/60 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full bg-carbonRaised border border-bone/20 rounded px-3 py-2 text-xs font-mono text-bone focus:border-willow focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Netbanking Sandbox View */}
              {formData.paymentMethod === 'netbanking' && (
                <div className="p-5 rounded bg-carbon border border-bone/15 space-y-4">
                  <label className="block font-mono text-[10px] uppercase text-bone/60 mb-2">
                    Select Test Bank (Sandbox Mock Simulator)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded border text-left font-mono text-[11px] transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'border-willow bg-willow/15 text-bone font-bold'
                            : 'border-bone/15 bg-carbonRaised text-bone/70 hover:border-bone/40'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Cash on Delivery */}
              {formData.paymentMethod === 'cod' && (
                <div className="p-5 rounded bg-carbon border border-bone/15 space-y-2">
                  <div className="font-mono text-xs font-bold text-bone uppercase flex items-center gap-2">
                    <Truck className="w-4 h-4 text-willow" /> Pay Upon Equipment Delivery
                  </div>
                  <p className="text-xs text-bone/60 font-light">
                    Pay with Cash, UPI QR or Card at your doorstep when the calibrated gear is delivered.
                  </p>
                </div>
              )}

              {/* Security & Warranty Banner */}
              <div className="p-4 rounded bg-carbon border border-bone/10 font-mono text-[10px] text-bone/60 space-y-1">
                <div className="flex items-center gap-1.5 text-willow font-bold">
                  <Shield className="w-3.5 h-3.5" /> Pitch Lab Official Equipment Warranty
                </div>
                <p>Every bat & match gear includes a 6-month warranty & free preparation service voucher.</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-bone/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-mono text-xs text-bone/50 hover:text-bone uppercase tracking-wider cursor-pointer"
                >
                  Back To Shipping
                </button>
                <button
                  type="submit"
                  data-cursor-text="PAY"
                  className="cursor-hover px-8 py-3.5 bg-willow text-bone font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-willow/30"
                >
                  <Zap className="w-4 h-4" /> Authorize Sandbox Payment (₹{subtotalPrice.toLocaleString('en-IN')})
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Sandbox Payment Processing Simulator */}
          {step === 3 && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-willow/20 border-t-willow animate-spin" />
                <Lock className="w-8 h-8 text-willow animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  Sandbox Gateway Pipeline
                </span>
                <h3 className="font-display text-xl font-bold uppercase text-bone">
                  {processingState === 'authorizing' && 'Connecting To Test Gateway...'}
                  {processingState === 'verifying_otp' && 'Verifying 3D Secure / UPI Token...'}
                  {processingState === 'success' && 'Test Transaction Authorized!'}
                </h3>
                <p className="font-mono text-xs text-bone/60 max-w-sm">
                  Simulating 256-bit test transaction approval for ₹{subtotalPrice.toLocaleString('en-IN')}.
                </p>
              </div>

              <div className="bg-carbon px-6 py-3 rounded-full border border-bone/15 font-mono text-[11px] text-bone/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>Reference: {txnRef || 'TXN_TEST_SANDBOX'}</span>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmed Screen */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-willow/20 border border-willow text-willow flex items-center justify-center mx-auto shadow-lg shadow-willow/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-[10px] text-willow uppercase tracking-[0.3em] font-bold">
                  Payment Verified • Lab Calibration Tag Issued
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-bone mt-1">
                  Order Confirmed #{orderRef}
                </h3>
                <p className="text-xs text-bone/60 mt-2 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your sandbox transaction was authorized successfully. Equipment is queued for final balance testing and dispatch.
                </p>
              </div>

              <div className="bg-carbon p-6 rounded border border-bone/10 text-left font-mono text-xs space-y-3">
                <div className="flex justify-between border-b border-bone/10 pb-2">
                  <span className="text-bone/50">Transaction ID:</span>
                  <span className="text-bone font-bold">{txnRef}</span>
                </div>
                <div className="flex justify-between border-b border-bone/10 pb-2">
                  <span className="text-bone/50">Payment Mode:</span>
                  <span className="text-amber-400 font-bold uppercase">{formData.paymentMethod} (Sandbox Test)</span>
                </div>
                <div className="flex justify-between border-b border-bone/10 pb-2">
                  <span className="text-bone/50">Amount Paid:</span>
                  <span className="text-bone font-bold">₹{subtotalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-bone/10 pb-2">
                  <span className="text-bone/50">Estimated Dispatch:</span>
                  <span className="text-willow font-bold">Within 24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bone/50">Delivery Address:</span>
                  <span className="text-bone text-right">{formData.address}, {formData.city}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleClose}
                  data-cursor-text="DONE"
                  className="cursor-hover px-8 py-3 bg-bone text-carbon font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-willow hover:text-bone transition-colors cursor-pointer"
                >
                  Return To Lab Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
