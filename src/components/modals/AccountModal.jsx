import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { X, User, Package, Award, LogOut, CheckCircle2, LogIn, Shield, Trash2 } from 'lucide-react';

export const AccountModal = () => {
  const { isAccountOpen, setIsAccountOpen, navigateTo } = useStore();
  const { user, isAuthenticated, logout, openLogin, deleteAccount } = useAuth();
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'bats', 'profile'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-carbon/90 backdrop-blur-md"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative w-full max-w-3xl bg-carbonRaised border border-[var(--carbon-line)] text-bone rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--carbon-line)] flex items-center justify-between bg-carbon">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-willow/20 border border-willow flex items-center justify-center text-willow">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider">
                {isAuthenticated ? (user?.name || 'Pitch Client Member') : 'Pitch Client Services Portal'}
              </h2>
              <p className="font-mono text-[9px] text-bone/50 uppercase tracking-widest">
                {isAuthenticated ? `Account: ${user?.email}` : 'Guest Session · Sign in for saved specs & orders'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setIsAccountOpen(false); }}
                className="text-bone/50 hover:text-willow transition-colors p-1.5 flex items-center gap-1 font-mono text-[10px] uppercase"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => { setIsAccountOpen(false); openLogin(); }}
                className="bg-willow hover:bg-red-700 text-bone px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
            <button
              onClick={() => setIsAccountOpen(false)}
              className="text-bone/50 hover:text-willow transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-bone/10 bg-carbon px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-willow text-willow font-bold'
                : 'border-transparent text-bone/60 hover:text-bone'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Recent Lab Orders
          </button>
          <button
            onClick={() => setActiveTab('bats')}
            className={`py-3 px-4 border-b-2 uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'bats'
                ? 'border-willow text-willow font-bold'
                : 'border-transparent text-bone/60 hover:text-bone'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Saved Bat Specs
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-willow text-willow font-bold'
                : 'border-transparent text-bone/60 hover:text-bone'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Profile &amp; Privacy
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {[
                {
                  id: 'LAB-77492',
                  date: '10 AUG 2026',
                  item: 'Player Edition Willow (Custom Engraved)',
                  status: 'Dispatched - In Transit',
                  total: '₹13,799',
                  tracking: 'EXP-992140',
                },
                {
                  id: 'LAB-55104',
                  date: '02 JUN 2026',
                  item: 'Shrey Master Class Air Helmet + DSC Gloves',
                  status: 'Delivered & Calibrated',
                  total: '₹5,498',
                  tracking: 'DEL-441092',
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded bg-carbon border border-bone/10 font-mono text-xs space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-bone/10 pb-2">
                    <span className="text-willow font-bold">{order.id}</span>
                    <span className="text-bone/40 text-[10px]">{order.date}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-sans font-bold uppercase text-bone">
                        {order.item}
                      </div>
                      <div className="text-[10px] text-bone/50 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {order.status}
                      </div>
                    </div>
                    <div className="font-bold text-bone">{order.total}</div>
                  </div>
                  <div className="pt-2 flex justify-between text-[10px] text-bone/40 border-t border-bone/5">
                    <span>Tracking: {order.tracking}</span>
                    <button className="text-willow hover:underline">Download Lab Invoice</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bats' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded bg-carbon border border-willow/40 space-y-3">
                <div className="flex justify-between items-center text-willow font-bold uppercase tracking-widest text-[10px]">
                  <span>Active Custom Profile #01</span>
                  <span>Sensor Calibrated</span>
                </div>
                <h4 className="font-display font-bold text-sm text-bone">
                  ENGLISH WILLOW CLEFT — LOW SWEET SPOT
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] text-bone/70 bg-carbonRaised p-3 rounded border border-bone/10">
                  <div>Weight: <strong>2lb 8.5oz</strong></div>
                  <div>Grains: <strong>12 Straight</strong></div>
                  <div>Edge: <strong>41mm Curved</strong></div>
                  <div>Spine: <strong>66mm</strong></div>
                  <div>Handle: <strong>Semi-Oval Cane</strong></div>
                  <div>Hardness: <strong>44 Rock scale</strong></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 font-mono text-xs">
              {isAuthenticated ? (
                <>
                  {/* Profile info */}
                  <div className="p-5 rounded bg-carbon border border-bone/10 space-y-3">
                    <span className="text-willow font-bold uppercase tracking-wider text-[11px] block">
                      Account Credentials &amp; Identifiers
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-bone/40 text-[10px] uppercase block">Full Name</span>
                        <p className="font-sans font-bold text-bone">{user?.name || 'Customer'}</p>
                      </div>
                      <div>
                        <span className="text-bone/40 text-[10px] uppercase block">Email Address</span>
                        <p className="font-sans font-bold text-bone">{user?.email}</p>
                      </div>
                      <div>
                        <span className="text-bone/40 text-[10px] uppercase block">Telephone</span>
                        <p className="font-sans font-bold text-bone">{user?.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-bone/40 text-[10px] uppercase block">Account Role</span>
                        <p className="font-sans font-bold text-bone">{user?.role || 'CUSTOMER'}</p>
                      </div>
                    </div>
                  </div>

                  {/* DPDP Act Rights & Controls */}
                  <div className="p-5 rounded bg-carbon border border-bone/10 space-y-4">
                    <div className="space-y-1">
                      <span className="text-willow font-bold uppercase tracking-wider text-[11px] block">
                        Statutory Privacy Rights (DPDP Act, 2023)
                      </span>
                      <p className="text-[11px] text-bone/60 font-sans leading-relaxed">
                        Under the Digital Personal Data Protection Act, 2023, you have the right to access summaries of your personal data, request correction of inaccurate records, or exercise your statutory right to data erasure.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        onClick={() => { setIsAccountOpen(false); navigateTo('privacy-policy'); }}
                        className="bg-carbonRaised border border-bone/20 hover:border-willow/50 px-3 py-2 rounded text-bone text-[11px] transition-colors cursor-pointer"
                      >
                        Read Privacy Policy
                      </button>
                      <button
                        onClick={() => { setIsAccountOpen(false); navigateTo('grievance-redressal'); }}
                        className="bg-carbonRaised border border-bone/20 hover:border-willow/50 px-3 py-2 rounded text-bone text-[11px] transition-colors cursor-pointer"
                      >
                        Grievance Redressal Officer
                      </button>
                    </div>

                    {/* Deletion Section */}
                    <div className="border-t border-bone/10 pt-4 mt-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-red-400 font-bold uppercase text-[11px] block">
                            Delete Account &amp; Personal Data (Erasure)
                          </span>
                          <p className="text-[10px] text-bone/50 font-sans">
                            Permanently delete your profile, active sessions, and saved addresses. Commercial tax invoices will be anonymized in compliance with Indian accounting laws.
                          </p>
                        </div>

                        {!showDeleteConfirm ? (
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex-shrink-0 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 px-3 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Request Erasure</span>
                          </button>
                        ) : (
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <button
                              disabled={isDeleting}
                              onClick={async () => {
                                try {
                                  setIsDeleting(true);
                                  await deleteAccount();
                                  showToast('Account and personal data erased successfully');
                                  setIsAccountOpen(false);
                                } catch (err) {
                                  showToast(err.message || 'Erasure request failed');
                                } finally {
                                  setIsDeleting(false);
                                  setShowDeleteConfirm(false);
                                }
                              }}
                              className="bg-red-600 hover:bg-red-700 text-bone px-3 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              {isDeleting ? 'Erasing...' : 'Confirm Delete'}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="border border-bone/20 hover:border-bone/40 text-bone/70 px-3 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <p className="text-bone/60 font-sans">Sign in to review your profile and exercise personal data controls.</p>
                  <button
                    onClick={() => { setIsAccountOpen(false); openLogin(); }}
                    className="bg-willow hover:bg-red-700 text-bone px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
