/**
 * AMPLIFY DIGITAL — CONTACT & STRATEGY CALL CONFIGURATION
 */

export const CONTACT_CONFIG = {
  // Google Apps Script or Serverless Endpoint URL
  API_URL: import.meta.env.VITE_CONTACT_API_URL || '',

  // Agency Direct Contact Channels
  BUSINESS_PHONE: '+91 7879964770',
  BUSINESS_PHONE_RAW: '+917879964770',
  BUSINESS_EMAIL: 'aditya@amplifydigitalservices.com',
  DEFAULT_WHATSAPP_URL:
    'https://wa.me/917879964770?text=' +
    encodeURIComponent(
      '🚀 *AMPLIFY DIGITAL — STRATEGY CALL REQUEST*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\nHi Amplify Digital Team,\n\nI would like to schedule a strategy consultation call to discuss my brand, digital growth and project goals.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n_Sent via amplifydigitalservices.com_'
    ),

  // Services matching Amplify Digital's core capabilities
  SERVICES: [
    'Branding & Strategy',
    'Social Media Marketing',
    'Performance Marketing',
    'Website Development',
    'Video Production',
    'Content Creation',
    'Regional Marketing',
    'Healthcare Marketing',
    'Amplify Academy',
    'Events & Brand Activations',
    'Other',
  ],

  // Popular Client Locations & Hubs
  LOCATIONS: [
    'Raipur, Chhattisgarh',
    'Bhilai / Durg',
    'Nagpur, Maharashtra',
    'Mumbai, Maharashtra',
    'Delhi NCR',
    'Bengaluru, Karnataka',
    'Hyderabad, Telangana',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Other (Pan-India / International)',
  ],

  // International Calling Codes
  COUNTRY_CODES: [
    { code: '+91', label: 'India (+91)', flag: '🇮🇳' },
    { code: '+1', label: 'USA / Canada (+1)', flag: '🇺🇸' },
    { code: '+44', label: 'United Kingdom (+44)', flag: '🇬🇧' },
    { code: '+971', label: 'UAE (+971)', flag: '🇦🇪' },
    { code: '+65', label: 'Singapore (+65)', flag: '🇸🇬' },
    { code: '+61', label: 'Australia (+61)', flag: '🇦🇺' },
    { code: '+49', label: 'Germany (+49)', flag: '🇩🇪' },
    { code: '+33', label: 'France (+33)', flag: '🇫🇷' },
  ],

  // Preferred Contact Modes
  CONTACT_METHODS: ['WhatsApp', 'Phone Call', 'Email'],
};
