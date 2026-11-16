import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import styles from '../styles/ChatMessages.module.css';

export default function ChatMessages({ messages, isTyping, activeAvatar }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className={styles.messagesContainer} ref={scrollRef}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} avatarImage={activeAvatar} />
      ))}

      {isTyping && <TypingIndicator avatarImage={activeAvatar} />}
    </div>
  );
}
