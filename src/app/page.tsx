"use client";

import Index from "./Home/Home";
import AppShell from "./AppShell";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      setError('Submission failed. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('getStarted') === '1') {
      setShowModal(true);
    }
  }, [searchParams]);

  const handleGetStartedClick = () => {
    setShowModal(true);
    if (searchParams.get('getStarted') !== '1') {
      router.push('/?getStarted=1');
    }
  };

  return (
    <AppShell>
      <button onClick={handleGetStartedClick} className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">Get Started</button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <button onClick={() => {
              setShowModal(false);
              if (searchParams.get('getStarted') === '1') {
                router.replace('/');
              }
            }} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>
            <EnquiryForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
      <Index/> 
    </AppShell>
  );
}
