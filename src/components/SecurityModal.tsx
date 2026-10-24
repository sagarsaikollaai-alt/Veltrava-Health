import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, RotateCw } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const FORMSPREE_FORM_ID = 'xqppkrwb';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    organization: '',
    inquiryType: 'Vendor Risk Assessment Questionnaire',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Formspree React hook
  const [formspreeState, handleFormspreeSubmit, resetFormspree] = useForm(FORMSPREE_FORM_ID);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.businessEmail.trim() || !formData.organization.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const ref = `SEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);

    try {
      await handleFormspreeSubmit(e);

      // Local API logging
      try {
        await fetch('/api/security-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, referenceCode: ref }),
        });
      } catch {
        // Non-blocking
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with security desk.');
    }
  };

  const handleCloseAndReset = () => {
    resetFormspree();
    setSubmittedRef(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#102B55]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-[#DCE8F2] shadow-2xl max-w-xl w-full p-4 min-[380px]:p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#718096] hover:text-[#102B55] rounded-xl hover:bg-[#F2F9FF] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#F2F9FF] border border-[#DCE8F2] flex items-center justify-center text-[#168EE0]">
            <ShieldCheck className="w-6 h-6 text-[#168EE0]" />
          </div>
          <div>
            <h3 id="security-modal-title" className="text-xl font-bold text-[#102B55]">
              Security &amp; Vendor Risk Review
            </h3>
            <span className="text-xs text-[#718096] font-medium">
              Information Security Governance &amp; BAA Readiness
            </span>
          </div>
        </div>

        {(formspreeState.succeeded && submittedRef) ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F2F9FF] text-[#168EE0] border border-[#168EE0]/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-[#168EE0] bg-[#F2F9FF] px-2.5 py-1 rounded-full border border-[#DCE8F2]">
                Reference: {submittedRef}
              </span>
              <h4 className="text-lg font-bold text-[#102B55] pt-2">
                Security Request Logged
              </h4>
              <p className="text-xs sm:text-sm text-[#536579] max-w-md mx-auto leading-relaxed">
                Thank you. Our operations and compliance liaison will transmit our administrative safeguard summary and standard BAA review package to your business email.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseAndReset}
              className="mt-4 px-5 py-2 text-xs font-semibold text-[#536579] bg-[#F8FBFE] hover:bg-[#F2F9FF] border border-[#DCE8F2] rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs sm:text-sm text-[#536579] mb-5 leading-relaxed">
              If your organization requires a vendor-risk security packet, completed questionnaire (e.g. SIG Lite, CAIQ), or a standard HIPAA Business Associate Agreement review, submit your request below.
            </p>

            {(errorMsg || formspreeState.errors) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  {errorMsg ? errorMsg : <ValidationError errors={formspreeState.errors} />}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <input
                type="hidden"
                name="_subject"
                value={`Security & Vendor Risk Inquiry: ${formData.organization || 'Inquiry'} - VELTRAVA HEALTH`}
              />
              <input
                type="hidden"
                name="formType"
                value="Security & Vendor Risk Review"
              />
              <input
                type="hidden"
                name="referenceCode"
                value={submittedRef || ''}
              />

              <div>
                <label className="block font-semibold text-[#102B55] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Doe, Compliance Officer"
                  className="w-full px-3.5 py-2.5 sm:py-2 border border-[#DCE8F2] rounded-xl text-base sm:text-sm text-[#102B55] focus:outline-none focus:ring-2 focus:ring-[#168EE0]"
                />
                <ValidationError prefix="Full Name" field="fullName" errors={formspreeState.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label className="block font-semibold text-[#102B55] mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  placeholder="compliance@hospital.org"
                  className="w-full px-3.5 py-2.5 sm:py-2 border border-[#DCE8F2] rounded-xl text-base sm:text-sm text-[#102B55] focus:outline-none focus:ring-2 focus:ring-[#168EE0]"
                />
                <ValidationError prefix="Email" field="email" errors={formspreeState.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label className="block font-semibold text-[#102B55] mb-1">
                  Organization / Practice <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Regional Health Partners"
                  className="w-full px-3.5 py-2.5 sm:py-2 border border-[#DCE8F2] rounded-xl text-base sm:text-sm text-[#102B55] focus:outline-none focus:ring-2 focus:ring-[#168EE0]"
                />
                <ValidationError prefix="Organization" field="organization" errors={formspreeState.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label className="block font-semibold text-[#102B55] mb-1">
                  Request Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-2 border border-[#DCE8F2] rounded-xl text-base sm:text-sm text-[#102B55] focus:outline-none focus:ring-2 focus:ring-[#168EE0]"
                >
                  <option value="Vendor Risk Assessment Questionnaire">
                    Vendor Risk Assessment Questionnaire
                  </option>
                  <option value="Business Associate Agreement (BAA) Review">
                    Business Associate Agreement (BAA) Review
                  </option>
                  <option value="Technical Safeguards & Architecture Overview">
                    Technical Safeguards &amp; Architecture Overview
                  </option>
                  <option value="General Security & Privacy Inquiry">
                    General Security &amp; Privacy Inquiry
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#102B55] mb-1">
                  Specific Requirements or Timelines
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. We require questionnaire response within 10 business days..."
                  className="w-full px-3.5 py-2.5 sm:py-2 border border-[#DCE8F2] rounded-xl text-base sm:text-sm text-[#102B55] focus:outline-none focus:ring-2 focus:ring-[#168EE0]"
                />
                <ValidationError prefix="Notes" field="notes" errors={formspreeState.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formspreeState.submitting}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
                >
                  {formspreeState.submitting ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Recording Request...</span>
                    </>
                  ) : (
                    <span>Submit Security Request</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
