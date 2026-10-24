export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  keyWorkflows: string[];
  deliverables: string[];
  reviewControls: string;
}

export interface SpecialtyItem {
  id: string;
  name: string;
  category: string;
  workflowFocus: string;
  commonCodes: string;
  auditChecklist: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  summary: string;
  deliverables: string[];
  timeframe: string;
}

export interface SecurityPillar {
  id: string;
  title: string;
  description: string;
  practices: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Billing' | 'Coding' | 'Operations' | 'Security';
}

export interface ConsultationFormData {
  fullName: string;
  businessEmail: string;
  organization: string;
  jobTitle: string;
  organizationType: string;
  servicesRequired: string[];
  message: string;
  termsAgreed: boolean;
}

export interface ConsultationResponse {
  success: boolean;
  confirmationCode: string;
  receivedAt: string;
  organization: string;
  servicesRequired: string[];
  message: string;
}
