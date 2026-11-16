import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle } from 'lucide-react';
import { leadService, LEAD_CATEGORIES } from '../services/leadService';
import styles from '../styles/ChatWindow.module.css';

export default function LeadCapture({ onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Brand Strategy',
    notes: '',
    consentGiven: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim())) {
      alert('Please provide your name and at least an email or WhatsApp number so we can reach you.');
      return;
    }
    if (!formData.consentGiven) {
      alert('Please check the consent box to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      await leadService.submitLead(formData);
      setIsSuccess(true);
      if (onSubmitted) onSubmitted(formData);
    } catch (err) {
      console.error('Lead submit failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = leadService.getWhatsAppLink(
    formData.name,
    formData.category,
    formData.notes
  );

  return (
    <div className={styles.leadModalOverlay}>
      <div className={styles.leadHeader}>
        <div className={styles.leadTitle}>Start a Conversation</div>
        <button className={styles.iconBtn} onClick={onClose} aria-label="Close form">
          <X size={18} />
        </button>
      </div>

      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
          <CheckCircle size={44} color="#10b981" style={{ marginBottom: 12 }} />
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 8 }}>
            Brief Received!
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 20 }}>
            Thank you, {formData.name}. Our strategy team has received your project details and will be in touch shortly.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappDirectBtn}
          >
            <MessageSquare size={16} />
            Continue on WhatsApp Immediately
          </a>
          <button
            onClick={onClose}
            className={styles.submitBtn}
            style={{ width: '100%', marginTop: 12 }}
          >
            Back to Amplify AI Chat
          </button>
        </div>
      ) : (
        <>
          <p className={styles.leadSubtitle}>
            Share a few details about your project or growth goals, and our strategy directors will prepare a personalized roadmap.
          </p>

          <form onSubmit={handleSubmit} className={styles.leadForm}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Your Name *</label>
              <input
                type="text"
                required
                className={styles.formInput}
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Business Category</label>
              <select
                className={styles.formSelect}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {LEAD_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>WhatsApp or Phone Number *</label>
              <input
                type="tel"
                required
                className={styles.formInput}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                className={styles.formInput}
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Project Requirements / Notes</label>
              <textarea
                rows={2}
                className={styles.formTextarea}
                placeholder="Tell us briefly about your goals, timeline, or current challenges..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className={styles.consentRow}>
              <input
                type="checkbox"
                id="consentCheck"
                className={styles.consentCheckbox}
                checked={formData.consentGiven}
                onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
              />
              <label htmlFor="consentCheck">
                I agree to let Amplify Digital contact me regarding my inquiry. Privacy respected.
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Transmitting Brief...' : 'Send Project Brief'}
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappDirectBtn}
            >
              <MessageSquare size={16} />
              Message Direct on WhatsApp
            </a>
          </form>
        </>
      )}
    </div>
  );
}
