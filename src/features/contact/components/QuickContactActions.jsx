import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Check } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contactConfig';
import { buildWhatsAppUrl, buildGmailComposeUrl } from '../utils/leadMessageFormatter';
import { submitContactEnquiry } from '../services/contactService';
import styles from '../styles/QuickContactActions.module.css';

export default function QuickContactActions({ formValues = {}, modalSource = 'Website Contact Form' }) {
  const [copied, setCopied] = useState(false);

  // Dynamically build WhatsApp URL populated with current form values
  const whatsappUrl = buildWhatsAppUrl(formValues, { source: modalSource });

  // Dynamically build direct Gmail Web Compose URL populated with current form values & aditya@amplifydigitalservices.com
  const gmailUrl = buildGmailComposeUrl(formValues, { source: modalSource });

  const handleWhatsAppClick = () => {
    // If the visitor has typed at least a name, phone, or email, safely capture the lead in background
    if (formValues && (formValues.fullName || formValues.phone || formValues.email)) {
      try {
        const fullPhoneNumber = formValues.phone
          ? `${formValues.countryCode || '+91'} ${formValues.phone.trim()}`
          : '';
        submitContactEnquiry(
          {
            ...formValues,
            phone: fullPhoneNumber || formValues.phone,
            contactMethod: 'WhatsApp',
          },
          { source: `${modalSource} (Quick WhatsApp Action)` }
        ).catch(() => {
          // Non-blocking background capture
        });
      } catch (err) {
        // Safe silent fail
      }
    }
  };

  const handleGmailClick = () => {
    // If the visitor has typed details, capture the lead in background
    if (formValues && (formValues.fullName || formValues.phone || formValues.email)) {
      try {
        const fullPhoneNumber = formValues.phone
          ? `${formValues.countryCode || '+91'} ${formValues.phone.trim()}`
          : '';
        submitContactEnquiry(
          {
            ...formValues,
            phone: fullPhoneNumber || formValues.phone,
            contactMethod: 'Gmail',
          },
          { source: `${modalSource} (Quick Gmail Action)` }
        ).catch(() => {});
      } catch (err) {}
    }
  };

  const handleCallClick = () => {
    // Copy phone number to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(CONTACT_CONFIG.BUSINESS_PHONE_RAW)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2400);
        })
        .catch(() => {
          // Fallback: still let the tel: link proceed
        });
    }
  };

  const hasEnteredData = Boolean(
    formValues &&
      (formValues.fullName ||
        formValues.phone ||
        formValues.email ||
        formValues.organisation ||
        formValues.requirements)
  );

  return (
    <div className={styles.quickActionsContainer}>
      <div className={styles.dividerRow}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>OR CONNECT INSTANTLY</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.buttonsGrid}>
        {/* 1. Dynamic WhatsApp Button with Full Lead Payload */}
        <a
          href={whatsappUrl}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionCard}
          aria-label="Chat with Amplify Digital on WhatsApp with entered details"
        >
          <div className={`${styles.iconWrap} ${styles.whatsappIconWrap}`}>
            <MessageSquare size={17} className={styles.whatsappIcon} />
          </div>
          <div className={styles.actionTextWrap}>
            <span className={styles.actionTitle}>WhatsApp Us</span>
            <span className={styles.actionSubtext}>
              {hasEnteredData ? 'Send your details' : 'Start a quick chat'}
            </span>
          </div>
        </a>

        {/* 2. Direct Gmail Web Compose with Entered Details */}
        <a
          href={gmailUrl}
          onClick={handleGmailClick}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionCard}
          aria-label="Compose lead email on Gmail with entered details"
        >
          <div className={`${styles.iconWrap} ${styles.emailIconWrap}`}>
            <Mail size={17} className={styles.emailIcon} />
          </div>
          <div className={styles.actionTextWrap}>
            <span className={styles.actionTitle}>Gmail Us</span>
            <span className={styles.actionSubtext}>{CONTACT_CONFIG.BUSINESS_EMAIL}</span>
          </div>
        </a>

        {/* 3. Call Us Button with Toast */}
        <a
          href={`tel:${CONTACT_CONFIG.BUSINESS_PHONE_RAW}`}
          onClick={handleCallClick}
          className={styles.actionCard}
          aria-label="Call Amplify Digital"
        >
          <div className={`${styles.iconWrap} ${styles.phoneIconWrap}`}>
            {copied ? (
              <Check size={17} className={styles.checkIcon} />
            ) : (
              <Phone size={17} className={styles.phoneIcon} />
            )}
          </div>
          <div className={styles.actionTextWrap}>
            <span className={styles.actionTitle}>
              {copied ? 'Number Copied!' : 'Call Us'}
            </span>
            <span className={styles.actionSubtext}>
              {copied ? 'Ready to dial or paste' : CONTACT_CONFIG.BUSINESS_PHONE}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
