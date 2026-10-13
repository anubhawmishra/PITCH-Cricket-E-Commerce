import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { GrainOverlay } from './components/layout/GrainOverlay';
import { Toast } from './components/common/Toast';
import { FridayWidget } from './components/friday/FridayWidget';
import { ComparePanel } from './components/comparison/ComparePanel';
import { AuthModal } from './components/modals/AuthModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomizerPage } from './pages/CustomizerPage';
import { JournalPage } from './pages/JournalPage';
import { AboutPage } from './pages/AboutPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { GrievanceRedressalPage } from './pages/GrievanceRedressalPage';

import { CartDrawer } from './components/modals/CartDrawer';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { SearchModal } from './components/modals/SearchModal';
import { AccountModal } from './components/modals/AccountModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';

const MainContent = () => {
  const { activePage } = useStore();

  return (
    <div className="bg-carbon relative min-h-screen text-bone">
      {activePage === 'home' && <HomePage />}
      {activePage === 'shop' && <ShopPage />}
      {activePage === 'customizer' && <CustomizerPage />}
      {activePage === 'journal' && <JournalPage />}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'track-order' && <TrackOrderPage />}
      {activePage === 'shipping-returns' && <ShippingReturnsPage />}
      {activePage === 'contact' && <ContactPage />}
      {activePage === 'faq' && <FaqPage />}
      {activePage === 'privacy-policy' && <PrivacyPolicyPage />}
      {activePage === 'terms' && <TermsPage />}
      {activePage === 'grievance-redressal' && <GrievanceRedressalPage />}

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <SearchModal />
      <AccountModal />
      <ProductDetailModal />
      <AuthModal />
      <Toast />

      {/* FRIDAY AI Assistant */}
      <FridayWidget />

      {/* Product Comparison Panel */}
      <ComparePanel />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <AuthProvider>
          <ComparisonProvider>
            <CustomCursor />
            <GrainOverlay />
            <MainContent />
          </ComparisonProvider>
        </AuthProvider>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
