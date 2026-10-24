import React from 'react';
import {
  KeyRound,
  GraduationCap,
  Lock,
  MessageSquare,
  AlertOctagon,
  FileSignature,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { SecurityPillar } from '../types';

const SECURITY_CARDS: SecurityPillar[] = [
  {
    id: 'access-control',
    title: 'Access Control',
    description:
      'Role-based permissions and multi-factor authentication (MFA) across all administrative and client system logins.',
    practices: [
      'Least-privilege operational access',
      'Multi-factor authentication (MFA) enforcement',
      'Timely privilege de-provisioning upon role change',
    ],
  },
  {
    id: 'workforce-training',
    title: 'Workforce Training',
    description:
      'Documented confidentiality agreements and ongoing healthcare data privacy education for all operational staff.',
    practices: [
      'Signed confidentiality & non-disclosure agreements',
      'Regular privacy & PHI handling curriculum',
      'Documented compliance acknowledgment',
    ],
  },
  {
    id: 'data-protection',
    title: 'Data Protection',
    description:
      'Rigorous controls governing data handling, transport encryption, and workstation endpoint security.',
    practices: [
      'Transport encryption across data transmissions',
      'No local downloading of records to unauthorized drives',
      'Secured workstation idle auto-lock policies',
    ],
  },
  {
    id: 'secure-communication',
    title: 'Secure Communication',
    description:
      'Encrypted channels, secure portal integrations, and VPN gateway options for client EHR/PM interactions.',
    practices: [
      'Encrypted transfer channels & secure SFTP access',
      'VPN support for direct client system access',
      'Controlled file exchange verification',
    ],
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description:
      'Documented security event handling procedures, rapid internal escalation trees, and client notification protocols.',
    practices: [
      'Documented incident response workflows',
      'Clear client communication escalation tree',
      'Root-cause analysis & corrective action logging',
    ],
  },
  {
    id: 'baa-readiness',
    title: 'Business Associate Agreement Readiness',
    description:
      'Preparedness to execute standard HIPAA Business Associate Agreements (BAAs) prior to commencing operational work.',
    practices: [
      'Review & execution of client standard BAAs',
      'Commitment to Business Associate statutory obligations',
      'Vendor-risk assessment questionnaire support',
    ],
  },
];

interface SecurityProps {
  onOpenSecurityModal: () => void;
}

export const Security: React.FC<SecurityProps> = ({ onOpenSecurityModal }) => {
  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'access-control':
        return <KeyRound className="w-5 h-5 text-[#168EE0]" />;
      case 'workforce-training':
        return <GraduationCap className="w-5 h-5 text-[#168EE0]" />;
      case 'data-protection':
        return <Lock className="w-5 h-5 text-[#168EE0]" />;
      case 'secure-communication':
        return <MessageSquare className="w-5 h-5 text-[#168EE0]" />;
      case 'incident-response':
        return <AlertOctagon className="w-5 h-5 text-[#168EE0]" />;
      case 'baa-readiness':
        return <FileSignature className="w-5 h-5 text-[#168EE0]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#168EE0]" />;
    }
  };

  return (
    <section
      id="security"
      className="py-16 lg:py-24 bg-[#F2F9FF] border-t border-[#DCE8F2] relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(242, 249, 255, 0.96), rgba(248, 251, 254, 0.94)), url('/assets/aistudio/05_security_soft_blue_background_c97dcc24.jpg')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Exact Supporting Text */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-white px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Data Governance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            Your Data Deserves Careful Handling
          </h2>
          <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
            We take a structured approach to information security, confidentiality, and responsible handling of healthcare information.
          </p>
        </div>

        {/* Top Split: Six Compact Cards on Left, Security Shield Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          {/* Left: 6 Compact Icon Cards (7 cols on lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SECURITY_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-[#DCE8F2] p-4 sm:p-5 flex flex-col justify-between hover:border-[#168EE0]/40 transition-colors shadow-2xs"
              >
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2F9FF] border border-[#DCE8F2] flex items-center justify-center">
                    {getPillarIcon(card.id)}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#102B55] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#536579] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Supplied Security Shield & Hand Image (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE8F2] shadow-md bg-white">
              <img
                src="/assets/aistudio/04_security_shield_background_631c3479.jpg"
                alt="Healthcare professional holding glowing security shield representing medical data protection and confidentiality"
                className="w-full h-auto object-cover object-center aspect-[4/3] sm:aspect-[16/11]"
                loading="lazy"
              />
              <div className="p-3.5 sm:p-4 bg-white border-t border-[#DCE8F2]">
                <div className="text-xs font-bold text-[#102B55] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#20C7E8]" />
                  <span>Business Associate Agreement (BAA) Readiness</span>
                </div>
                <p className="text-[11px] text-[#536579] mt-1 leading-snug">
                  We execute formal BAAs prior to accessing any clinical or financial data. Public website forms do not collect protected health information (PHI).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Assessment Contact Callout */}
        <div className="bg-white rounded-2xl border border-[#DCE8F2] p-4 sm:p-6 max-w-4xl mx-auto shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#168EE0] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#536579]">
              <span className="font-bold text-[#102B55]">Vendor Risk Review: </span>
              Security arrangements, Business Associate Agreements, and vendor risk questionnaires are addressed directly during consultation according to applicable legal and client requirements.
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0 sm:shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 text-xs font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] rounded-xl transition-colors cursor-pointer"
          >
            <span>Request Security Info</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
