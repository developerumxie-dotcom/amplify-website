/**
 * AMPLIFY AI — CONVERSATIONAL AI SERVICE
 * Independent AI integration layer with grounded fallback and provider switching.
 * Exposes zero secret API keys on the frontend.
 */

import { knowledgeService } from './knowledgeService';

export const MASCOT_STATES = {
  WELCOME: 'WELCOME',
  IDLE: 'IDLE',
  GREETING: 'GREETING',
  LISTENING: 'LISTENING',
  THINKING: 'THINKING',
  EXPLAINING: 'EXPLAINING',
  APOLOGETIC: 'APOLOGETIC'
};

class AIService {
  constructor() {
    this.systemPrompt = knowledgeService.getSystemContext();
  }

  /**
   * Determine greeting or conversational intent
   */
  detectIntent(message) {
    const text = message.toLowerCase().trim();
    if (/^(hi|hello|hey|hey there|what's up|good morning|good afternoon|good evening|namaste)/i.test(text)) {
      return 'GREETING';
    }
    if (text.length < 2) {
      return 'EMPTY';
    }
    return 'QUERY';
  }

  /**
   * Main send message method
   * Returns a promise resolving to { text, state, quickActions, leadTrigger }
   */
  async sendMessage(userMessage, conversationHistory = []) {
    const intent = this.detectIntent(userMessage);

    // 1. Handle casual greeting
    if (intent === 'GREETING') {
      await this.simulateDelay(600);
      return {
        text: "Hey there! 👋 Wonderful to have you here at Amplify Digital. I'm Amplify AI—your creative growth companion. Looking to scale a brand, explore healthcare marketing, check out our recent client work, or dive into Amplify Academy?",
        mascotState: MASCOT_STATES.GREETING,
        quickActions: [
          'Grow My Brand',
          'Healthcare Marketing',
          'Explore Amplify Academy',
          'View Our Work'
        ]
      };
    }

    if (intent === 'EMPTY') {
      return {
        text: "I'm listening! Feel free to ask me anything about Amplify Digital's services, portfolio, or how we can help your brand grow.",
        mascotState: MASCOT_STATES.LISTENING
      };
    }

    // 2. Query Knowledge Base (RAG-Lite)
    const match = knowledgeService.findAnswer(userMessage);

    // Simulate realistic AI thought processing time (700-1100ms)
    await this.simulateDelay(850);

    if (match && match.answer) {
      // Check if user is asking for contact or quote
      const wantsContact = /contact|quote|pricing|hire|work with|call|phone|reach out|whatsapp/i.test(userMessage);

      return {
        text: match.answer,
        mascotState: MASCOT_STATES.EXPLAINING,
        quickActions: match.quickActions || (wantsContact 
          ? ['Talk to Our Team', 'Message on WhatsApp', 'View Our Work']
          : ['Tell Me More', 'View Portfolio Projects', 'Talk to Our Team']),
        showLeadPrompt: match.showLeadPrompt !== undefined ? match.showLeadPrompt : wantsContact
      };
    }

    // 3. Fallback for unconfirmed / open-ended questions
    return {
      text: "I want to make sure you get the most accurate and up-to-date information for your specific requirements. While I don't have that specific detail in our verified knowledge base right now, our strategy team would be delighted to assist you directly!",
      mascotState: MASCOT_STATES.APOLOGETIC,
      quickActions: ['Talk to Our Team', 'Connect on WhatsApp', 'Explore Services'],
      showLeadPrompt: true
    };
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const aiService = new AIService();
export default aiService;
