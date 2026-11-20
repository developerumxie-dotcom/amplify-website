import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Navbar — Let\'s Talk');
  const [modalIntent, setModalIntent] = useState('strategy-call');
  const [prefilledData, setPrefilledData] = useState({});

  const openContactModal = useCallback((options = {}) => {
    setModalSource(options.source || 'Website CTA');
    setModalIntent(options.intent || 'strategy-call');
    setPrefilledData(options.prefilledData || {});
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen to custom window event and URL hash/query for external triggers
  useEffect(() => {
    const handleGlobalTrigger = (e) => {
      openContactModal(e.detail || {});
    };
    window.addEventListener('amplify:open-contact-modal', handleGlobalTrigger);

    // Support direct opening via URL hash #contact-modal or #book-strategy-call
    const checkHashTrigger = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash === '#contact-modal' || hash === '#strategy-call' || hash === '#book-strategy-call') {
          openContactModal({ source: 'Direct URL — Strategy Call', intent: 'strategy-call' });
        }
      }
    };

    checkHashTrigger();
    window.addEventListener('hashchange', checkHashTrigger);

    return () => {
      window.removeEventListener('amplify:open-contact-modal', handleGlobalTrigger);
      window.removeEventListener('hashchange', checkHashTrigger);
    };
  }, [openContactModal]);

  return (
    <ContactContext.Provider
      value={{
        isOpen,
        modalSource,
        modalIntent,
        prefilledData,
        openContactModal,
        closeContactModal,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactProvider');
  }
  return context;
}
