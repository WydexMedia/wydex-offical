"use client"
import React, { useRef, useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import AppShell from "../AppShell";

export default function CareerPage() {
  const openingsRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', resume: null as File | null });
  const [formMsg, setFormMsg] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/jobs');
    const data = await res.json();
    setJobs(data);
  };

  const handleScrollToOpenings = () => {
    if (openingsRef.current) {
      openingsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = (jobTitle: string) => {
    setApplyingJob(jobTitle);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ name: '', email: '', phone: '', message: '', resume: null });
    setFormMsg('');
    setFormLoading(false);
    setFileError('');
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setFileError('Only PDF files are allowed.');
        setForm(prev => ({ ...prev, resume: null }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size must be less than 2MB.');
        setForm(prev => ({ ...prev, resume: null }));
        return;
      }
      setForm(prev => ({ ...prev, resume: file }));
    }
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg('');
    setFormLoading(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('message', form.message);
    formData.append('resume', form.resume!);
    formData.append('jobRole', applyingJob || '');
    try {
      const res = await fetch('/api/career/apply', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFormMsg('Application submitted!');
        setTimeout(() => handleCloseModal(), 1500);
      } else {
        setFormMsg(data.message || 'Submission failed.');
      }
    } catch (err) {
      setFormMsg('Submission failed.');
    }
    setFormLoading(false);
  };

  return (
    <AppShell>
      {/* Video Header */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-12 md:mt-14">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/wydex-carrer.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Let Our Team<br />Be Your New Team</h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl text-center mb-8">
            We always strive to make a positive difference in everything. If that’s important to you; Wydex would be a good fit.
          </p>
          <button
            onClick={handleScrollToOpenings}
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg"
          >
            Current openings &rarr;
          </button>
        </div>
      </div>

      {/* Openings List */}
      <div ref={openingsRef} className="max-w-3xl mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">Current Openings</h2>
        <div className="space-y-8">
          {jobs.length === 0 && <div className="text-gray-400 text-center">No openings at the moment.</div>}
          {jobs.map((job, idx) => (
            <div
              key={job._id || idx}
              className="group relative bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-2xl" />
              <div className="pl-12 flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-2xl md:text-3xl font-bold text-white mr-3">{job.title}</span>
                  {/* Optionally, add a tag for job type/location if available */}
                  {/* <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full ml-2">Full Time</span> */}
                </div>
                <div className="text-gray-300 text-base mb-4 leading-relaxed break-all">{job.description}</div>
                {/* Optionally, show requirements if available: job.requirements && (
                  <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                    {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                ) */}
              </div>
              <div className="flex-shrink-0 flex items-center justify-end md:ml-8 mt-6 md:mt-0">
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); handleOpenModal(job.title); }}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold px-7 py-3 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Application Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-lg p-8 relative">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Apply for {applyingJob}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input name="name" type="text" value={form.name} onChange={handleFormChange} required className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleFormChange} required className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleFormChange} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Cover Letter / Message</label>
                <textarea name="message" value={form.message} onChange={handleFormChange} className="w-full border px-3 py-2 rounded" rows={3} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Resume (PDF, max 2MB)</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black">
                    <PaperClipIcon className="w-5 h-5 mr-2" />
                    Upload Resume
                  </button>
                  {form.resume && <span className="text-sm text-green-700">{form.resume.name}</span>}
                </div>
                <input
                  ref={fileInputRef}
                  name="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                {fileError && <div className="text-red-600 text-sm mt-1">{fileError}</div>}
              </div>
              <button type="submit" disabled={formLoading || !!fileError || !form.resume} className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition">{formLoading ? 'Submitting...' : 'Submit Application'}</button>
              {formMsg && <div className="text-center text-green-600 mt-2">{formMsg}</div>}
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
} 