/**
 * AMPLIFY DIGITAL — LEAD DISPATCH MESSAGE FORMATTER
 * Formats complete lead details for WhatsApp & Gmail / Email integrations.
 * Matches client specification with exact fields, icons and separators.
 * Recipient: aditya@amplifydigitalservices.com
 */

export const TARGET_BUSINESS_EMAIL = 'aditya@amplifydigitalservices.com';
export const TARGET_BUSINESS_PHONE = '917879964770';

export function formatLeadWhatsAppMessage(leadData = {}, metadata = {}) {
  const fullName = (leadData.fullName || '').trim();
  const rawPhone = (leadData.phone || '').trim();
  const countryCode = leadData.countryCode || '+91';
  const phone = rawPhone.startsWith('+') ? rawPhone : (rawPhone ? `${countryCode} ${rawPhone}` : '');
  const email = (leadData.email || '').trim();
  const organisation = (leadData.organisation || '').trim();
  const location = (leadData.location || '').trim();
  const address = (leadData.address || '').trim();
  const service = (leadData.service || '').trim();
  const requirements = (leadData.requirements || '').trim();

  const dateNow = new Date();
  const dateStr = dateNow.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const yearMonth = dateNow.toISOString().slice(0, 7).replace('-', '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const enquiryId = leadData.enquiryId || metadata.enquiryId || `AMP-${yearMonth}-${randomSuffix}`;

  return [
    `🚀 *NEW STRATEGY CALL INQUIRY — AMPLIFY DIGITAL*`,
    `──────────────────────────────`,
    `👤 *Name:* ${fullName || 'N/A'}`,
    `📞 *Phone:* ${phone || 'N/A'}`,
    `✉️ *Email:* ${email || 'N/A'}`,
    `🏢 *Organisation:* ${organisation || 'N/A'}`,
    `📍 *Location:* ${location || 'N/A'}`,
    `🏠 *Address:* ${address || 'N/A'}`,
    `🎯 *Service:* ${service || 'General Strategy'}`,
    `💬 *Requirement:* ${requirements || 'N/A'}`,
    `──────────────────────────────`,
    `🆔 *Ref ID:* ${enquiryId}`,
    `📅 *Date:* ${dateStr}`,
  ].join('\n');
}

export function buildWhatsAppUrl(leadData = {}, metadata = {}, targetPhone = TARGET_BUSINESS_PHONE) {
  const message = formatLeadWhatsAppMessage(leadData, metadata);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

export function formatLeadEmailContent(leadData = {}, metadata = {}) {
  const fullName = (leadData.fullName || '').trim();
  const rawPhone = (leadData.phone || '').trim();
  const countryCode = leadData.countryCode || '+91';
  const phone = rawPhone.startsWith('+') ? rawPhone : (rawPhone ? `${countryCode} ${rawPhone}` : 'N/A');
  const email = (leadData.email || '').trim() || 'N/A';
  const organisation = (leadData.organisation || '').trim() || 'N/A';
  const location = (leadData.location || '').trim() || 'N/A';
  const address = (leadData.address || '').trim() || 'N/A';
  const service = (leadData.service || '').trim() || 'General Strategy';
  const requirements = (leadData.requirements || '').trim() || 'N/A';

  const dateNow = new Date();
  const dateStr = dateNow.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const yearMonth = dateNow.toISOString().slice(0, 7).replace('-', '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const enquiryId = leadData.enquiryId || metadata.enquiryId || `AMP-${yearMonth}-${randomSuffix}`;

  const subject = fullName
    ? `NEW STRATEGY CALL INQUIRY — ${fullName} [${enquiryId}]`
    : `NEW STRATEGY CALL INQUIRY — AMPLIFY DIGITAL [${enquiryId}]`;

  const body = [
    `🚀 NEW STRATEGY CALL INQUIRY — AMPLIFY DIGITAL`,
    `──────────────────────────────`,
    `👤 Name: ${fullName || 'N/A'}`,
    `📞 Phone: ${phone}`,
    `✉️ Email: ${email}`,
    `🏢 Organisation: ${organisation}`,
    `📍 Location: ${location}`,
    `🏠 Address: ${address}`,
    `🎯 Service: ${service}`,
    `💬 Requirement: ${requirements}`,
    `──────────────────────────────`,
    `🆔 Ref ID: ${enquiryId}`,
    `📅 Date: ${dateStr}`,
  ].join('\n');

  return { subject, body, enquiryId, dateStr };
}

/**
 * Direct web Gmail compose URL — navigates directly to Gmail compose in browser
 * with recipient (aditya@amplifydigitalservices.com), subject & full details prefilled.
 */
export function buildGmailComposeUrl(
  leadData = {},
  metadata = {},
  targetEmail = TARGET_BUSINESS_EMAIL
) {
  const { subject, body } = formatLeadEmailContent(leadData, metadata);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Standard mailto URL fallback for native mail client
 */
export function buildEmailMailtoUrl(
  leadData = {},
  metadata = {},
  targetEmail = TARGET_BUSINESS_EMAIL
) {
  const { subject, body } = formatLeadEmailContent(leadData, metadata);
  return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
