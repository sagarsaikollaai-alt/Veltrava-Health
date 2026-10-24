import React, { useState } from 'react';
import {
  Stethoscope,
  Heart,
  Bone,
  Eye,
  Activity,
  Ribbon,
  Baby,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { SpecialtyItem } from '../types';

const SPECIALTY_TILES: SpecialtyItem[] = [
  {
    id: 'primary-care',
    name: 'Primary Care',
    category: 'Family & Internal Medicine',
    workflowFocus: 'Evaluation & Management (E/M) leveling, preventive wellness visits, chronic care management, and dual billing (preventive + problem-oriented).',
    commonCodes: '99202–99215, 99381–99397, G0438/G0439',
    auditChecklist: [
      'Time-based or medical decision making (MDM) scoring confirmation',
      'Modifier 25 appropriateness review for same-day procedures',
      'Annual Wellness Visit (AWV) screening measure attachment',
    ],
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    category: 'Cardiovascular & Interventional',
    workflowFocus: 'Diagnostic testing (echocardiograms, nuclear stress tests), cardiac catheterization, telemetry, and pre-authorization validation.',
    commonCodes: '93000, 93306, 93458, 78452',
    auditChecklist: [
      'Technical vs professional component split (Modifier 26 / TC)',
      'Pre-service clinical justification for advanced imaging',
      'Medical necessity tracking against Local Coverage Determinations (LCDs)',
    ],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    category: 'Musculoskeletal & Sports Medicine',
    workflowFocus: 'Surgical fracture care, joint injections, durable medical equipment (DME), operative note review, and physical therapy coordination.',
    commonCodes: '20610, 27447, 29881, 73030',
    auditChecklist: [
      'Global surgical period tracking (0, 10, or 90 days)',
      'Modifier 59 / XS review for distinct procedural services',
      'Implant invoicing and specialized device invoice cross-checks',
    ],
  },
  {
    id: 'radiology',
    name: 'Radiology',
    category: 'Diagnostic & Interventional Imaging',
    workflowFocus: 'High-volume modality charge capture (CT, MRI, Ultrasound, Mammography), radiologist dictation alignment, and clearinghouse batching.',
    commonCodes: '70450, 71250, 74177, 77067',
    auditChecklist: [
      'Physician signature & report completion verification',
      'Contrast vs non-contrast documentation check',
      'Referring physician NPI validation on all imaging claims',
    ],
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    category: 'Digestive Disease & Endoscopy',
    workflowFocus: 'Screening vs diagnostic colonoscopies, upper endoscopies, biopsy specimen pathology linkage, and sedation billing.',
    commonCodes: '45378, 45380, 45385, 43239',
    auditChecklist: [
      'PT modifier application for screening converted to diagnostic',
      'Pathology diagnosis cross-walk for polypectomies',
      'Facility fee vs professional charge separation',
    ],
  },
  {
    id: 'oncology',
    name: 'Oncology',
    category: 'Medical Oncology & Hematology',
    workflowFocus: 'Chemotherapy and immunotherapy drug administration (J-codes), hydration coding, complex treatment plans, and continuous prior authorization.',
    commonCodes: '96413, 96415, 96372, J9000-series',
    auditChecklist: [
      'Infusion start and stop time calculation accuracy',
      'Drug unit conversion and NDC (National Drug Code) verification',
      'Clinical trial protocol matching and special modifier adherence',
    ],
  },
  {
    id: 'obgyn',
    name: 'OB/GYN',
    category: 'Obstetrics & Gynecology',
    workflowFocus: 'Global maternity packages, antepartum visits, colposcopy, ultrasound, gynecological surgical procedures, and in-office treatments.',
    commonCodes: '59400, 59510, 57454, 76805',
    auditChecklist: [
      'Antepartum visit counting for patients transferring mid-pregnancy',
      'Postpartum visit tracking and complication exclusions',
      'Preventive well-woman vs acute problem coding distinction',
    ],
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    category: 'Medical & Surgical Dermatology',
    workflowFocus: 'Lesion destruction, excision with margins, biopsies, Mohs micrographic surgery, and pathology correlation.',
    commonCodes: '11102, 17000, 11600, 17311',
    auditChecklist: [
      'Lesion size plus surgical margin measurement verification',
      'Multiple biopsy modifier assignment',
      'Pathology confirmation prior to final claim release',
    ],
  },
];

export const Specialties: React.FC = () => {
  const [activeSpecialty, setActiveSpecialty] = useState<SpecialtyItem>(SPECIALTY_TILES[0]);

  const getSpecialtyIcon = (id: string) => {
    switch (id) {
      case 'primary-care':
        return <Stethoscope className="w-5 h-5 text-[#168EE0]" />;
      case 'cardiology':
        return <Heart className="w-5 h-5 text-[#168EE0]" />;
      case 'orthopedics':
        return <Bone className="w-5 h-5 text-[#168EE0]" />;
      case 'radiology':
        return <Eye className="w-5 h-5 text-[#168EE0]" />;
      case 'gastroenterology':
        return <Activity className="w-5 h-5 text-[#168EE0]" />;
      case 'oncology':
        return <Ribbon className="w-5 h-5 text-[#168EE0]" />;
      case 'obgyn':
        return <Baby className="w-5 h-5 text-[#168EE0]" />;
      case 'dermatology':
        return <Sparkles className="w-5 h-5 text-[#168EE0]" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#168EE0]" />;
    }
  };

  return (
    <section id="specialties" className="py-16 lg:py-24 bg-[#F2F9FF] border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Exact Supporting Text */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#168EE0] bg-white px-3.5 py-1 rounded-md border border-[#DCE8F2]">
            Clinical Focus
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102B55] text-balance">
            Specialty-Specific Workflow Support
          </h2>
          <p className="text-base sm:text-lg text-[#536579] leading-relaxed">
            We evaluate service requirements based on specialty workflows, staff capabilities, and client needs.
          </p>
        </div>

        {/* Eight Icon Tiles in Clean White/Bordered Surfaces */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {SPECIALTY_TILES.map((specialty) => {
            const isSelected = activeSpecialty.id === specialty.id;
            return (
              <button
                key={specialty.id}
                type="button"
                onClick={() => setActiveSpecialty(specialty)}
                className={`p-3 min-[360px]:p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] sm:min-h-0 ${
                  isSelected
                    ? 'bg-white border-[#168EE0] shadow-sm ring-2 ring-[#168EE0]/20'
                    : 'bg-white/80 hover:bg-white border-[#DCE8F2] hover:border-[#168EE0]/30'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2F9FF] border border-[#DCE8F2] flex items-center justify-center shadow-2xs">
                    {getSpecialtyIcon(specialty.id)}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#20C7E8]" aria-hidden="true"></span>
                  )}
                </div>
                <div>
                  <div className="text-xs sm:text-base font-bold text-[#102B55] leading-tight">
                    {specialty.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#718096] mt-0.5 sm:mt-1 line-clamp-1">
                    {specialty.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Specialty Operational Profile */}
        <div className="bg-white rounded-2xl border border-[#DCE8F2] p-4 min-[360px]:p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-[#DCE8F2]/60">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-semibold text-[#168EE0] uppercase tracking-wider">
                  Evaluated Scope
                </span>
                <span className="text-xs text-[#718096]">·</span>
                <span className="text-[11px] sm:text-xs text-[#536579] font-medium">Availability confirmed during consultation</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#102B55] mt-1">
                {activeSpecialty.name} Workflow Profile
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono bg-[#F8FBFE] border border-[#DCE8F2] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[#536579] self-start sm:self-auto">
              <span className="text-[#718096] font-sans text-[11px] sm:text-xs">Representative Codes:</span>
              <span className="font-semibold text-[#102B55] break-all">{activeSpecialty.commonCodes}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-5 sm:pt-6">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#718096]">
                Specialty Considerations &amp; Nuances
              </h4>
              <p className="text-xs sm:text-sm text-[#536579] leading-relaxed bg-[#F8FBFE] p-3.5 sm:p-4 rounded-xl border border-[#DCE8F2]">
                {activeSpecialty.workflowFocus}
              </p>
              <div className="flex items-start gap-2 text-xs text-[#718096] italic">
                <Info className="w-4 h-4 text-[#35A9F5] shrink-0 mt-0.5" />
                <span>
                  Our team confirms certified coder qualifications and payer guidelines before onboarding specialty accounts.
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#718096]">
                Documentation &amp; Review Checklist
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {activeSpecialty.auditChecklist.map((check, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#536579] bg-[#F8FBFE] p-2.5 sm:p-3 rounded-xl border border-[#DCE8F2]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#20C7E8] shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
