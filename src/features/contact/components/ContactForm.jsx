import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contactConfig';
import QuickContactActions from './QuickContactActions';
import styles from '../styles/ContactForm.module.css';

export default function ContactForm({ formState, modalSource, modalIntent }) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formState;

  const isStrategyCall = modalIntent === 'strategy-call' || modalSource.includes('Strategy Call');
  const submitButtonText = isStrategyCall ? 'Book a Strategy Call' : "Let's Talk";

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
      {/* Honeypot field for anti-bot protection */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_trap">Leave this field blank</label>
        <input
          type="text"
          id="website_trap"
          name="website_trap"
          value={values.website_trap || ''}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* Grid of Inputs */}
      <div className={styles.inputsGrid}>
        
        {/* Field 1: Your Name * */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="fullName">
            Your Name <span className={styles.requiredAsterisk}>*</span>
          </label>
          <div className={`${styles.inputWrapper} ${touched.fullName && errors.fullName ? styles.inputError : ''}`}>
            <User size={16} className={styles.inputIcon} />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={styles.inputField}
              autoComplete="name"
              disabled={isSubmitting}
            />
          </div>
          {touched.fullName && errors.fullName && (
            <span className={styles.errorMessage}>{errors.fullName}</span>
          )}
        </div>

        {/* Field 2: Phone Number * */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="phone">
            Phone Number <span className={styles.requiredAsterisk}>*</span>
          </label>
          <div className={`${styles.phoneInputWrapper} ${touched.phone && errors.phone ? styles.inputError : ''}`}>
            {/* Country Code Select */}
            <div className={styles.countryCodeSelectWrap}>
              <Phone size={15} className={styles.phoneIconLeading} />
              <select
                name="countryCode"
                value={values.countryCode}
                onChange={handleChange}
                className={styles.countryCodeSelect}
                disabled={isSubmitting}
                aria-label="Country Calling Code"
              >
                {CONTACT_CONFIG.COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Phone Input */}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your number"
              className={styles.phoneInputField}
              autoComplete="tel"
              disabled={isSubmitting}
            />
          </div>
          {touched.phone && errors.phone && (
            <span className={styles.errorMessage}>{errors.phone}</span>
          )}
        </div>

        {/* Field 3: Email Address * */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="email">
            Email Address <span className={styles.requiredAsterisk}>*</span>
          </label>
          <div className={`${styles.inputWrapper} ${touched.email && errors.email ? styles.inputError : ''}`}>
            <Mail size={16} className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className={styles.inputField}
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>
          {touched.email && errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        {/* Field 4: Organisation Name */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="organisation">
            Organisation Name
          </label>
          <div className={styles.inputWrapper}>
            <Building2 size={16} className={styles.inputIcon} />
            <input
              type="text"
              id="organisation"
              name="organisation"
              value={values.organisation}
              onChange={handleChange}
              placeholder="Enter organisation name"
              className={styles.inputField}
              autoComplete="organization"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Field 5: Location */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="location">
            Location
          </label>
          <div className={styles.inputWrapper}>
            <MapPin size={16} className={styles.inputIcon} />
            <select
              id="location"
              name="location"
              value={values.location}
              onChange={handleChange}
              className={styles.selectField}
              disabled={isSubmitting}
            >
              <option value="">Select location</option>
              {CONTACT_CONFIG.LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 6: Address */}
        <div className={styles.fieldCol}>
          <label className={styles.fieldLabel} htmlFor="address">
            Address
          </label>
          <div className={styles.inputWrapper}>
            <BookOpen size={16} className={styles.inputIcon} />
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className={styles.inputField}
              disabled={isSubmitting}
            />
          </div>
        </div>

      </div>

      {/* Field 7: Service Category (Optional pills/dropdown) */}
      <div className={styles.serviceFieldRow}>
        <label className={styles.fieldLabel} htmlFor="service">
          Service Interested In
        </label>
        <div className={styles.inputWrapper}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            className={styles.selectField}
            disabled={isSubmitting}
          >
            <option value="">Select a service category (optional)</option>
            {CONTACT_CONFIG.SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Field 8: Multiline Requirement Textarea */}
      <div className={styles.textareaBlock}>
        <label className={styles.fieldLabel} htmlFor="requirements">
          <MessageSquare size={14} className={styles.labelIcon} />
          <span>Tell Us About Your Requirement</span>
        </label>
        <div className={styles.textareaWrapper}>
          <textarea
            id="requirements"
            name="requirements"
            rows={3}
            value={values.requirements}
            onChange={handleChange}
            placeholder="e.g. Branding, Digital Marketing, Video Production, Website, etc."
            className={styles.textareaField}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className={styles.consentRow}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={handleChange}
            className={styles.checkboxInput}
            disabled={isSubmitting}
          />
          <span className={styles.checkboxCustom} />
          <span className={styles.consentText}>
            I consent to Amplify Digital processing my details to respond to this request.{' '}
            <a href="#privacy" className={styles.privacyLink} onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
          </span>
        </label>
        {touched.consent && errors.consent && (
          <span className={styles.consentError}>{errors.consent}</span>
        )}
      </div>

      {/* Server / Network Error Banner */}
      {submitError && (
        <div className={styles.errorBanner} role="alert">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Primary Submit Button */}
      <div className={styles.submitRow}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnDisabled : ''}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className={styles.spinnerIcon} />
              <span>Sending Your Request...</span>
            </>
          ) : (
            <>
              <Calendar size={18} className={styles.btnCalendarIcon} />
              <span>{submitButtonText}</span>
              <ArrowRight size={17} className={styles.btnArrowIcon} />
            </>
          )}
        </button>
      </div>

      {/* Quick Contact Options at the base of the form */}
      <QuickContactActions formValues={values} modalSource={modalSource} />
    </form>
  );
}
