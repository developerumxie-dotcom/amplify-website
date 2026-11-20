/**
 * AMPLIFY DIGITAL — PRODUCTION-GRADE GOOGLE APPS SCRIPT
 * Lead Management, Google Sheets Recording & Automated Gmail Notifications
 * 
 * Target Spreadsheet: "Amplify Digital — Website Enquiries"
 * Target Worksheet:   "Strategy Call Leads"
 * Notifications:      aditya@amplifydigitalservices.com
 */

// ── Configuration Constants ──────────────────────────────────────────
var CONFIG = {
  SHEET_NAME: 'Strategy Call Leads',
  SPREADSHEET_NAME: 'Amplify Digital — Website Enquiries',
  // Designated lead notification email for Amplify Digital
  NOTIFICATION_EMAIL: 'aditya@amplifydigitalservices.com',
  AGENCY_NAME: 'Amplify Digital Services',
  AGENCY_PHONE: '+91 7879964770',
  OWNER_WHATSAPP: '917879964770', // Destination number for WhatsApp alerts
  // Optional: If you want 100% automated WhatsApp alerts sent to your phone from Google Apps Script,
  // get a free CallMeBot API key (send "I allow callmebot to send me messages" to +34 644 44 24 55 on WhatsApp)
  // and paste it below:
  CALLMEBOT_API_KEY: '',
  AGENCY_WEBSITE: 'https://www.amplifydigitalservices.com',
  TIMEZONE: 'Asia/Kolkata',
  DEFAULT_LEAD_STATUS: 'New',
  ID_PREFIX: 'AMP',
  MAX_LOCK_WAIT_MS: 30000
};

// ── Master Headers Definition ────────────────────────────────────────
var HEADERS = [
  'Enquiry ID',
  'Submission Date',
  'Submission Time',
  'Full Name',
  'Phone Number',
  'Email Address',
  'Organisation',
  'City / Location',
  'Address',
  'Service Interested In',
  'Project Requirements',
  'Preferred Contact Method',
  'Enquiry Source',
  'Consent Status',
  'Lead Status',
  'Follow-up Notes'
];

/**
 * Handle HTTP OPTIONS requests for browser CORS pre-flight
 */
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handle HTTP GET for endpoint health-check
 */
function doGet(e) {
  var result = {
    status: 'online',
    service: CONFIG.AGENCY_NAME + ' Contact API',
    timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss z'),
    version: '2.4.0'
  };
  return createJsonResponse(result);
}

