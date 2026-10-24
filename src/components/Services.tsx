import React, { useState, useEffect } from 'react';
import {
  FileText,
  Code2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  X,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { ServiceItem } from '../types';

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'medical-billing',
    title: 'Medical Billing Services',
    shortDesc:
      'Claim preparation and submission, payment posting, claims follow-up, and billing workflow support.',
    iconName: 'billing',
    keyWorkflows: [
      'Demographics and insurance claim validation',
      'Electronic claim submission (837P / 837I)',
      'ERA / EOB payment and adjustment posting',
      'Accounts receivable follow-up on outstanding balances',
    ],
    deliverables: [
      'Clean claim scrubbing before clearinghouse dispatch',
      'Daily/weekly payment reconciliation logs',
      'Payer-specific billing guideline enforcement',
      'Patient billing inquiry support (if requested)',
    ],
    reviewControls:
      'Two-step verification prior to clearinghouse transmission; regular variance check against bank deposits.',
  },
  {
    id: 'medical-coding',
    title: 'Medical Coding Services',
    shortDesc:
      'Support for ICD-10-CM, CPT, HCPCS coding, documentation review, and coding quality checks.',
    iconName: 'coding',
    keyWorkflows: [
      'ICD-10-CM diagnosis code assignment',
      'CPT and HCPCS procedure code abstraction',
      'Modifier review (e.g. 25, 26, 59, TC, RT/LT)',
      'Clinical documentation review and query logs',
    ],
    deliverables: [
      'Documented coding audit reports',
      'Documentation specificity query templates',
      'NCCI edit checks and bundling review',
      'Specialty-specific fee schedule alignment',
    ],
    reviewControls:
      'Certified peer audits and regular sample quality scoring against provider medical records.',
  },
  {
    id: 'denial-management',
    title: 'Denial Management',
    shortDesc:
      'Denial tracking, reason analysis, follow-up, and appeal support where authorized.',
    iconName: 'denial',
    keyWorkflows: [
      'CARC and RARC root-cause categorization',
      'Timely filing deadline tracking',
      'Payer reconsiderations and appeal package assembly',
      'Preventive workflow feedback for practice staff',
    ],
    deliverables: [
      'Comprehensive denial log by root cause & payer',
      'Standardized appeal documentation submissions',
      'Underpayment identification and payer follow-up',
      'Monthly actionable trend analysis',
    ],
    reviewControls:
      'Escalation rules with designated lead oversight; structured timeline alerts for appeal expirations.',
  },
  {
    id: 'end-to-end-rcm',
    title: 'End-to-End RCM',
    shortDesc:
      'From eligibility verification to payment posting and accounts receivable follow-up, with coordinated support.',
    iconName: 'rcm',
    keyWorkflows: [
      'Pre-service eligibility and benefit verification',
      'Prior authorization tracking & documentation checks',
      'Integrated coding, charge entry, and submission',
      'Complete A/R resolution and financial reporting',
    ],
    deliverables: [
      'Single accountable operating workflow',
      'Unified monthly revenue cycle performance summary',
      'Bi-weekly operational sync with practice management',
      'Standard operating procedure documentation',
    ],
    reviewControls:
      'End-to-end milestone audits from patient intake data to final zero-balance resolution.',
  },
];

interface ServicesProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Lock body scroll when modal is active on mobile
  useEffect(() => {
    if (selectedService) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedService]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'medical-billing':
        return <FileText className="w-6 h-6 text-[#168EE0]" aria-hidden="true" />;
      case 'medical-coding':
        return <Code2 className="w-6 h-6 text-[#168EE0]" aria-hidden="true" />;
      case 'denial-management':
        return <AlertTriangle className="w-6 h-6 text-[#168EE0]" aria-hidden="true" />;
      case 'end-to-end-rcm':
        return <RotateCcw className="w-6 h-6 text-[#168EE0]" aria-hidden="true" />;
      default:
        return <FileText className="w-6 h-6 text-[#168EE0]" aria-hidden="true" />;
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-white border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-[#F2F9FF] px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Operational Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            Revenue Cycle Support for Your Organization
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#536579] leading-relaxed">
            Explore the services we offer to help manage your healthcare billing and coding workflows.
          </p>
        </div>

        {/* Four Cards: 1 column on mobile, 2 on tablet, 4 in one row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-[#F8FBFE] rounded-2xl border border-[#DCE8F2] p-5 sm:p-6 flex flex-col justify-between hover:border-[#168EE0]/50 hover:bg-[#F2F9FF]/60 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="space-y-3.5 sm:space-y-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE8F2] flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:border-[#168EE0]/30 transition-transform">
                  {getServiceIcon(service.id)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#102B55] tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#536579] leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#DCE8F2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#168EE0] hover:text-[#102B55] active:text-[#0e5fa0] transition-colors focus-visible:outline-2 focus-visible:outline-[#168EE0] rounded cursor-pointer"
                >
                  <span>Learn More</span>
                  <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white border border-[#DCE8F2] group-hover:bg-[#168EE0] text-[#168EE0] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-Optimized Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#102B55]/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl border border-[#DCE8F2] shadow-2xl max-w-2xl w-full p-5 sm:p-8 relative max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 44px Accessible Close Button */}
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#718096] hover:text-[#102B55] rounded-xl hover:bg-[#F2F9FF] active:bg-[#E8F4FF] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F2F9FF] border border-[#DCE8F2] flex items-center justify-center shrink-0">
                {getServiceIcon(selectedService.id)}
              </div>
              <div>
                <h3 id="service-modal-title" className="text-lg sm:text-xl font-bold text-[#102B55] leading-tight">
                  {selectedService.title}
                </h3>
                <span className="text-[11px] sm:text-xs text-[#718096] font-medium block mt-0.5">
                  Detailed Operational Scope &amp; Quality Controls
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#536579] leading-relaxed mb-5">
              {selectedService.shortDesc}
            </p>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
              <div className="bg-[#F8FBFE] p-3.5 sm:p-4 rounded-xl border border-[#DCE8F2]">
                <span className="font-semibold text-[#102B55] block mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#168EE0]" />
                  Key Operational Procedures
                </span>
                <ul className="space-y-1.5 text-[#536579]">
                  {selectedService.keyWorkflows.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20C7E8] mt-2 shrink-0"></span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8FBFE] p-3.5 sm:p-4 rounded-xl border border-[#DCE8F2]">
                <span className="font-semibold text-[#102B55] block mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#168EE0]" />
                  Deliverables &amp; Client Reporting
                </span>
                <ul className="space-y-1.5 text-[#536579]">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-[#DCE8F2] bg-[#F2F9FF] text-xs text-[#102B55]">
                <div className="font-semibold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#168EE0]" />
                  Quality &amp; Review Controls
                </div>
                <p className="text-[#536579] leading-relaxed">{selectedService.reviewControls}</p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-[#DCE8F2] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] sm:text-xs text-[#718096] text-center sm:text-left">
                Service parameters are customized to your EHR and practice workflow.
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onSelectServiceForInquiry) {
                    onSelectServiceForInquiry(selectedService.title);
                  }
                  setSelectedService(null);
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-xl transition-colors cursor-pointer flex items-center justify-center"
              >
                Inquire About This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
