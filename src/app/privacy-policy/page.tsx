import AppShell from '../AppShell';
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto py-16 px-4 mt-32">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          &quot;Wydex Media&quot; is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Definitions</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>&quot;Personal Data&quot;</strong> means any information relating to an identified or identifiable individual.</li>
          <li><strong>&quot;Services&quot;</strong> refers to all digital marketing, SEO, web development, and related services provided by WYDEX Media.</li>
          <li><strong>&quot;You&quot; or &quot;User&quot;</strong> means any visitor to our website or recipient of our services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Contact Data:</strong> Name, email address, phone number, company name (when you submit forms or applications).</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device type, operating system, and usage patterns (collected via cookies and analytics).</li>
          <li><strong>Social Data:</strong> Comments, messages, and engagement metrics from our Instagram and LinkedIn pages.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. How We Collect Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Directly from You:</strong> When you fill out contact forms, subscribe to newsletters, or apply for jobs.</li>
          <li><strong>Automatically:</strong> Through cookies, web beacons, and analytics tools (e.g., Google Analytics).</li>
          <li><strong>From Third Parties:</strong> From social media platforms and service providers in accordance with their policies.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To deliver and improve our Services.</li>
          <li>To respond to your inquiries and process applications.</li>
          <li>To send newsletters, marketing communications, and updates (you can opt out anytime).</li>
          <li>To analyze website and social media performance for optimization.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Sharing &amp; Disclosure</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>We do <strong>not</strong> sell or rent your Personal Data to third parties.</li>
          <li><strong>Service Providers:</strong> We share with hosting, analytics, and email platforms under confidentiality commitments.</li>
          <li><strong>Legal Requirements:</strong> We may disclose data to comply with legal processes or protect our rights.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Cookies &amp; Tracking</h2>
        <p className="mb-4">
          We use cookies and similar technologies to track usage, remember preferences, and improve your experience. You may control cookie settings through your browser.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Data Retention</h2>
        <p className="mb-4">
          We retain Personal Data only as long as necessary for the purposes outlined or to comply with legal obligations.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Security</h2>
        <p className="mb-4">
          We implement administrative, technical, and physical safeguards to protect your data. However, no online system is completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Your Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Access, correct, or delete your Personal Data.</li>
          <li>Restrict or object to processing.</li>
          <li>Data portability.</li>
          <li>Withdraw consent to marketing communications.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Children&apos;s Privacy</h2>
        <p className="mb-4">
          Our Services are not directed at individuals under 18 years old. We do not knowingly collect data from minors.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy by posting a new version here. The &quot;Last Updated&quot; date will reflect changes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Contact Us</h2>
        <p className="mb-4">
          For questions or to exercise your rights, please contact us at{' '}
          <a href="mailto:wydexmedia@gmail.com" className="text-blue-500 underline">wydexmedia@gmail.com</a>.
        </p>
      </div>
    </AppShell>
  );
}
