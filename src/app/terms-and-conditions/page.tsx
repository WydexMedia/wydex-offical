import AppShell from '../AppShell';
import React from 'react';

export default function TermsPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto py-16 px-4 mt-32">
        <h1 className="text-3xl font-bold mb-6">Terms &amp; Conditions</h1>
        <p className="mb-4">
          Welcome to WYDEX Media. By accessing or using our website and services, you agree to be bound by these Terms &amp; Conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Definitions</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>"We" / "Us" / "Our"</strong> refers to WYDEX Media.</li>
          <li><strong>"You" / "User"</strong> refers to any individual or entity accessing or using our services.</li>
          <li><strong>"Services"</strong> include all digital marketing, SEO, web development, and related services offered by WYDEX Media.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Use of Service</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You agree to use our Services in compliance with all applicable local, state, national, and international laws.</li>
          <li>You will not interfere with or disrupt the integrity or performance of our Services.</li>
          <li>You shall not attempt to gain unauthorized access to any part of the website or related systems.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Account Registration</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You may be required to create an account to access certain features.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You must notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Fees &amp; Payment</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>All service fees will be outlined in a separate proposal or contract.</li>
          <li>Invoices are payable within 30 days of receipt unless otherwise agreed.</li>
          <li>Late payments may incur interest at 1.5% per month.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Intellectual Property</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>All content, designs, and materials provided by WYDEX Media are our exclusive property.</li>
          <li>You may not reproduce, distribute, or create derivative works without our written consent.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Disclaimers &amp; Limitation of Liability</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Services are provided "as is" without warranties of any kind.</li>
          <li>We do not guarantee specific results or outcomes.</li>
          <li>To the fullest extent permitted by law, WYDEX Media will not be liable for any indirect or consequential damages.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless WYDEX Media and its officers, directors, and employees from any claims, liabilities, losses, or expenses arising from your breach of these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Kozhikode, Kerala.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Updated terms will be posted on this page with the "Last Updated" date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms &amp; Conditions, please contact us at 
          <a href="mailto:wydexmedia@gmail.com" className="text-blue-500 underline">wydexmedia@gmail.com</a>.
        </p>
      </div>
    </AppShell>
  );
}
