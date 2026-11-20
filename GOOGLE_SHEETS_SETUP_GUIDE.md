# Amplify Digital — Google Sheets, Gmail & WhatsApp Integration Setup Guide

This guide explains how to connect your **Amplify Digital** website contact popup directly to your **Google Sheet**, **Gmail inboxes**, and **WhatsApp** so you receive full lead details instantly across all channels.

---

## 1. How the Multi-Channel Delivery Works

When a visitor submits the contact form with their:
- **Full Name**
- **Phone Number**
- **Email Address**
- **Organisation Name**
- **City / Location**
- **Address**
- **Service Interested In**
- **Project Requirements**

The system automatically delivers those details to **three destinations**:

1. **Google Sheets**: A new row is appended to your spreadsheet with a unique Enquiry ID (`AMP-YYYYMM-XXXX`) and timestamp.
2. **Gmail / Email**: An instant, responsive HTML lead dossier is sent to `aditya@amplifydigitalservices.com` with 1-click **Call**, **WhatsApp**, and **Email** buttons.
3. **WhatsApp**:
   - **Direct 1-Click from Visitor**: On form submission, the success screen displays a prominent **"Send Details to WhatsApp Now"** button. Clicking it opens WhatsApp directly to **+91 7879964770** with the entire lead inquiry pre-formatted!
   - **Optional Automated WhatsApp Bot**: Google Apps Script can automatically send a WhatsApp alert to your personal phone number via a free webhook.

---

## 2. Google Sheets & Apps Script Setup (5 Minutes)

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name the spreadsheet:
   ```
   Amplify Digital — Website Enquiries
   ```
3. Rename the first worksheet tab at the bottom to:
   ```
   Strategy Call Leads
   ```

### Step 2: Open Google Apps Script
1. In the Google Sheets top menu, click **Extensions** > **Apps Script**.
2. Delete any existing code in the editor.
3. Open [`google-apps-script/Code.gs`](file:///c:/Users/hp/Desktop/dev.umxie\antigravity\amplify%20digital\google-apps-script\Code.gs), copy the entire code, and paste it into the editor.
4. *(Optional)* At the top of `Code.gs`, adjust the `CONFIG` values:
   - `NOTIFICATION_EMAIL`: `aditya@amplifydigitalservices.com`
   - `OWNER_WHATSAPP`: `917879964770`
5. Click **Save** (💾).

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and select **Web app**.
3. Settings:
   - **Description**: `Amplify Digital Lead API v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Allows website form to submit)*
4. Click **Deploy**.
5. Click **Authorize access**, select your Google account, click **Advanced** > **Go to Untitled (unsafe)**, and click **Allow**.
6. Copy the **Web App URL** (e.g., `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Connect Web App URL to Website
1. Create or open `.env` in the root of your project:
   ```env
   VITE_CONTACT_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
   *(Or paste it into `src/features/contact/config/contactConfig.js`)*.

---

## 3. Optional: Enable 100% Automated WhatsApp Phone Alerts

If you want Google Apps Script to automatically message your WhatsApp phone number immediately whenever a lead is submitted:

1. On your phone's WhatsApp, add the CallMeBot bot phone number: **+34 644 44 24 55**.
2. Send this exact message to that number:
   ```
   I allow callmebot to send me messages
   ```
3. The bot will instantly reply with your free personal **API key** (e.g. `1234567`).
4. In `google-apps-script/Code.gs` line 20, enter:
   ```javascript
   OWNER_WHATSAPP: '917879964770',
   CALLMEBOT_API_KEY: 'YOUR_API_KEY_HERE',
   ```
5. Click **Deploy** > **Manage deployments** > **Edit** > New version > **Deploy**.

Now, whenever anyone submits the form, your phone will buzz with an instant WhatsApp alert containing the full lead details!
