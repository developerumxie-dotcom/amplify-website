/**
 * AMPLIFY AI — LEAD QUALIFICATION & CONVERSION SERVICE
 * Handles lead classification, local storage fallback, and WhatsApp deep links.
 */

export const LEAD_CATEGORIES = [
  'Brand Strategy',
  'Social Media Marketing',
  'Performance Marketing',
  'Website Development',
  'Video Production',
  'Regional Marketing',
  'Healthcare Marketing',
  'Academy Enquiry',
  'Partnership / Collaboration',
  'General Enquiry'
];

class LeadService {
  /**
   * Automatically infer lead category from user's message
   */
  classifyCategory(text) {
    if (!text) return 'General Enquiry';
    const lower = text.toLowerCase();
    if (lower.includes('brand') || lower.includes('logo') || lower.includes('identity')) return 'Brand Strategy';
    if (lower.includes('social') || lower.includes('instagram') || lower.includes('reel') || lower.includes('community')) return 'Social Media Marketing';
    if (lower.includes('ad') || lower.includes('ppc') || lower.includes('meta') || lower.includes('google ads') || lower.includes('performance')) return 'Performance Marketing';
    if (lower.includes('web') || lower.includes('site') || lower.includes('landing') || lower.includes('ui/ux') || lower.includes('react')) return 'Website Development';
    if (lower.includes('video') || lower.includes('shoot') || lower.includes('film') || lower.includes('commercial')) return 'Video Production';
    if (lower.includes('hospital') || lower.includes('doctor') || lower.includes('clinic') || lower.includes('healthcare') || lower.includes('patient')) return 'Healthcare Marketing';
    if (lower.includes('course') || lower.includes('learn') || lower.includes('academy') || lower.includes('student')) return 'Academy Enquiry';
    if (lower.includes('partner') || lower.includes('collaborat')) return 'Partnership / Collaboration';
    return 'General Enquiry';
  }

  /**
   * Save lead securely (LocalStorage cache + dispatch custom event + optional server API)
   */
  async submitLead(leadData) {
    const payload = {
      id: `lead_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: leadData.name?.trim(),
      email: leadData.email?.trim(),
      phone: leadData.phone?.trim(),
      category: leadData.category || this.classifyCategory(leadData.notes),
      budget: leadData.budget || 'Not specified',
      notes: leadData.notes?.trim() || '',
      consentGiven: Boolean(leadData.consentGiven),
      source: 'Amplify AI Virtual Assistant'
    };

    // Store in localStorage for safe client backup
    try {
      const existing = JSON.parse(localStorage.getItem('amplify_ai_leads') || '[]');
      existing.unshift(payload);
      localStorage.setItem('amplify_ai_leads', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // Storage unavailable or disabled
    }

    // Attempt server submission if serverless endpoint exists
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return { success: true, serverSynced: true, payload };
      }
    } catch {
      // Fallback: serverless endpoint not active yet in dev environment
    }

    return { success: true, serverSynced: false, payload };
  }

  /**
   * Generate direct WhatsApp pre-filled link
   */
  getWhatsAppLink(name, category, notes) {
    const message = `Hello Amplify Digital Team! My name is ${name || 'a visitor'}. I'm interested in ${category || 'your services'}.${notes ? ` Brief note: ${notes}` : ''} I'd love to discuss this further.`;
    return `https://wa.me/917879964770?text=${encodeURIComponent(message)}`;
  }
}

export const leadService = new LeadService();
export default leadService;
