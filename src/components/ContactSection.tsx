import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCw,
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { ConsultationFormData, ConsultationResponse } from '../types';

const FORMSPREE_FORM_ID = 'xqppkrwb';

const ORGANIZATION_TYPES = [
  'Hospital or Health System',
  'Physician Group or Medical Practice',
  'Medical Billing Company',
  'RCM Company',
  'Other Healthcare Organization',
];

const AVAILABLE_SERVICES = [
  'Medical Billing',
  'Medical Coding',
  'Denial Management',
  'Accounts Receivable Follow-Up',
  'End-to-End RCM',
  'Other',
];

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    businessEmail: '',
    organization: '',
    jobTitle: '',
    organizationType: '',
    servicesRequired: preselectedService ? [preselectedService] : [],
    message: '',
    termsAgreed: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submissionResponse, setSubmissionResponse] = useState<ConsultationResponse | null>(null);

  // Formspree React hook
  const [formspreeState, handleFormspreeSubmit, resetFormspree] = useForm(FORMSPREE_FORM_ID);

  const toggleService = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.servicesRequired.includes(serviceName);
      return {
        ...prev,
        servicesRequired: exists
          ? prev.servicesRequired.filter((s) => s !== serviceName)
          : [...prev.servicesRequired, serviceName],
      };
    });
    if (formErrors.servicesRequired) {
      setFormErrors((prev) => ({ ...prev, servicesRequired: '' }));
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim() || !emailRegex.test(formData.businessEmail.trim())) {
      errors.businessEmail = 'Please provide a valid business email address.';
    }

    if (!formData.organization.trim() || formData.organization.trim().length < 2) {
      errors.organization = 'Please enter your company or organization name.';
    }

    if (!formData.organizationType) {
      errors.organizationType = 'Please select your organization type.';
    }

    if (formData.servicesRequired.length === 0) {
      errors.servicesRequired = 'Please select at least one required service.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a brief description of your requirements (at least 10 characters).';
    }

    const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/;
    if (ssnPattern.test(formData.message)) {
      errors.message =
        'Notice: Please do not include Social Security numbers or patient identifiers in this inquiry.';
    }

    if (!formData.termsAgreed) {
      errors.termsAgreed = 'Please confirm that no Protected Health Information (PHI) is included in this submission.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    const confCode = `VH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    // Prepare confirmation data for local UI state
    setSubmissionResponse({
      success: true,
      confirmationCode: confCode,
      receivedAt: timestamp,
      organization: formData.organization.trim(),
      servicesRequired: formData.servicesRequired,
      message: 'Your consultation request has been received. A senior healthcare operations lead from VELTRAVA HEALTH will review your workflow requirements and respond within one business day.',
    });

    try {
      // 1. Submit lead to Formspree backend
      await handleFormspreeSubmit(e);

      // 2. Dual-log to local server endpoint
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            confirmationCode: confCode,
          }),
        });
      } catch {
        // Non-critical local persistence fallback
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setApiError(err.message || 'An error occurred while transmitting your request to Formspree. Please try again.');
    }
  };

  const handleReset = () => {
    resetFormspree();
    setFormData({
      fullName: '',
      businessEmail: '',
      organization: '',
      jobTitle: '',
      organizationType: '',
      servicesRequired: [],
      message: '',
      termsAgreed: false,
    });
    setFormErrors({});
    setSubmissionResponse(null);
    setApiError(null);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 border-t border-[#DCE8F2] bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.96), rgba(242, 249, 255, 0.92)), url('/assets/aistudio/06_contact_section_background_7430aaff.jpg')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 5 Columns on Desktop */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#168EE0] bg-white px-3.5 py-1.5 rounded-full border border-[#DCE8F2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20C7E8]" aria-hidden="true"></span>
              <span>GET STARTED TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
              Let's Discuss Your Revenue Cycle Needs.
            </h2>

            <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
              Tell us about your organization and the billing or coding support you are looking for.
            </p>

            <div className="pt-4 space-y-4 text-xs sm:text-sm text-[#536579]">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-[#DCE8F2] shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#168EE0] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#102B55]">Confidentiality Assurance</span>
                  <p className="text-xs text-[#536579] mt-0.5">
                    Your inquiry is reviewed directly by our executive operations team. We execute non-disclosure agreements (NDAs) and BAAs upon request.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-[#DCE8F2] shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#20C7E8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#102B55]">Fast Discovery Scheduling</span>
                  <p className="text-xs text-[#536579] mt-0.5">
                    We respond within one business day to coordinate a discovery discussion tailored to your specialty and systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 7 Columns on Desktop - Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE8F2] p-4 min-[380px]:p-6 sm:p-10 shadow-sm">
            {(formspreeState.succeeded && submissionResponse) ? (
              /* Success State */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#F2F9FF] border border-[#168EE0]/20 text-[#168EE0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[#168EE0] bg-[#F2F9FF] px-3 py-1 rounded-full border border-[#DCE8F2]">
                    Confirmation Code: {submissionResponse.confirmationCode}
                  </span>
                  <h3 className="text-2xl font-bold text-[#102B55] pt-2">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-sm text-[#536579] max-w-xl mx-auto leading-relaxed">
                    {submissionResponse.message}
                  </p>
                </div>

                <div className="bg-[#F8FBFE] rounded-2xl border border-[#DCE8F2] p-5 text-left text-xs sm:text-sm space-y-3 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-[#DCE8F2] pb-2">
                    <span className="text-[#718096]">Organization:</span>
                    <span className="font-semibold text-[#102B55]">{submissionResponse.organization}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8F2] pb-2">
                    <span className="text-[#718096]">Timestamp:</span>
                    <span className="font-mono text-[#536579]">
                      {new Date(submissionResponse.receivedAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#718096] block mb-1">Services Inquired:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {submissionResponse.servicesRequired.map((svc) => (
                        <span
                          key={svc}
                          className="text-xs bg-[#F2F9FF] text-[#168EE0] border border-[#DCE8F2] px-2.5 py-0.5 rounded-md font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-semibold text-[#536579] bg-[#F8FBFE] hover:bg-[#F2F9FF] border border-[#DCE8F2] rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Inquiry Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Hidden fields for Formspree email notification configuration */}
                <input
                  type="hidden"
                  name="_subject"
                  value={`New Consultation Lead: ${formData.organization || 'Inquiry'} - VELTRAVA HEALTH`}
                />
                <input
                  type="hidden"
                  name="servicesRequired"
                  value={formData.servicesRequired.join(', ')}
                />
                <input
                  type="hidden"
                  name="antiPhiAdherence"
                  value={formData.termsAgreed ? 'Verified Zero-PHI' : 'Not Confirmed'}
                />

                {(apiError || formspreeState.errors) && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Notice: </span>
                      {apiError ? apiError : <ValidationError errors={formspreeState.errors} />}
                    </div>
                  </div>
                )}

                {/* Two-Column Row: Full Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all ${
                        formErrors.fullName ? 'border-red-400' : 'border-[#DCE8F2]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.fullName}</p>
                    )}
                    <ValidationError prefix="Full Name" field="fullName" errors={formspreeState.errors} className="mt-1 text-xs text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="businessEmail" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="name@organization.com"
                      className={`w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all ${
                        formErrors.businessEmail ? 'border-red-400' : 'border-[#DCE8F2]'
                      }`}
                    />
                    {formErrors.businessEmail && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.businessEmail}</p>
                    )}
                    <ValidationError prefix="Email" field="email" errors={formspreeState.errors} className="mt-1 text-xs text-red-600" />
                  </div>
                </div>

                {/* Two-Column Row: Company & Job Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="organization" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                      Company or Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. MetroHealth Physicians LLC"
                      className={`w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all ${
                        formErrors.organization ? 'border-red-400' : 'border-[#DCE8F2]'
                      }`}
                    />
                    {formErrors.organization && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.organization}</p>
                    )}
                    <ValidationError prefix="Organization" field="organization" errors={formspreeState.errors} className="mt-1 text-xs text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g. Practice Administrator / CFO"
                      className="w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border border-[#DCE8F2] rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all"
                    />
                  </div>
                </div>

                {/* Type of Organization Dropdown */}
                <div>
                  <label htmlFor="organizationType" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                    Type of Organization <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all ${
                      formErrors.organizationType ? 'border-red-400' : 'border-[#DCE8F2]'
                    }`}
                  >
                    <option value="">Select your organization type...</option>
                    {ORGANIZATION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {formErrors.organizationType && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.organizationType}</p>
                  )}
                  <ValidationError prefix="Organization Type" field="organizationType" errors={formspreeState.errors} className="mt-1 text-xs text-red-600" />
                </div>

                {/* Services Required Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-2">
                    Services Required <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AVAILABLE_SERVICES.map((service) => {
                      const isChecked = formData.servicesRequired.includes(service);
                      return (
                        <label
                          key={service}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors min-h-[44px] ${
                            isChecked
                              ? 'bg-[#F2F9FF] border-[#168EE0] text-[#102B55] font-semibold'
                              : 'bg-white hover:bg-[#F8FBFE] border-[#DCE8F2] text-[#536579]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleService(service)}
                            className="w-4 h-4 text-[#168EE0] rounded border-[#DCE8F2] focus:ring-[#168EE0]"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                  {formErrors.servicesRequired && (
                    <p className="mt-1.5 text-xs text-red-600">{formErrors.servicesRequired}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#102B55] uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your organization and the billing or coding support you are looking for..."
                    className={`w-full px-3.5 py-2.5 bg-white text-base sm:text-sm text-[#102B55] border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#168EE0] transition-all ${
                      formErrors.message ? 'border-red-400' : 'border-[#DCE8F2]'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.message}</p>
                  )}
                  <ValidationError prefix="Message" field="message" errors={formspreeState.errors} className="mt-1 text-xs text-red-600" />
                </div>

                {/* Privacy Notice & PHI Protection Guard */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8FBFE] border border-[#DCE8F2] space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-[#536579]">
                    <ShieldCheck className="w-4 h-4 text-[#168EE0] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#102B55]">Privacy Notice: </span>
                      Do not request or submit patient records, medical histories, insurance numbers, or other protected health information through this public form.
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-[#536579] cursor-pointer pt-2 border-t border-[#DCE8F2] min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={formData.termsAgreed}
                      onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                      className="w-4 h-4 text-[#168EE0] rounded border-[#DCE8F2] focus:ring-[#168EE0] mt-0.5"
                    />
                    <span>
                      I confirm this inquiry contains only business operational information and zero patient health information (PHI). <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {formErrors.termsAgreed && (
                    <p className="text-xs text-red-600 pl-6">{formErrors.termsAgreed}</p>
                  )}
                </div>

                {/* Submit Button in Corporate Blue */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formspreeState.submitting}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-xl shadow-xs hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#168EE0] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formspreeState.submitting ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting Consultation Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule a Consultation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
