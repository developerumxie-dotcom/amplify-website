import React, { useState } from 'react';
import { Send } from 'lucide-react';
import styles from '../styles/ChatWindow.module.css';

export default function ChatInput({ onSendMessage, onTyping, isTyping }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    if (onTyping) onTyping();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim() || isTyping) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Ask Amplify AI about branding, ads, healthcare..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!text.trim() || isTyping}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>

      <div className={styles.inputFooterText}>
        Grounded in verified Amplify Digital expertise • Confidential & secure
      </div>
    </div>
  );
}
