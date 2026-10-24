import React from 'react';
import { ArrowUpRight, Lock, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenLegalModal: (type: 'privacy' | 'terms' | 'accessibility') => void;
  onOpenSecurityModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onOpenSecurityModal }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F8FBFE] text-[#536579] border-t border-[#DCE8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        {/* Four Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand (4 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-block focus-visible:outline-2 focus-visible:outline-[#168EE0] rounded"
              aria-label="VELTRAVA HEALTH Home"
            >
              <Logo variant="horizontal" size="md" showTagline />
            </a>

            <p className="text-xs sm:text-sm text-[#536579] leading-relaxed max-w-sm pt-1">
              Your RCM Partner Worldwide. Supporting US healthcare organizations with medical billing, coding, and revenue cycle management operations through structured workflows.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#718096]">
              <Lock className="w-3.5 h-3.5 text-[#168EE0]" />
              <span>Prepared for Business Associate Agreement (BAA) execution</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#102B55] uppercase tracking-wider font-sans">
              Navigation
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#specialties"
                  onClick={(e) => handleNavClick(e, '#specialties')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Specialties
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleNavClick(e, '#process')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  onClick={(e) => handleNavClick(e, '#security')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-[#168EE0] transition-colors inline-block py-1 sm:py-0.5"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#102B55] uppercase tracking-wider font-sans">
              Our Services
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#536579]">
              <li className="py-0.5">Medical Billing</li>
              <li className="py-0.5">Medical Coding</li>
              <li className="py-0.5">Denial Management</li>
              <li className="py-0.5">End-to-End RCM</li>
            </ul>
          </div>

          {/* Column 4: Contact Us & Governance (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#102B55] uppercase tracking-wider font-sans">
              Contact &amp; Governance
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="text-[#168EE0] hover:text-[#102B55] transition-colors font-semibold inline-flex items-center gap-1 min-h-[40px] sm:min-h-0 py-1 sm:py-0"
                >
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSecurityModal}
                  className="hover:text-[#168EE0] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-[#536579] min-h-[40px] sm:min-h-0 py-1 sm:py-0"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#168EE0]" />
                  <span>Vendor Risk &amp; BAA Request</span>
                </button>
              </li>
              <li className="pt-2 text-xs text-[#718096] leading-snug">
                Direct phone and liaison contacts are provided upon initial discovery consultation confirmation.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#DCE8F2] text-xs text-[#718096] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {currentYear} VELTRAVA HEALTH. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2 sm:gap-x-4 gap-y-1.5 text-xs">
            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-[#168EE0] transition-colors cursor-pointer py-1 px-1.5"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-[#DCE8F2]">·</span>
            <button
              type="button"
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-[#168EE0] transition-colors cursor-pointer py-1 px-1.5"
            >
              Terms of Use
            </button>
            <span aria-hidden="true" className="text-[#DCE8F2]">·</span>
            <button
              type="button"
              onClick={() => onOpenLegalModal('accessibility')}
              className="hover:text-[#168EE0] transition-colors cursor-pointer py-1 px-1.5"
            >
              Accessibility Information
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
