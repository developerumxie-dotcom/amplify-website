import React from 'react';
import styles from '../styles/ChatMessages.module.css';

export default function TypingIndicator({ avatarImage }) {
  return (
    <div className={styles.typingRow}>
      <div className={styles.avatarMini}>
        <img src={avatarImage || '/models/poses/THINKING.jpg'} alt="Thinking..." />
      </div>
      <div className={styles.typingBubble}>
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
      </div>
    </div>
  );
}
