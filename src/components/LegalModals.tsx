import React, { useEffect } from 'react';
import { X, Shield, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'accessibility' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;

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
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#102B55]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-[#DCE8F2] shadow-2xl max-w-2xl w-full p-4 min-[380px]:p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#718096] hover:text-[#102B55] rounded-xl hover:bg-[#F2F9FF] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#536579]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[#168EE0]" />
              <h3 id="legal-modal-title" className="text-xl font-bold text-[#102B55]">
                Website Privacy Policy
              </h3>
            </div>
            <p className="text-[#718096] font-mono text-[11px]">
              Last Updated: {new Date().getFullYear()}
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">1. Scope &amp; Non-Collection of PHI</h4>
            <p>
              This Privacy Policy applies to website visitors and business inquiries submitted to VELTRAVA HEALTH. This public website is designed strictly for business-to-business communications. We do not collect or request Protected Health Information (PHI) through public website forms.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">2. Information We Collect</h4>
            <p>
              When you submit a consultation or security inquiry, we collect business contact details: full name, corporate email address, organization name, job title, and operational workflow requirements.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">3. Business Associate Agreements</h4>
            <p>
              Operational healthcare data is only handled following the execution of a formal Business Associate Agreement (BAA) and governed by strict administrative, physical, and technical safeguards.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">4. Data Retention &amp; Disclosure</h4>
            <p>
              We do not sell, rent, or monetize business contact details. Information is retained solely to facilitate service evaluation and direct communication.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#536579]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-[#168EE0]" />
              <h3 id="legal-modal-title" className="text-xl font-bold text-[#102B55]">
                Terms of Use
              </h3>
            </div>
            <p className="text-[#718096] font-mono text-[11px]">
              Last Updated: {new Date().getFullYear()}
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">1. Informational Purpose</h4>
            <p>
              All materials and service descriptions presented on this website are provided for commercial informational purposes only and do not constitute binding service level commitments or guarantees of financial reimbursement.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">2. Service Scoping &amp; Contracts</h4>
            <p>
              Actual revenue cycle operations, medical billing scopes, medical coding specialties, and audit workflows are governed exclusively by definitive written master service agreements, statements of work, and Business Associate Agreements executed between VELTRAVA HEALTH and authorized client representatives.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">3. Intellectual Property</h4>
            <p>
              The VELTRAVA HEALTH brand name, logo, workflow methodologies, and website content are the intellectual property of VELTRAVA HEALTH.
            </p>
          </div>
        )}

        {type === 'accessibility' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#536579]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-[#168EE0]" />
              <h3 id="legal-modal-title" className="text-xl font-bold text-[#102B55]">
                Accessibility Statement
              </h3>
            </div>
            <p className="text-[#718096] font-mono text-[11px]">
              Compliance Standard: WCAG 2.1 Level AA
            </p>
            <p>
              VELTRAVA HEALTH is committed to ensuring digital accessibility for healthcare professionals, administrators, and visitors with disabilities. We continuously optimize user experience across our digital properties in conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
            <h4 className="font-bold text-[#102B55] text-sm">Design Safeguards Implemented:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>High-contrast typography adhering to minimum 4.5:1 contrast ratios.</li>
              <li>Visible keyboard focus outlines across all interactive controls.</li>
              <li>Semantic HTML5 landmarks and ARIA attributes for screen reader accessibility.</li>
              <li>Respect for reduced-motion system preferences.</li>
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#DCE8F2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[84px] inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#536579] bg-[#F8FBFE] hover:bg-[#F2F9FF] border border-[#DCE8F2] rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
