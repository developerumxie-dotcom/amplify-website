import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import LeadCapture from './LeadCapture';
import styles from '../styles/ChatWindow.module.css';

export default function ChatWindow({
  isOpen,
  onClose,
  chatState,
  mascotState
}) {
  const [showLeadModal, setShowLeadModal] = useState(false);

  if (!isOpen) return null;

  const {
    messages,
    isTyping,
    sendMessage,
    handleUserTyping,
    resetChat
  } = chatState;

  const {
    poseConfig
  } = mascotState;

  // Get active quick actions from the last message if available
  const lastMsg = messages[messages.length - 1];
  const activeQuickActions = lastMsg?.quickActions || [];

  return (
    <div className={styles.chatWindow} role="dialog" aria-label="Amplify AI Assistant">
      {/* 1. Header with brand info and controls */}
      <ChatHeader
        onClose={onClose}
        onReset={resetChat}
        onOpenLeadForm={() => setShowLeadModal(true)}
        activePoseImage={poseConfig?.image}
      />

      {/* 2. Clean Conversation Messages Area (Mascot3D completely removed) */}
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        activeAvatar={poseConfig?.image}
      />

      {/* 3. Quick Action Suggestion Chips */}
      <QuickActions
        actions={activeQuickActions}
        onSelectAction={(actionText) => sendMessage(actionText)}
      />

      {/* 4. Message Composer & Send Bar */}
      <ChatInput
        onSendMessage={sendMessage}
        onTyping={handleUserTyping}
        isTyping={isTyping}
      />

      {/* 5. Lead Capture Modal / Sheet */}
      {showLeadModal && (
        <LeadCapture
          onClose={() => setShowLeadModal(false)}
          onSubmitted={() => {
            // Submitted
          }}
        />
      )}
    </div>
  );
}
