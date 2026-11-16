import React from 'react';
import styles from '../styles/ChatWindow.module.css';

export default function QuickActions({ actions, onSelectAction }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className={styles.quickActionsContainer}>
      {actions.map((act, idx) => (
        <button
          key={idx}
          className={styles.chipButton}
          onClick={() => onSelectAction(act)}
        >
          {act}
        </button>
      ))}
    </div>
  );
}