/**
 * Handle HTTP POST from React website form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    // Acquire lock to prevent race conditions during concurrent submissions
    var lockAcquired = lock.tryLock(CONFIG.MAX_LOCK_WAIT_MS);
    if (!lockAcquired) {
      return createJsonResponse({
        status: 'error',
        success: false,
        message: 'Server busy. Please try submitting again in a moment.'
      });
    }

    // 1. Parse incoming payload (supports both JSON and Form Encoded)
    var data = parseRequestPayload(e);
    if (!data) {
      return createJsonResponse({
        status: 'error',
        success: false,
        message: 'Invalid or empty request payload.'
      });
    }

    // 2. Anti-spam honeypot check (hidden field that bots fill)
    if (data.website_trap || data.fax_number || data.honey_pot) {
      // Silently return success to fool bots without writing to spreadsheet
      return createJsonResponse({
        status: 'success',
        success: true,
        enquiryId: 'AMP-' + Math.floor(1000 + Math.random() * 9000),
        message: 'Request processed.'
      });
    }

    // 3. Server-side validation of required inputs
    var validationError = validateRequiredFields(data);
    if (validationError) {
      return createJsonResponse({
        status: 'error',
        success: false,
        message: validationError
      });
    }

    // 4. Sanitize all inputs against CSV/Spreadsheet Formula Injection
    var safeData = sanitizePayload(data);

    // 5. Open or create the Google Sheet and worksheet
    var sheet = getOrCreateWorksheet();

    // 6. Generate genuine unique enquiry ID
    var now = new Date();
    var enquiryId = generateUniqueEnquiryId(sheet, now);

    var dateStr = Utilities.formatDate(now, CONFIG.TIMEZONE, 'dd/MM/yyyy');
    var timeStr = Utilities.formatDate(now, CONFIG.TIMEZONE, 'hh:mm:ss a');

    // 7. Assemble row data in exact order of HEADERS
    var rowValues = [
      enquiryId,
      dateStr,
      timeStr,
      safeData.fullName,
      safeData.phone,
      safeData.email,
      safeData.organisation || 'N/A',
      safeData.location || 'N/A',
      safeData.address || 'N/A',
      safeData.service || 'General Inquiry',
      safeData.requirements || 'N/A',
      safeData.contactMethod || 'WhatsApp',
      safeData.source || 'Website Contact Form',
      safeData.consent ? 'Granted' : 'Granted',
      CONFIG.DEFAULT_LEAD_STATUS,
      '' // Follow-up Notes left blank for internal team
    ];

    // 8. Append row to spreadsheet
    sheet.appendRow(rowValues);

    // Auto-fit column widths if newly populated
    if (sheet.getLastRow() <= 2) {
      for (var col = 1; col <= HEADERS.length; col++) {
        sheet.autoResizeColumn(col);
      }
    }

    // 9. Send Team Notification via Gmail / MailApp
    var emailNotificationSuccess = false;
    var emailErrorMessage = '';
    try {
      sendTeamNotification(safeData, enquiryId, dateStr, timeStr);
      emailNotificationSuccess = true;
    } catch (mailErr) {
      emailErrorMessage = mailErr.toString();
      // Record failed notification in follow-up notes without throwing away the lead
      var lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 16).setValue('Notification error: ' + emailErrorMessage);
    }

    // 9b. Send Automated WhatsApp Notification to Owner (if configured)
    if (CONFIG.CALLMEBOT_API_KEY && CONFIG.OWNER_WHATSAPP) {
      try {
        sendWhatsAppAutomatedAlert(safeData, enquiryId, dateStr, timeStr);
      } catch (waErr) {
        Logger.log('WhatsApp notification error: ' + waErr.toString());
      }
    }

    // 10. Send Visitor Acknowledgment Email (Graceful error handling)
    try {
      if (safeData.email && safeData.email.indexOf('@') > 0) {
        sendVisitorAcknowledgment(safeData, enquiryId);
      }
    } catch (ackErr) {
      // Ignored non-fatal error
    }

    // 11. Return successful JSON response
    return createJsonResponse({
      status: 'success',
      success: true,
      enquiryId: enquiryId,
      message: 'Strategy call request recorded successfully.',
      timestamp: dateStr + ' ' + timeStr,
      notificationSent: emailNotificationSuccess
    });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      success: false,
      message: 'Server error: ' + err.toString()
    });
  } finally {
    // Always release lock
    lock.releaseLock();
  }
}

/**
 * Parse incoming POST body safely
 */
function parseRequestPayload(e) {
  if (!e) return null;
  
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (jsonErr) {
      // Fallback: URL encoded string in contents
      return e.parameter || null;
    }
  }
  
  if (e.parameter) {
    return e.parameter;
  }
  
  return null;
}

/**
 * Validate required fields on server-side
 */
function validateRequiredFields(d) {
  if (!d.fullName || String(d.fullName).trim().length < 2) {
    return 'Please provide your full name (minimum 2 characters).';
  }
  if (!d.phone || String(d.phone).replace(/[^0-9]/g, '').length < 7) {
    return 'Please provide a valid phone number.';
  }
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email).trim())) {
    return 'Please provide a valid email address.';
  }
  return null;
}

/**
 * Sanitize all input values against Spreadsheet Formula Injection
 * Strings starting with '=', '+', '-', '@' will have an apostrophe prepended.
 */
function sanitizePayload(raw) {
  var clean = {};
  for (var key in raw) {
    if (raw.hasOwnProperty(key)) {
      var val = raw[key];
      if (typeof val === 'string') {
        var trimmed = val.trim();
        // Prevent formula execution in Excel/Google Sheets
        if (/^[=+\-@]/.test(trimmed)) {
          trimmed = "'" + trimmed;
        }
        clean[key] = trimmed;
      } else {
        clean[key] = val;
      }
    }
  }
  return clean;
}

/**
 * Generate genuine sequential Enquiry ID: AMP-YYYYMM-XXXX
 */
function generateUniqueEnquiryId(sheet, dateObj) {
  var yearMonth = Utilities.formatDate(dateObj, CONFIG.TIMEZONE, 'yyyyMM');
  var lastRow = sheet.getLastRow();
  
  var sequenceNum = lastRow >= 2 ? lastRow : 1;
  var paddedNum = ('000' + sequenceNum).slice(-4);
  
  return CONFIG.ID_PREFIX + '-' + yearMonth + '-' + paddedNum;
}

/**
 * Get or create the worksheet with styled headers
 */
function getOrCreateWorksheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    ss = null;
  }
  
  if (!ss) {
    throw new Error('Script must be bound to a Google Spreadsheet or SPREADSHEET_ID must be provided.');
  }

  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // If new or empty sheet, set up master header styling
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    
    // Style Header Row: Dark Navy (#0B071F), Bold White text, Freeze Row
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#0B071F');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setFontFamily('Arial');
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrap(true);
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Send internal notification email to the Amplify Digital team
 */
