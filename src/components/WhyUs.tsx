import React from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Users,
  FileText,
  Globe,
  Award,
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const differentiators = [
    {
      title: 'Clear Communication',
      desc: 'Defined points of contact, documented requirements, and agreed reporting schedules.',
      icon: <MessageSquare className="w-5 h-5 text-[#168EE0]" />,
    },
    {
      title: 'Quality-Focused Workflows',
      desc: 'Documented review steps and escalation procedures appropriate to the services provided.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#168EE0]" />,
    },
    {
      title: 'Flexible Engagement',
      desc: 'Discuss service scope and delivery arrangements based on your needs and our confirmed capacity.',
      icon: <Users className="w-5 h-5 text-[#168EE0]" />,
    },
    {
      title: 'Transparent Processes',
      desc: 'Clear responsibilities, agreed timelines, and straightforward communication.',
      icon: <FileText className="w-5 h-5 text-[#168EE0]" />,
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-[#F2F9FF] px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Our Operating Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            Why VELTRAVA HEALTH?
          </h2>
          <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
            A partnership approach focused on clarity, quality, and transparency.
          </p>
        </div>

        {/* Four Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {differentiators.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FBFE] rounded-2xl border border-[#DCE8F2] p-4 min-[360px]:p-5 sm:p-6 flex flex-col justify-between hover:border-[#168EE0]/40 hover:bg-[#F2F9FF]/50 transition-colors shadow-2xs"
            >
              <div className="space-y-3 sm:space-y-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#DCE8F2] flex items-center justify-center shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#102B55]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#536579] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mission Callout */}
        <div className="mt-8 sm:mt-12 bg-[#F2F9FF] border border-[#DCE8F2] rounded-2xl p-4 min-[360px]:p-5 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE8F2] flex items-center justify-center shrink-0 shadow-2xs">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#168EE0]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-[#102B55]">
                Your RCM Partner Worldwide
              </h4>
              <p className="text-xs sm:text-sm text-[#536579] leading-relaxed">
                A modern, trustworthy healthcare RCM partner focused on accuracy, operational efficiency, and long-term partnerships. We conduct careful workflow assessments before accepting work to ensure staff qualifications align with your specific specialty, volume, and practice expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
