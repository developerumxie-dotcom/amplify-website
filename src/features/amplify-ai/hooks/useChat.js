import { useState, useRef, useEffect, useCallback } from 'react';
import { aiService, MASCOT_STATES } from '../services/aiService';
import { AMPLIFY_AI_CONFIG } from '../config/amplifyAI.config';

export function useChat(setMascotState) {
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: AMPLIFY_AI_CONFIG.initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: AMPLIFY_AI_CONFIG.defaultQuickActions.map(a => a.label)
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const idleTimeoutRef = useRef(null);

  // Return mascot to IDLE after a period of conversational silence
  const scheduleIdleReturn = useCallback(() => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setMascotState(MASCOT_STATES.IDLE);
    }, 4500);
  }, [setMascotState]);

  // When user is typing in the input box, set mascot to LISTENING
  const handleUserTyping = useCallback(() => {
    setMascotState(MASCOT_STATES.LISTENING);
  }, [setMascotState]);

  // Send a message
  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim() || isTyping) return;

    const trimmed = text.trim();
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 1. Mascot enters THINKING state
    setMascotState(MASCOT_STATES.THINKING);

    try {
      // 2. Fetch grounded response from AI Engine
      const res = await aiService.sendMessage(trimmed, messages);

      const aiMsg = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: res.quickActions
      };

      setMessages(prev => [...prev, aiMsg]);

      // 3. Mascot enters EXPLAINING or APOLOGETIC state
      setMascotState(res.mascotState || MASCOT_STATES.EXPLAINING);

      if (res.showLeadPrompt) {
        // Subtle trigger for lead submission
      }
    } catch (err) {
      console.error('AI message error:', err);
      const errorMsg = {
        id: `msg_err_${Date.now()}`,
        sender: 'ai',
        text: "I encountered a minor network glitch connecting to the strategy database. Please feel free to reach out directly via WhatsApp at +91 7879964770!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
      setMascotState(MASCOT_STATES.APOLOGETIC);
    } finally {
      setIsTyping(false);
      scheduleIdleReturn();
    }
  }, [isTyping, messages, setMascotState, scheduleIdleReturn]);

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        sender: 'ai',
        text: AMPLIFY_AI_CONFIG.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: AMPLIFY_AI_CONFIG.defaultQuickActions.map(a => a.label)
      }
    ]);
    setMascotState(MASCOT_STATES.WELCOME);
    scheduleIdleReturn();
  }, [setMascotState, scheduleIdleReturn]);

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    handleUserTyping,
    resetChat,
    showLeadModal,
    setShowLeadModal
  };
}