function sendTeamNotification(lead, enquiryId, dateStr, timeStr) {
  var cleanPhone = lead.phone.replace(/[^0-9]/g, '');
  var whatsappUrl = 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent('Hello ' + lead.fullName + ', thank you for contacting Amplify Digital!');
  var telUrl = 'tel:' + lead.phone.replace(/[\s\-]/g, '');
  var mailtoUrl = 'mailto:' + lead.email + '?subject=' + encodeURIComponent('Regarding your Strategy Call request | Amplify Digital');

  var subject = 'New Strategy Call Enquiry | ' + lead.fullName + ' [' + enquiryId + ']';

  var htmlBody = `
  <div style="background-color: #060412; padding: 35px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #E2E8F0; line-height: 1.6;">
    <div style="max-width: 620px; margin: 0 auto; background: #0E0A24; border: 1px solid #7928CA; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
      
      <!-- Top Brand Header Banner -->
      <div style="background: linear-gradient(135deg, #FF7A00 0%, #E02696 50%, #7928CA 100%); padding: 24px 28px; text-align: left;">
        <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">AMPLIFY DIGITAL</h1>
        <p style="margin: 4px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 500;">New Strategy Call &amp; Client Consultation Request</p>
      </div>

      <!-- Quick Action Badges -->
      <div style="padding: 20px 28px 10px 28px; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size: 12px; color: #94A3B8;">ENQUIRY ID: <strong style="color: #FF7A00;">${enquiryId}</strong></td>
            <td align="right" style="font-size: 12px; color: #94A3B8;">${dateStr} at ${timeStr}</td>
          </tr>
        </table>
      </div>

      <!-- Lead Details Table -->
      <div style="padding: 20px 28px;">
        <h2 style="color: #FFFFFF; font-size: 16px; margin: 0 0 16px 0; border-left: 3px solid #E02696; padding-left: 10px;">Prospect Information</h2>
        
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td width="35%" style="color: #94A3B8; font-weight: 600;">Full Name:</td>
            <td style="color: #FFFFFF; font-weight: 700;">${lead.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Phone Number:</td>
            <td style="color: #38BDF8; font-weight: 600;"><a href="${telUrl}" style="color: #38BDF8; text-decoration: none;">${lead.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Email Address:</td>
            <td style="color: #E879F9;"><a href="${mailtoUrl}" style="color: #E879F9; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Organisation:</td>
            <td style="color: #FFFFFF;">${lead.organisation || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">City / Location:</td>
            <td style="color: #FFFFFF;">${lead.location || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Address:</td>
            <td style="color: #FFFFFF;">${lead.address || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Service Interested:</td>
            <td style="color: #FACC15; font-weight: 700;">${lead.service || 'General Inquiry'}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="color: #94A3B8; font-weight: 600;">Preferred Contact:</td>
            <td style="color: #4ADE80; font-weight: 600;">${lead.contactMethod || 'WhatsApp'}</td>
          </tr>
          <tr>
            <td style="color: #94A3B8; font-weight: 600;">Enquiry Source:</td>
            <td style="color: #A78BFA;">${lead.source || 'Website CTA'}</td>
          </tr>
        </table>

        <!-- Project Requirements Box -->
        <div style="margin-top: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px;">
          <div style="font-size: 11px; font-weight: 700; color: #FF7A00; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">PROJECT REQUIREMENTS</div>
          <div style="color: #F8FAFC; font-size: 14px; white-space: pre-wrap;">${lead.requirements || 'No specific requirements entered.'}</div>
        </div>

        <!-- 3 Instant Action Buttons -->
        <div style="margin-top: 24px; text-align: center;">
          <a href="${whatsappUrl}" style="display: inline-block; background: #25D366; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 18px; border-radius: 8px; margin: 4px;">💬 Chat on WhatsApp</a>
          <a href="${telUrl}" style="display: inline-block; background: #FF7A00; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 18px; border-radius: 8px; margin: 4px;">📞 Call Prospect</a>
          <a href="${mailtoUrl}" style="display: inline-block; background: #9333EA; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 18px; border-radius: 8px; margin: 4px;">✉️ Reply via Email</a>
        </div>
      </div>

      <!-- Footer Info -->
      <div style="background: rgba(0,0,0,0.4); padding: 16px 28px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.06);">
        Lead automatically synced to Google Sheets: <em>${CONFIG.SPREADSHEET_NAME}</em> &bull; Amplify Digital
      </div>
    </div>
  </div>`;

  var plainTextBody = [
    '🚀 NEW STRATEGY CALL INQUIRY — AMPLIFY DIGITAL',
    '──────────────────────────────',
    '👤 Name: ' + lead.fullName,
    '📞 Phone: ' + lead.phone,
    '✉️ Email: ' + lead.email,
    '🏢 Organisation: ' + (lead.organisation || 'N/A'),
    '📍 Location: ' + (lead.location || 'N/A'),
    '🏠 Address: ' + (lead.address || 'N/A'),
    '🎯 Service: ' + (lead.service || 'General Inquiry'),
    '💬 Requirement: ' + (lead.requirements || 'N/A'),
    '──────────────────────────────',
    '🆔 Ref ID: ' + enquiryId,
    '📅 Date: ' + dateStr,
  ].join('\n');

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody
  });
}

