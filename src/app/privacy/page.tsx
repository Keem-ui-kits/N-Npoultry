import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | N&N Poultry Palace',
  description: 'Data protection and privacy policy for N&N Poultry Palace.',
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Privacy <span className="text-brand-gold italic font-serif font-light">Policy</span></h1>
        
        <div className="prose prose-invert prose-brand prose-lg max-w-none text-white/80 font-light">
          <p className="text-sm text-white/50 mb-8">Last Updated: April 2026</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">1. INTRODUCTION</h3>
          <p>1.1. N And N Poultry Palace Limited (&ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects the privacy of our users (&ldquo;user&rdquo; or &ldquo;you&rdquo;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website <strong>nnpoultrypalace.vercel.app</strong> as well as any other media form, media channel, mobile website, or mobile application related to it (collectively, the &ldquo;Site&rdquo;).</p>
          <p>1.2. We reserve the right to modify this Privacy Policy at any time. We will notify you by updating the &ldquo;Last Updated&rdquo; date. Any changes take effect immediately upon posting.</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">2. COLLECTION OF YOUR INFORMATION</h3>
          <p>We may collect and use information if it is necessary for our legitimate interests, in accordance with the Kenyan Data Protection Act.</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>2.1. Personal Data:</strong> Personally identifiable information (name, address, email, phone number) and demographic info voluntarily provided during Site activities.</li>
            <li><strong>2.2. Derivative Data:</strong> Information our servers automatically collect (IP address, browser type, operating system, access times, pages viewed).</li>
            <li><strong>2.3. Data from Social Networks:</strong> Information from social networking sites (Facebook, Twitter, Instagram) if you grant us access to your account.</li>
            <li><strong>2.4. Data from Mobile Devices:</strong> Device ID, model, manufacturer, and location data.</li>
            <li><strong>2.5. Third Party Data:</strong> Information from third parties if you connect your account.</li>
          </ul>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">3. USE OF YOUR INFORMATION</h3>
          <p>We use collected information for:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-gold">
            <li>Processing products and services bought.</li>
            <li>Responding to queries or concerns.</li>
            <li>Verifying identity through government databases to comply with regulations.</li>
            <li>Informing you about new products/services and marketing offers (with opt-out option).</li>
            <li>Complying with legal/regulatory requirements.</li>
            <li>Quality control, training, and effective systems operations.</li>
            <li>Preventing fraud and debt recovery.</li>
            <li>Research, statistical, and survey purposes.</li>
            <li>Providing aggregated data (anonymized) to third parties.</li>
            <li>Administering our online platforms.</li>
          </ul>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">4. DATA SUBJECT RIGHTS</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-gold">
            <li>Be informed about how your data is used.</li>
            <li>Request copies of your personal data.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of data (subject to certain conditions).</li>
            <li>Oppose processing for serious and legitimate reasons.</li>
            <li>Withdraw consent at any time.</li>
            <li>Restrict processing under certain conditions.</li>
            <li>Request data portability to another controller or to yourself.</li>
          </ul>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">5. CONFIDENTIALITY OF PERSONAL DATA</h3>
          <p>Information is kept private and accessed only on a &ldquo;need to know&rdquo; basis by employees for specified tasks.</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">6. STORING YOUR INFORMATION</h3>
          <p>Data is kept for as long as required to fulfill the purpose for which it was collected, or as authorized by law (historical, statistical, or research purposes).</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">7. DISCLOSURE OF YOUR INFORMATION</h3>
          <p>We may share your info:</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>7.1. By Law:</strong> To respond to legal processes or protect rights/safety.</li>
            <li><strong>7.2. Third Party Service Providers:</strong> Payment processing, data analysis, email delivery, hosting, customer service, and marketing.</li>
            <li><strong>7.3. Marketing:</strong> With your prior consent.</li>
            <li><strong>7.4. Third Party Advertisers:</strong> To display ads of interest.</li>
            <li><strong>7.5. Business Partners:</strong> To provide specific products/services.</li>
          </ul>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">8. TRACKING TECHNOLOGIES</h3>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>8.1. Cookies/Web Beacons:</strong> Used to customize and improve experience.</li>
            <li><strong>8.2. Internet-Based Collection:</strong> Third-party software used to manage and optimize experience.</li>
            <li><strong>8.3. Web Analytics:</strong> Collaboration with vendors like Google for remarketing and tracking.</li>
          </ul>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">9. SECURITY OF YOUR INFORMATION</h3>
          <p>We employ administrative, technical, and physical security measures. However, no method of transmission is 100% secure.</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">10. COMMUNICATIONS AND EMAILS</h3>
          <p>You can opt-out of communications by contacting us. For third-party communications, you must contact them directly.</p>

          <h3 className="text-2xl text-white font-bold mt-12 mb-4">11. CONTACT US</h3>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Tel:</strong> +254 113377623</p>
          <p><strong>Email:</strong> info@nnpoultry.co.ke</p>
        </div>
      </div>
    </PageWrapper>
  );
}
