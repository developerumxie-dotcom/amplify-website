import React, { useState, useEffect } from 'react';
import ChatLauncher from './components/ChatLauncher';
import ChatWindow from './components/ChatWindow';
import { useMascotState } from './hooks/useMascotState';
import { useChat } from './hooks/useChat';
import { MASCOT_STATES } from './mascot/MascotAnimations';

/**
 * AMPLIFY AI — ROOT FEATURE COMPONENT
 * Master container combining the 3D WebGL Mascot, conversational state engine,
 * and responsive glassmorphism chat interface.
 */
export default function AmplifyAI() {
  const [isOpen, setIsOpen] = useState(false);
  const mascot = useMascotState(MASCOT_STATES.WELCOME);
  const chat = useChat(mascot.setMascotState);

  // When chat opens, welcome the visitor
  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      mascot.setMascotState(MASCOT_STATES.WELCOME);
    } else {
      setIsOpen(false);
    }
  };

  // Keyboard accessibility: ESC key closes the chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Support custom dispatch to open the chatbot with a prompt
  useEffect(() => {
    const handleCustomOpen = (e) => {
      setIsOpen(true);
      mascot.setMascotState(MASCOT_STATES.EXPLAINING);
      if (e.detail?.query && chat?.sendMessage) {
        setTimeout(() => {
          chat.sendMessage(e.detail.query);
        }, 350);
      }
    };
    window.addEventListener('amplify:open-chat', handleCustomOpen);
    return () => window.removeEventListener('amplify:open-chat', handleCustomOpen);
  }, [chat, mascot]);

  return (
    <>
      {/* Floating Mascot Launcher */}
      <ChatLauncher
        isOpen={isOpen}
        onClick={handleToggle}
        activePoseImage={mascot.poseConfig?.image}
      />

      {/* Expanded Glassmorphic Assistant */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chatState={chat}
        mascotState={mascot}
      />
    </>
  );
}
