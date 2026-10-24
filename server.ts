import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ConsultationInquiry {
  id: string;
  confirmationCode: string;
  fullName: string;
  businessEmail: string;
  organization: string;
  jobTitle: string;
  organizationType: string;
  servicesRequired: string[];
  message: string;
  submittedAt: string;
  status: 'received' | 'reviewing';
}

interface SecurityInquiry {
  id: string;
  referenceCode: string;
  fullName: string;
  businessEmail: string;
  organization: string;
  inquiryType: string;
  notes: string;
  submittedAt: string;
}

const consultationInquiries: ConsultationInquiry[] = [];
const securityInquiries: SecurityInquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'operational',
      brand: 'VELTRAVA HEALTH',
      service: 'Revenue Cycle Management & Medical Billing Operations',
      timestamp: new Date().toISOString(),
    });
  });

  // Submit Consultation Inquiry
  app.post('/api/consultations', (req: Request, res: Response) => {
    try {
      const {
        fullName,
        businessEmail,
        organization,
        jobTitle,
        organizationType,
        servicesRequired,
        message,
        termsAgreed,
      } = req.body;

      // Validation
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        res.status(400).json({ error: 'Please provide a valid full name.' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!businessEmail || !emailRegex.test(businessEmail.trim())) {
        res.status(400).json({ error: 'Please enter a valid business email address.' });
        return;
      }

      if (!organization || typeof organization !== 'string' || organization.trim().length < 2) {
        res.status(400).json({ error: 'Please enter your company or healthcare organization name.' });
        return;
      }

      if (!organizationType || typeof organizationType !== 'string') {
        res.status(400).json({ error: 'Please select your organization type.' });
        return;
      }

      if (!Array.isArray(servicesRequired) || servicesRequired.length === 0) {
        res.status(400).json({ error: 'Please select at least one required revenue cycle service.' });
        return;
      }

      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        res.status(400).json({ error: 'Please provide a brief message describing your operational requirements (at least 10 characters).' });
        return;
      }

      // Check for accidental PHI indicators (e.g. SSN regex)
      const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/;
      if (ssnPattern.test(message)) {
        res.status(400).json({
          error: 'Notice: Your message appears to contain sensitive identifiers. Please do not submit patient identifiers or Protected Health Information (PHI) through this public form.',
        });
        return;
      }

      const confirmationCode = `VH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const inquiry: ConsultationInquiry = {
        id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        confirmationCode,
        fullName: fullName.trim(),
        businessEmail: businessEmail.trim().toLowerCase(),
        organization: organization.trim(),
        jobTitle: (jobTitle || '').trim(),
        organizationType: organizationType.trim(),
        servicesRequired,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
        status: 'received',
      };

      consultationInquiries.push(inquiry);
      console.log(`[VELTRAVA HEALTH] Consultation inquiry logged: ${confirmationCode} from ${inquiry.organization} (${inquiry.businessEmail})`);

      // Asynchronously forward to Formspree backend
      fetch('https://formspree.io/f/xqppkrwb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Revenue Cycle Consultation Inquiry',
          confirmationCode: inquiry.confirmationCode,
          fullName: inquiry.fullName,
          email: inquiry.businessEmail,
          organization: inquiry.organization,
          jobTitle: inquiry.jobTitle,
          organizationType: inquiry.organizationType,
          servicesRequired: inquiry.servicesRequired.join(', '),
          message: inquiry.message,
          submittedAt: inquiry.submittedAt,
          _subject: `New Lead: ${inquiry.organization} (${inquiry.fullName}) - VELTRAVA HEALTH`,
        }),
      }).catch((err) => {
        console.error('[VELTRAVA HEALTH] Server-side Formspree forward notice:', err);
      });

      res.status(201).json({
        success: true,
        confirmationCode: inquiry.confirmationCode,
        receivedAt: inquiry.submittedAt,
        organization: inquiry.organization,
        servicesRequired: inquiry.servicesRequired,
        message: 'Your consultation request has been received. A senior healthcare operations lead from VELTRAVA HEALTH will review your workflow requirements and respond within one business day.',
      });
    } catch (err) {
      console.error('[VELTRAVA HEALTH] Error processing consultation inquiry:', err);
      res.status(500).json({ error: 'An unexpected error occurred while processing your request. Please try again.' });
    }
  });

  // Submit Security & Vendor Risk Assessment Inquiry
  app.post('/api/security-inquiry', (req: Request, res: Response) => {
    try {
      const { fullName, businessEmail, organization, inquiryType, notes } = req.body;

      if (!fullName || !businessEmail || !organization || !inquiryType) {
        res.status(400).json({ error: 'All fields are required to process a security review request.' });
        return;
      }

      const referenceCode = `SEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const record: SecurityInquiry = {
        id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        referenceCode,
        fullName: fullName.trim(),
        businessEmail: businessEmail.trim().toLowerCase(),
        organization: organization.trim(),
        inquiryType: inquiryType.trim(),
        notes: (notes || '').trim(),
        submittedAt: new Date().toISOString(),
      };

      securityInquiries.push(record);
      console.log(`[VELTRAVA HEALTH] Security inquiry registered: ${referenceCode} from ${record.organization}`);

      // Asynchronously forward to Formspree backend
      fetch('https://formspree.io/f/xqppkrwb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Security & Vendor Risk Review',
          referenceCode: record.referenceCode,
          fullName: record.fullName,
          email: record.businessEmail,
          organization: record.organization,
          inquiryType: record.inquiryType,
          notes: record.notes,
          submittedAt: record.submittedAt,
          _subject: `New Security / BAA Request: ${record.organization} (${record.fullName}) - VELTRAVA HEALTH`,
        }),
      }).catch((err) => {
        console.error('[VELTRAVA HEALTH] Server-side Formspree security forward notice:', err);
      });

      res.status(201).json({
        success: true,
        referenceCode: record.referenceCode,
        receivedAt: record.submittedAt,
        message: 'Your vendor risk and security inquiry has been recorded. Our compliance and operations team will provide our security documentation and BAA readiness information directly.',
      });
    } catch (err) {
      console.error('[VELTRAVA HEALTH] Error processing security inquiry:', err);
      res.status(500).json({ error: 'Failed to process security inquiry.' });
    }
  });

  // Mount Vite middleware in development or serve static in production
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VELTRAVA HEALTH web server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