/**
 * Send short professional acknowledgment email to the visitor
 */
function sendVisitorAcknowledgment(lead, enquiryId) {
  var firstName = lead.fullName.split(' ')[0] || lead.fullName;
  var subject = "We've Received Your Request | Amplify Digital";

  var htmlBody = `
  <div style="background-color: #060412; padding: 35px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #E2E8F0; line-height: 1.6;">
    <div style="max-width: 580px; margin: 0 auto; background: #0E0A24; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden;">
      
      <div style="background: linear-gradient(135deg, #FF7A00 0%, #E02696 50%, #7928CA 100%); padding: 22px 28px;">
        <h1 style="margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 800;">AMPLIFY DIGITAL</h1>
      </div>

      <div style="padding: 28px;">
        <h2 style="color: #FFFFFF; font-size: 18px; margin: 0 0 12px 0;">Hi ${firstName},</h2>
        <p style="color: #CBD5E1; font-size: 14px; margin: 0 0 16px 0;">
          Thank you for reaching out to Amplify Digital! We have received your strategy call request (Reference ID: <strong style="color: #FF7A00;">${enquiryId}</strong>).
        </p>
        <p style="color: #CBD5E1; font-size: 14px; margin: 0 0 16px 0;">
          Our strategy and growth team will review your requirements and get in touch with you shortly via your preferred contact method (<strong>${lead.contactMethod || 'WhatsApp / Phone'}</strong>).
        </p>
        <p style="color: #CBD5E1; font-size: 14px; margin: 0 0 24px 0;">
          If you have urgent questions, feel free to connect with our team directly on WhatsApp or phone at <strong style="color: #38BDF8;">${CONFIG.AGENCY_PHONE}</strong>.
        </p>

        <div style="text-align: left; margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08);">
          <div style="color: #FFFFFF; font-weight: 700; font-size: 14px;">Team Amplify Digital</div>
          <div style="color: #94A3B8; font-size: 12px;">360° Creative, Digital &amp; Growth Studio</div>
          <div style="color: #94A3B8; font-size: 12px;"><a href="${CONFIG.AGENCY_WEBSITE}" style="color: #E879F9; text-decoration: none;">${CONFIG.AGENCY_WEBSITE}</a></div>
        </div>
      </div>
    </div>
  </div>`;

  MailApp.sendEmail({
    to: lead.email,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Send automated WhatsApp alert directly to the owner's WhatsApp number
 * (Uses free CallMeBot WhatsApp Gateway or webhook)
 */
function sendWhatsAppAutomatedAlert(lead, enquiryId, dateStr, timeStr) {
  var cleanPhone = CONFIG.OWNER_WHATSAPP.replace(/[^0-9]/g, '');
  var message = [
    '🚀 *NEW STRATEGY CALL INQUIRY — AMPLIFY DIGITAL*',
    '──────────────────────────────',
    '👤 *Name:* ' + lead.fullName,
    '📞 *Phone:* ' + lead.phone,
    '✉️ *Email:* ' + lead.email,
    lead.organisation ? '🏢 *Organisation:* ' + lead.organisation : '',
    lead.location ? '📍 *Location:* ' + lead.location : '',
    lead.address ? '🏠 *Address:* ' + lead.address : '',
    lead.service ? '🎯 *Service:* ' + lead.service : '',
    lead.requirements ? '💬 *Requirement:* ' + lead.requirements : '',
    '──────────────────────────────',
    '🆔 *Ref ID:* ' + enquiryId,
    '📅 *Time:* ' + dateStr + ' ' + timeStr
  ].filter(function(line) { return line !== ''; }).join('\n');

  var encodedMsg = encodeURIComponent(message);
  var url = 'https://api.callmebot.com/whatsapp.php?phone=' + cleanPhone + '&text=' + encodedMsg + '&apikey=' + CONFIG.CALLMEBOT_API_KEY;

  UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}

/**
 * Return formatted JSON response with CORS headers
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
