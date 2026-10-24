import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Specialties } from './components/Specialties';
import { Process } from './components/Process';
import { Security } from './components/Security';
import { WhyUs } from './components/WhyUs';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SecurityModal } from './components/SecurityModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      // Give focus to the full name input for keyboard accessibility
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) {
          input.focus();
        }
      }, 500);
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToContact();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#536579] font-sans">
      {/* Sticky Top Header */}
      <Navbar
        onOpenConsultation={scrollToContact}
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenConsultation={scrollToContact}
          onExploreServices={scrollToServices}
        />

        {/* Services Section */}
        <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Specialties We Support */}
        <Specialties />

        {/* Our Process (How It Works) */}
        <Process />

        {/* Security & Compliance */}
        <Security onOpenSecurityModal={() => setSecurityModalOpen(true)} />

        {/* Why VELTRAVA HEALTH */}
        <WhyUs />

        {/* Frequently Asked Questions */}
        <Faq onOpenConsultation={scrollToContact} />

        {/* Contact and Consultation Form */}
        <ContactSection preselectedService={preselectedService} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegalModal={(type) => setLegalModalType(type)}
        onOpenSecurityModal={() => setSecurityModalOpen(true)}
      />

      {/* Security & Vendor Risk Assessment Modal */}
      <SecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />

      {/* Privacy, Terms, and Accessibility Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
