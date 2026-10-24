import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreServices }) => {
  return (
    <section
      id="home"
      className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.96), rgba(242, 249, 255, 0.90)), url('/assets/aistudio/02_hero_soft_blue_background_aee3a7c6.jpg')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 45–50% Content Width on Desktop; Full-width on Mobile */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6">
            {/* Small Brand Label */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] min-[360px]:text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-[#F2F9FF] px-3 py-1.5 rounded-full border border-[#DCE8F2] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20C7E8] shrink-0" aria-hidden="true"></span>
              <span className="truncate">Your RCM Partner Worldwide · US Healthcare</span>
            </div>

            {/* Main Headline: 30–36px on mobile, 50px on desktop */}
            <h1 className="text-[28px] min-[360px]:text-3xl sm:text-4xl lg:text-[50px] leading-[1.18] sm:leading-[1.16] font-bold tracking-tight text-[#102B55] text-balance">
              Medical Billing, Coding &amp; Revenue Cycle Management{' '}
              <span className="text-[#168EE0]">Made Simple.</span>
            </h1>

            {/* Supporting Text: 15-16px on mobile */}
            <p className="text-[15px] sm:text-base lg:text-lg text-[#536579] leading-relaxed max-w-xl">
              VELTRAVA HEALTH supports US healthcare organizations with medical billing, coding,
              claims management, and revenue cycle operations through structured workflows,
              operational precision, and quality-focused processes.
            </p>

            {/* Action Buttons: Full-width on mobile with 48px touch targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-xl shadow-xs hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#168EE0] cursor-pointer"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#168EE0] bg-white hover:bg-[#F2F9FF] active:bg-[#E8F4FF] border border-[#DCE8F2] rounded-xl shadow-2xs hover:border-[#168EE0]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#168EE0] cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Three Compact Attributes: 1 column on mobile, 3 columns on tablet/desktop */}
            <div className="pt-4 sm:pt-6 border-t border-[#DCE8F2] grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
              <div className="flex items-center sm:items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#20C7E8] shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold text-[#102B55] leading-snug">
                  US Healthcare Workflow Focus
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#20C7E8] shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold text-[#102B55] leading-snug">
                  Quality-Focused Processes
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#20C7E8] shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold text-[#102B55] leading-snug">
                  Dedicated Operational Support
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile-Optimized Aspect Ratio & Zero Overflow */}
          <div className="lg:col-span-6 xl:col-span-6 mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE8F2] shadow-md shadow-[#168EE0]/5 bg-white">
              <img
                src="/assets/aistudio/01_hero_healthcare_professional_a8673941.jpg"
                alt="Healthcare revenue cycle professional working on VELTRAVA claims management dashboard"
                className="w-full h-auto object-cover object-center aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]"
                loading="eager"
              />
              <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
