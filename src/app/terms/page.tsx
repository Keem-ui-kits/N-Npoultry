import { StaticPageWrapper } from '@/components/layout/StaticPageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | N&N Poultry Palace',
  description: 'Terms and conditions for using the N&N Poultry Palace website and services.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <StaticPageWrapper>
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Terms and <span className="text-brand-gold italic font-serif font-light">Conditions</span></h1>
        
        <div className="prose prose-invert prose-brand prose-lg max-w-none text-white/80 font-light">
          <p className="text-sm text-white/50 mb-8">Last Updated: April 2026</p>

          <p className="font-medium text-white mb-8">PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Who we are and how to contact us</h2>
          <p>This site is operated by N And N Poultry Palace Limited (&ldquo;We&rdquo;). We are registered in the Republic of Kenya.</p>
          <p>To contact us, please email <strong>info@nnpoultry.co.ke</strong> or telephone our customer service line on <strong>+254 113377623</strong>.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">By using our site you accept these terms</h2>
          <p>By using our site, you confirm that you accept these terms of use and that you agree to comply with them. If you do not agree to these terms, you must not use our site. We recommend that you print a copy of these terms for future reference.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">There are other terms that may apply to you</h2>
          <p>These terms of use refer to the following additional terms, which also apply to your use of our site:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-gold">
            <li>Our <a href="/privacy" className="text-brand-gold hover:text-brand-orange underline">Privacy Policy</a>. See further under How we may use your personal information.</li>
          </ul>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">We may make changes to these terms</h2>
          <p>We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">We may make changes to our site</h2>
          <p>We may update and change our site from time to time to reflect changes to our products, our users&apos; needs and our business priorities. We will try to give you reasonable notice of any major changes.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">We may suspend or withdraw our site</h2>
          <p>Our site is made available free of charge. We do not guarantee that our site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Responsibility for others</h2>
          <p>You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms of use and other applicable terms and conditions, and that they comply with them.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">How you may use material on our site</h2>
          <p>We are the owner or the licensee of all intellectual property rights in our site, and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.</p>
          <p>You may print off one copy, and may download extracts, of any page(s) from our site for your personal use and you may draw the attention of others within your organisation to content posted on our site.</p>
          <p>You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text.</p>
          <p>Our status (and that of any identified contributors) as the authors of content on our site must always be acknowledged (except where the content is user-generated).</p>
          <p>You must not use any part of the content on our site for commercial purposes without obtaining a licence to do so from us or our licensors.</p>
          <p>If you print off, copy, download, share or repost any part of our site in breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">No text or data mining, or web scraping</h2>
          <p>You shall not conduct, facilitate, authorise or permit any text or data mining or web scraping in relation to our site or any services provided via, or in relation to, our site. This includes using:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-brand-gold">
            <li>Any &ldquo;robot&rdquo;, &ldquo;bot&rdquo;, &ldquo;spider&rdquo;, &ldquo;scraper&rdquo; or other automated device, program, tool, algorithm, code, process or methodology to access, obtain, copy, monitor or republish any portion of the site or any data, content, information or services accessed via the same.</li>
            <li>Any automated analytical technique aimed at analysing text and data in digital form to generate information which includes but is not limited to patterns, trends and correlations.</li>
          </ul>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Do not rely on information on this site</h2>
          <p>The content on our site is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our site. Although we make reasonable efforts to update the information on our site, we make no representations, warranties or guarantees, whether express or implied, that the content on our site is accurate, complete or up to date.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">We are not responsible for websites we link to</h2>
          <p>Where our site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them. We have no control over the contents of those sites or resources.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Our responsibility for loss or damage suffered by you</h2>
          <ul className="list-disc pl-6 space-y-4 mt-4 marker:text-brand-gold">
            <li><strong>Whether you are a consumer or a business user:</strong> We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for fraud or fraudulent misrepresentation.</li>
            <li><strong>If you are a business user:</strong> We exclude all implied conditions, warranties, representations or other terms that may apply to our site or any content on it. We will not be liable for any loss of profits, sales, business, revenue, business interruption, loss of anticipated savings, loss of business opportunity, goodwill or reputation, or any indirect or consequential loss or damage.</li>
            <li><strong>If you are a consumer user:</strong> Please note that we only provide our site for domestic and private use. You agree not to use our site for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</li>
          </ul>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Viruses</h2>
          <p>We do not guarantee that our site will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software. You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful.</p>

          <h2 className="text-2xl text-white font-bold mt-12 mb-4">Which country&apos;s laws apply to any disputes?</h2>
          <p>If you are a consumer, please note that these terms of use, their subject matter and their formation, are governed by Kenyan law. You and we both agree that the courts of the Republic of Kenya will have exclusive jurisdiction.</p>

        </div>
      </div>
    </StaticPageWrapper>
  );
}
