import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { FaqItem } from '../types';

const FAQ_LIST: FaqItem[] = [
  {
    category: 'Billing',
    question: 'What medical billing services do you offer?',
    answer:
      'We offer claim preparation and submission, payment and adjustment posting, claims follow-up, accounts receivable management, and billing workflow support. Service scope is confirmed during initial consultation.',
  },
  {
    category: 'Coding',
    question: 'What medical coding services do you provide?',
    answer:
      'We support ICD-10-CM, CPT, and HCPCS coding, documentation review, coding quality checks, and modifier assignment, according to certified staff capabilities and agreed practice specialty guidelines.',
  },
  {
    category: 'Operations',
    question: 'Which healthcare organizations do you support?',
    answer:
      'We work with independent physician practices, specialty medical groups, hospital finance teams, ambulatory surgery centers, and established RCM firms seeking dedicated operational support.',
  },
  {
    category: 'Operations',
    question: 'How does your onboarding process work?',
    answer:
      'Onboarding follows our 5-step methodology: Discovery, Workflow Assessment, Onboarding and Setup, Service Delivery, and Reporting. We execute a BAA, define access credentials, and calibrate SOPs before live production.',
  },
  {
    category: 'Security',
    question: 'How do you approach data security?',
    answer:
      'We implement role-based access control, multi-factor authentication (MFA), transport encryption, and strict device policies prohibiting local data downloads. We execute formal Business Associate Agreements (BAAs) prior to service launch.',
  },
  {
    category: 'Operations',
    question: 'Can you support our existing billing software?',
    answer:
      'Yes. Our team connects remotely to your practice management system or electronic health record (EHR) through authorized credentials, avoiding disruptive software changes or data migrations.',
  },
  {
    category: 'Operations',
    question: 'How is pricing determined?',
    answer:
      'Pricing is structured based on your organization’s service requirements, monthly claim volumes, specialty complexity, and staffing model. Transparent fee arrangements are agreed upon during the consultation phase.',
  },
  {
    category: 'Operations',
    question: 'How can we discuss our requirements?',
    answer:
      'You can schedule a consultation using our inquiry form below. An operational leader will review your practice requirements and arrange an introductory discussion.',
  },
];

interface FaqProps {
  onOpenConsultation: () => void;
}

export const Faq: React.FC<FaqProps> = ({ onOpenConsultation }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const leftColumnFaqs = FAQ_LIST.slice(0, 4);
  const rightColumnFaqs = FAQ_LIST.slice(4, 8);

  const renderFaqItem = (faq: FaqItem, index: number) => {
    const isOpen = openIndexes.includes(index);
    const faqId = `faq-content-${index}`;
    const buttonId = `faq-btn-${index}`;

    return (
      <div
        key={index}
        className="bg-white rounded-2xl border border-[#DCE8F2] overflow-hidden transition-all shadow-2xs hover:border-[#168EE0]/30"
      >
        <button
          id={buttonId}
          type="button"
          onClick={() => toggleAccordion(index)}
          aria-expanded={isOpen}
          aria-controls={faqId}
          className="w-full min-h-[48px] py-3.5 sm:py-5 px-4 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus-visible:outline-2 focus-visible:outline-[#168EE0] cursor-pointer"
        >
          <span className="text-sm sm:text-base font-bold text-[#102B55] leading-snug">
            {faq.question}
          </span>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
              isOpen ? 'bg-[#168EE0] text-white' : 'bg-[#F2F9FF] text-[#168EE0] border border-[#DCE8F2]'
            }`}
          >
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
        </button>

        {isOpen && (
          <div
            id={faqId}
            role="region"
            aria-labelledby={buttonId}
            className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#536579] leading-relaxed border-t border-[#DCE8F2]/60"
          >
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F2F9FF] border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Supporting Text */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-white px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
            Quick answers to common questions.
          </p>
        </div>

        {/* Desktop: Two-Column FAQ Accordion; Mobile: Single Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            {leftColumnFaqs.map((faq, idx) => renderFaqItem(faq, idx))}
          </div>
          <div className="space-y-4">
            {rightColumnFaqs.map((faq, idx) => renderFaqItem(faq, idx + 4))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-[#536579]">
          <span>Have an operational or software-specific question?</span>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="min-h-[44px] inline-flex items-center justify-center gap-1 font-semibold text-[#168EE0] hover:text-[#102B55] underline underline-offset-4 cursor-pointer py-1"
          >
            <span>Ask our operations team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
