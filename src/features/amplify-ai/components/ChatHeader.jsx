import React from 'react';
import { RotateCcw, X, FileText } from 'lucide-react';
import styles from '../styles/ChatWindow.module.css';

export default function ChatHeader({ onClose, onReset, onOpenLeadForm }) {
  return (
    <div className={styles.header}>
      <div className={styles.brandGroup}>
        <span className={styles.logoDot} />
        <div>
          <div className={styles.headerTitle}>
            Amplify AI <span>✨</span>
          </div>
          <div className={styles.headerSubtitle}>
            Your Creative Growth Assistant
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
        <button
          className={styles.iconBtn}
          onClick={onOpenLeadForm}
          title="Share Project Brief / Contact Team"
          aria-label="Share Brief"
        >
          <FileText size={16} />
        </button>

        <button
          className={styles.iconBtn}
          onClick={onReset}
          title="Restart Conversation"
          aria-label="Reset Chat"
        >
          <RotateCcw size={15} />
        </button>

        <button
          className={styles.iconBtn}
          onClick={onClose}
          title="Close Amplify AI"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
