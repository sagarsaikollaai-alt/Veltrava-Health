import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenSecurityModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenSecurityModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll detection and active section spying
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ['home', 'services', 'specialties', 'process', 'security', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Specialties', href: '#specialties', id: 'specialties' },
    { label: 'Our Process', href: '#process', id: 'process' },
    { label: 'Security', href: '#security', id: 'security' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-xs border-b border-[#DCE8F2] py-2.5 sm:py-3'
          : 'bg-white border-b border-[#DCE8F2]/60 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-8">
          {/* Official Horizontal Logo on Left with Clear Space */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="focus-visible:outline-2 focus-visible:outline-[#168EE0] rounded-md py-1 shrink-0"
            aria-label="VELTRAVA HEALTH — Back to Home"
          >
            <Logo variant="horizontal" size="md" showTagline />
          </a>

          {/* Desktop/Tablet: Navigation Links in Slate with Corporate Blue Active State */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] font-medium"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#168EE0] rounded-xs ${
                    isActive
                      ? 'text-[#168EE0] font-semibold'
                      : 'text-[#536579] hover:text-[#102B55]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop/Tablet: Action Buttons in Corporate Blue #168EE0 */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSecurityModal}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#536579] hover:text-[#102B55] hover:bg-[#F2F9FF] rounded-lg transition-colors border border-transparent hover:border-[#DCE8F2]"
              title="Security & BAA Readiness"
            >
              <ShieldCheck className="w-4 h-4 text-[#20C7E8]" aria-hidden="true" />
              <span>Security &amp; BAA</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-xl shadow-xs hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#168EE0] whitespace-nowrap cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile-Only Actions: Compact Consultation Button (on ≥380px) & Accessible Hamburger (Touch Target ≥44px) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden min-[380px]:inline-flex sm:hidden px-3 py-2 min-h-[38px] items-center justify-center text-xs font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-lg shadow-2xs whitespace-nowrap"
            >
              Consultation
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#536579] hover:text-[#102B55] hover:bg-[#F2F9FF] active:bg-[#E8F4FF] rounded-xl focus-visible:outline-2 focus-visible:outline-[#168EE0] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-Only Navigation Drawer: Backdrop + Slide Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 z-50 bg-[#102B55]/30 backdrop-blur-xs flex flex-col justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-[#DCE8F2] px-4 pt-3 pb-6 shadow-xl max-h-[calc(100dvh-65px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`min-h-[44px] flex items-center px-3.5 py-2.5 text-base font-medium rounded-xl transition-colors ${
                    activeSection === link.id
                      ? 'text-[#168EE0] bg-[#F2F9FF] font-semibold'
                      : 'text-[#536579] hover:text-[#102B55] hover:bg-[#F8FBFE]'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3.5 mt-2 border-t border-[#DCE8F2] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSecurityModal();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#536579] bg-[#F8FBFE] hover:bg-[#F2F9FF] active:bg-[#E8F4FF] rounded-xl border border-[#DCE8F2] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#20C7E8]" />
                  <span>Security &amp; BAA Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-[#168EE0] hover:bg-[#1277be] active:bg-[#0e5fa0] rounded-xl shadow-xs transition-colors"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
