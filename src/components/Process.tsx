import React from 'react';
import {
  Search,
  ClipboardList,
  UserCheck,
  CheckCircle,
  BarChart2,
} from 'lucide-react';

interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: '1',
    title: 'Discovery',
    description: 'Understand your workflow, service requirements, current challenges, and expectations.',
  },
  {
    number: '2',
    title: 'Workflow Assessment',
    description: 'Review scope, systems, access requirements, responsibilities, and reporting needs.',
  },
  {
    number: '3',
    title: 'Onboarding and Setup',
    description: 'Agree on procedures, access, quality checks, communication channels, and escalation paths.',
  },
  {
    number: '4',
    title: 'Service Delivery',
    description: 'Perform the agreed work using documented processes and appropriate review controls.',
  },
  {
    number: '5',
    title: 'Reporting and Review',
    description: 'Provide agreed operational reports, discuss issues, and review opportunities for improvement.',
  },
];

export const Process: React.FC = () => {
  const getStepIcon = (num: string) => {
    switch (num) {
      case '1':
        return <Search className="w-5 h-5 text-[#168EE0]" />;
      case '2':
        return <ClipboardList className="w-5 h-5 text-[#168EE0]" />;
      case '3':
        return <UserCheck className="w-5 h-5 text-[#168EE0]" />;
      case '4':
        return <CheckCircle className="w-5 h-5 text-[#168EE0]" />;
      case '5':
        return <BarChart2 className="w-5 h-5 text-[#168EE0]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#168EE0]" />;
    }
  };

  return (
    <section id="process" className="py-16 lg:py-24 bg-white border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Supporting Text */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-[#F2F9FF] px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Engagement Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            A Clear Process From Day One
          </h2>
          <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
            Our structured approach helps ensure a smooth and organized engagement.
          </p>
        </div>

        {/* Desktop: 5-Step Horizontal Workflow */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {/* Connecting Line in Border Gray #DCE8F2 */}
          <div
            className="absolute top-7 left-[8%] right-[8%] h-[2px] bg-[#DCE8F2] -z-0"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
              {/* Numbered Circle & Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#168EE0] shadow-xs flex items-center justify-center ring-6 ring-[#F2F9FF]">
                  {getStepIcon(step.number)}
                </div>
                <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-[#35A9F5] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {step.number}
                </div>
              </div>

              {/* Step Card Content */}
              <div className="bg-[#F8FBFE] rounded-2xl border border-[#DCE8F2] p-5 w-full flex-1 flex flex-col justify-between hover:border-[#168EE0]/40 hover:bg-[#F2F9FF]/50 transition-colors">
                <h3 className="text-base font-bold text-[#102B55] mb-2.5">
                  Step {step.number} — {step.title}
                </h3>
                <p className="text-xs text-[#536579] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet: Vertical Timeline */}
        <div className="lg:hidden space-y-4 sm:space-y-6 relative before:absolute before:inset-y-4 before:left-[19px] before:w-[2px] before:bg-[#DCE8F2]">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#168EE0] flex items-center justify-center text-xs font-bold text-[#102B55] shrink-0 z-10 shadow-xs ring-4 ring-white">
                {step.number}
              </div>

              <div className="bg-[#F8FBFE] rounded-2xl border border-[#DCE8F2] p-4 sm:p-5 flex-1 shadow-2xs">
                <h3 className="text-sm sm:text-base font-bold text-[#102B55] mb-1 sm:mb-1.5">
                  Step {step.number} — {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#536579] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
