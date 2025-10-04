'use client'
import AppShell from "../AppShell";
import React from "react";
import { showToast } from '@/lib/toast';

function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [fieldWarning, setFieldWarning] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldWarning('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFieldWarning('Please fill out all required fields.');
      showToast.warning('Missing Required Fields', 'Please fill out all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Submitted!');
        showToast.success('Enquiry Submitted!', 'Your enquiry has been submitted successfully');
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || 'Submission failed');
        showToast.error('Submission Failed', data.message || 'An error occurred during submission');
      }
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again later.');
      showToast.error('Submission Failed', 'An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-8">
      {fieldWarning && <div className="text-red-600 text-sm mb-2">{fieldWarning}</div>}
      <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
      <input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className="w-full border px-3 py-2 rounded" rows={3} />
      <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition">{loading ? 'Submitting...' : 'Submit'}</button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto p-8 mt-24 text-center">
        {/* Enhanced h2 design */}

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Contact Us
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 tracking-wide mb-4">
        Get in touch with the Best Digital Marketing Agency in Calicut
        </h2>

        <EnquiryForm />
      </div>
    </AppShell>
  );
}
