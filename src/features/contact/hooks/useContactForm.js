import { useState, useCallback } from 'react';
import { submitContactEnquiry } from '../services/contactService';
import { buildWhatsAppUrl } from '../utils/leadMessageFormatter';

export function useContactForm(initialValues = {}, metadata = {}) {
  const [values, setValues] = useState({
    fullName: initialValues.fullName || '',
    countryCode: initialValues.countryCode || '+91',
    phone: initialValues.phone || '',
    email: initialValues.email || '',
    organisation: initialValues.organisation || '',
    location: initialValues.location || '',
    address: initialValues.address || '',
    service: initialValues.service || '',
    requirements: initialValues.requirements || '',
    contactMethod: initialValues.contactMethod || 'WhatsApp',
    consent: false,
    website_trap: '', // Anti-bot honeypot
    ...initialValues,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value || value.trim().length < 2) {
          return 'Please enter your full name (minimum 2 characters).';
        }
        return '';
      case 'phone': {
        const cleaned = (value || '').replace(/[^0-9]/g, '');
        if (!cleaned || cleaned.length < 7) {
          return 'Please enter a valid phone number.';
        }
        return '';
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      }
      case 'consent':
        if (!value) {
          return 'Please confirm consent to submit your request.';
        }
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {
      fullName: validateField('fullName', values.fullName),
      phone: validateField('phone', values.phone),
      email: validateField('email', values.email),
      consent: validateField('consent', values.consent),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Re-validate if touched
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, finalValue),
      }));
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, finalValue),
    }));
  }, []);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitError(null);

    // Mark all required as touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      consent: true,
    });

    const isValid = validateAll();
    if (!isValid) return;

    // Check honeypot
    if (values.website_trap) {
      console.warn('Bot detected via honeypot field.');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhoneNumber = `${values.countryCode} ${values.phone.trim()}`;
      const payload = {
        ...values,
        phone: fullPhoneNumber,
      };

      const result = await submitContactEnquiry(payload, metadata);

      if (result.success) {
        const fullLead = {
          enquiryId: result.enquiryId,
          fullName: values.fullName,
          countryCode: values.countryCode,
          phone: fullPhoneNumber,
          email: values.email,
          organisation: values.organisation,
          location: values.location,
          address: values.address,
          service: values.service,
          requirements: values.requirements,
          contactMethod: values.contactMethod,
          submittedAt: new Date(),
        };

        setSubmissionResult(fullLead);

        // Auto-launch WhatsApp with complete lead details prefilled in a new tab
        try {
          const waUrl = buildWhatsAppUrl(fullLead, metadata);
          if (typeof window !== 'undefined') {
            window.open(waUrl, '_blank', 'noopener,noreferrer');
          }
        } catch (waErr) {
          console.info('Auto WhatsApp window.open prevented by browser, accessible via confirmation button.');
        }
      } else {
        setSubmitError(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setSubmitError('Unable to send request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setValues({
      fullName: '',
      countryCode: '+91',
      phone: '',
      email: '',
      organisation: '',
      location: '',
      address: '',
      service: '',
      requirements: '',
      contactMethod: 'WhatsApp',
      consent: false,
      website_trap: '',
    });
    setTouched({});
    setErrors({});
    setSubmitError(null);
    setSubmissionResult(null);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    submissionResult,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
}
