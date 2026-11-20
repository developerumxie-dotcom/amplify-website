import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useContactModal } from '../context/ContactContext';
import { useContactForm } from '../hooks/useContactForm';
import ContactBrandPanel from './ContactBrandPanel';
import ContactForm from './ContactForm';
import ContactSuccess from './ContactSuccess';
import RealisticGlassSurface from '../../../components/RealisticGlassSurface';
import styles from '../styles/ContactModal.module.css';

export default function ContactModal() {
  const { isOpen, modalSource, modalIntent, prefilledData, closeContactModal } = useContactModal();
  const formState = useContactForm(prefilledData, {
    source: modalSource,
    intent: modalIntent,
  });

  const modalRef = useRef(null);

  // 1. Scroll Lock on body
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 2. Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !formState.isSubmitting) {
        closeContactModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, formState.isSubmitting, closeContactModal]);

  // 3. Update prefilled data if passed
  useEffect(() => {
    if (isOpen && prefilledData && Object.keys(prefilledData).length > 0) {
      formState.setValues((prev) => ({
        ...prev,
        ...prefilledData,
      }));
    }
  }, [isOpen, prefilledData]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !formState.isSubmitting) {
      closeContactModal();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className={styles.modalBackdropBlur} />

      {/* The Master Glassmorphic Frame with Neon Gradient Border */}
      <div ref={modalRef} className={styles.modalCardFrame}>
        
        {/* Close Button at top-right */}
        <button
          type="button"
          onClick={closeContactModal}
          disabled={formState.isSubmitting}
          className={styles.closeBtn}
          aria-label="Close contact dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Inner Container */}
        <div className={styles.modalChassis}>
          {formState.submissionResult ? (
            /* Success State */
            <ContactSuccess
              result={formState.submissionResult}
              onClose={closeContactModal}
              onReset={formState.resetForm}
            />
          ) : (
            /* 2-Column Desktop Layout (Brand Panel + Form) */
            <div className={styles.twoColLayout}>
              <div className={styles.leftCol}>
                <ContactBrandPanel
                  modalSource={modalSource}
                  modalIntent={modalIntent}
                />
              </div>

              <div className={styles.rightCol}>
                <ContactForm
                  formState={formState}
                  modalSource={modalSource}
                  modalIntent={modalIntent}
                />
              </div>
            </div>
          )}

          {/* Optical Specular Glare */}
          <RealisticGlassSurface accentGlow="rgba(224, 38, 150, 0.25)" />
        </div>
      </div>
    </div>
  );
}
