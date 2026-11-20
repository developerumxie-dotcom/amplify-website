import React from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contactConfig';
import { buildWhatsAppUrl, buildGmailComposeUrl } from '../utils/leadMessageFormatter';
import styles from '../styles/ContactSuccess.module.css';

export default function ContactSuccess({ result, onClose, onReset }) {
  const firstName = (result?.fullName || '').trim().split(' ')[0] || 'Friend';
  const enquiryId = result?.enquiryId || 'AMP-202611';

  const whatsappUrl = buildWhatsAppUrl(result, { enquiryId });
  const gmailUrl = buildGmailComposeUrl(result, { enquiryId });

  return (
    <div className={styles.successContainer}>
      {/* Ambient Radial Halos */}
      <div className={styles.ambientGlow} />
      <div className={styles.ambientOrangeGlow} />

      {/* Animated Confirmation Badge */}
      <div className={styles.iconWrapper}>
        <div className={styles.checkmarkHalo} />
        <div className={styles.checkmarkCircle}>
          <CheckCircle2 size={36} className={styles.checkIcon} />
        </div>
      </div>

      {/* Status Pill */}
      <div className={styles.statusPill}>
        <ShieldCheck size={13} className={styles.statusShieldIcon} />
        <span>SAVED &amp; DISPATCHED SUCCESSFULLY</span>
      </div>

      {/* Personalized Heading */}
      <h3 className={styles.mainHeading}>
        Your Vision. <br />
        <span className={styles.gradientText}>Our Next Conversation.</span>
      </h3>

      {/* Personalized Greeting */}
      <p className={styles.personalGreeting}>
        Thank you, <strong>{firstName}</strong>!
      </p>

      <p className={styles.supportingCopy}>
        Your strategy call request has been recorded. Full details have been routed to our team inbox and Google Sheets.
      </p>

      {/* Summary Recap Card of Submitted Details */}
      <div className={styles.detailsRecapCard}>
        <div className={styles.recapHeader}>
          <span className={styles.recapTitle}>SUBMITTED DETAILS SUMMARY</span>
          <span className={styles.refBadge}>{enquiryId}</span>
        </div>

        <div className={styles.recapGrid}>
          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Name:</span>
            <span className={styles.recapVal}>{result?.fullName || 'N/A'}</span>
          </div>

          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Phone:</span>
            <span className={styles.recapValHighlight}>{result?.phone || 'N/A'}</span>
          </div>

          <div className={styles.recapItem}>
            <span className={styles.recapLabel}>Email:</span>
            <span className={styles.recapVal}>{result?.email || 'N/A'}</span>
          </div>

          {result?.organisation && (
            <div className={styles.recapItem}>
              <span className={styles.recapLabel}>Organisation:</span>
              <span className={styles.recapVal}>{result.organisation}</span>
            </div>
          )}

          {result?.location && (
            <div className={styles.recapItem}>
              <span className={styles.recapLabel}>Location:</span>
              <span className={styles.recapVal}>{result.location}</span>
            </div>
          )}

          {result?.service && (
            <div className={styles.recapItem}>
              <span className={styles.recapLabel}>Service:</span>
              <span className={styles.recapValHighlight}>{result.service}</span>
            </div>
          )}
        </div>

        {result?.requirements && (
          <div className={styles.requirementPreview}>
            <span className={styles.recapLabel}>Requirements:</span>
            <p className={styles.requirementText}>{result.requirements}</p>
          </div>
        )}
      </div>

      {/* Dual Channel Notification Info Banner */}
      <div className={styles.dispatchNotice}>
        <span className={styles.pulseDot} />
        <span>
          Routed to <strong>aditya@amplifydigitalservices.com</strong> &amp; Google Sheets.
        </span>
      </div>

      {/* Action Buttons: WhatsApp, Direct Gmail Compose & Return */}
      <div className={styles.actionRow}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappPrimaryBtn}
        >
          <MessageSquare size={17} />
          <span>Chat on WhatsApp</span>
          <ExternalLink size={14} />
        </a>

        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.gmailSecondaryBtn}
        >
          <Mail size={16} />
          <span>Open in Gmail</span>
          <ExternalLink size={13} />
        </a>

        <button
          type="button"
          onClick={() => {
            onReset();
            onClose();
          }}
          className={styles.backBtn}
        >
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </button>
      </div>
    </div>
  );
}
