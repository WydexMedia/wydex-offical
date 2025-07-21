"use client"
import React, { useRef, useEffect, useState } from 'react';
import AppShell from "../AppShell";
import { Briefcase, MapPin, Users, ArrowRight, X, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';
type Job = {
  _id: string;
  title: string;
  description: string;
  location?: string;
  department?: string;
  requirements?: string[]; // if you're planning to use it later
  type?: string; // <-- Add this line
};


export default function CareerPage() {
  const openingsRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', resume: null as File | null });
  const [formMsg, setFormMsg] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState('');
  const [fieldWarning, setFieldWarning] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/jobs');
    const data: Job[] = await res.json();
    setJobs(data);
  };
  

  const handleScrollToOpenings = () => {
  const section = document.getElementById('openings');
  if (section) {
    const yOffset = -80; // adjust for sticky header height if needed
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
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
    setFieldWarning('');
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFieldWarning('');
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
    if (!form.name.trim()) {
      setFieldWarning('Please enter your full name.');
      return;
    }
    if (!form.email.trim()) {
      setFieldWarning('Please enter your email address.');
      return;
    }
    if (!form.message.trim()) {
      setFieldWarning('Please enter a cover letter.');
      return;
    }
    if (!form.resume) {
      setFieldWarning('Please upload your resume (PDF).');
      return;
    }
    setFormLoading(true);
    try {
      // 1. Get presigned URL
      const presignRes = await fetch('/api/s3/resume-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: form.resume.name, contentType: form.resume.type }),
      });
      const { url, key } = await presignRes.json();
      // 2. Upload file to S3
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': form.resume.type },
        body: form.resume,
      });
      // 3. Submit application with S3 key
      const res = await fetch('/api/career/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          jobRole: applyingJob,
          resume: key,
        }),
      });
      const data: { success: boolean; message?: string } = await res.json();
      if (data.success) {
        setFormMsg('Application submitted!');
        toast.success('Application submitted successfully!');
        setTimeout(() => handleCloseModal(), 1500);
      } else {
        setFormMsg(data.message || 'Submission failed.');
        toast.error(data.message || 'Submission failed.');
      }
    } catch (err) {
      console.error(err);
      setFormMsg('Submission failed.');
      toast.error('Submission failed.');
    }
    setFormLoading(false);
  };

  return (
    <AppShell>
      {/* Video Header */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-12 md:mt-14">
        {/* <video
          className="absolute inset-0 w-full h-full object-cover"
          
          autoPlay
          loop
          poster='https://res.cloudinary.com/dzdtdce9p/video/upload/v1752859859/wydex-carrer_hknspp.mp4'
          muted
          playsInline
        />
        <source src='https://res.cloudinary.com/dzdtdce9p/video/upload/v1752859859/butterfly_oumulj.mp4' type='video/mp4' />
            Your browser does not support the video tag. */
            <video
            autoPlay
            loop
            muted
            playsInline
            poster='https://res.cloudinary.com/dzdtdce9p/video/upload/v1752859859/wydex-carrer_hknspp.mp4'
            className='absolute inset-0 w-full h-full object-cover z-0 transition-all duration-[2000ms] ease-out'
          >
            <source src='https://res.cloudinary.com/dzdtdce9p/video/upload/v1752859859/wydex-carrer_hknspp.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
            }
          
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 px-4">
          <h1 className="text-4xl text-white md:text-6xl font-bold mb-4 text-center">Let Our Team<br />Be Your New Team</h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl text-center mb-8">
            We always strive to make a positive difference in everything. If that’s important to you; Wydex would be a good fit.
          </p>
          <button
            onClick={handleScrollToOpenings}
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Current openings &rarr;
          </button>
        </div>
      </div>

      {/* Openings List */}
      <div className="bg-black min-h-screen">
      {/* Current Openings Section */}
      <div className="py-20 px-4">
        <div id="openings" className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Current Openings
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Find your next opportunity and join our team of innovators
            </p>
          </div>
          
          {/* Job Listings */}
          <div className="space-y-8">
            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No openings at the moment</h3>
                <p className="text-gray-400 text-lg">Check back soon for new opportunities!</p>
              </div>
            ) : (
              jobs.map((job, idx) => (
                <div
                  key={job._id || idx}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <h3 className="text-3xl md:text-4xl font-black text-black group-hover:text-gray-800 transition-colors">
                          {job.title}
                        </h3>
                        <span className="bg-black text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                          {job.type}
                        </span>
                      </div>
                      
                      {/* Job Meta */}
                      <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5" />
                          <span className="font-semibold">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span className="font-semibold">{job.department}</span>
                        </div>
                      </div>
                      
                      {/* Job Description */}
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {job.description}
                      </p>
                    </div>
                    
                    {/* Apply Button */}
                    <div className="flex-shrink-0 flex items-center">
                      <button
                        onClick={() => handleOpenModal(job.title)}
                        className="group/btn relative inline-flex items-center bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden cursor-pointer"
                      >
                        {/* Button background animation */}
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                        <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                          Apply Now
                        </span>
                        <ArrowRight className="relative z-10 w-5 h-5 ml-3 group-hover/btn:translate-x-1 group-hover/btn:text-black transition-all duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-4 border-black">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-200">
                <div>
                  <h2 className="text-2xl font-black text-black">Apply Now</h2>
                  <p className="text-gray-600 font-semibold">{applyingJob}</p>
                </div>
                <button 
                  onClick={handleCloseModal} 
                  className="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Application Form */}
              <div className="space-y-6">
                
                <div>
                  <label className="block font-black mb-3 text-black text-lg">Full Name *</label>
                  <input 
                    name="name" 
                    type="text" 
                    value={form.name} 
                    onChange={handleFormChange} 
                    required 
                    className="w-full border-2 border-gray-300 px-4 py-4 rounded-xl focus:border-black focus:outline-none transition-colors font-semibold text-lg" 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block font-black mb-3 text-black text-lg">Email Address *</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleFormChange} 
                    required 
                    className="w-full border-2 border-gray-300 px-4 py-4 rounded-xl focus:border-black focus:outline-none transition-colors font-semibold text-lg" 
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block font-black mb-3 text-black text-lg">Phone Number</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    value={form.phone} 
                    onChange={handleFormChange} 
                    className="w-full border-2 border-gray-300 px-4 py-4 rounded-xl focus:border-black focus:outline-none transition-colors font-semibold text-lg" 
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block font-black mb-3 text-black text-lg">Cover Letter</label>
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleFormChange} 
                    className="w-full border-2 border-gray-300 px-4 py-4 rounded-xl focus:border-black focus:outline-none transition-colors font-semibold text-lg resize-none" 
                    rows={4}
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>
                
                <div>
                  <label className="block font-black mb-3 text-black text-lg">Resume (PDF, max 2MB) *</label>
                  <div className="flex items-center gap-4">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="flex items-center px-6 py-4 bg-gray-100 rounded-xl hover:bg-gray-200 text-black transition-colors border-2 border-gray-300 hover:border-gray-400 font-bold"
                    >
                      <Paperclip className="w-5 h-5 mr-2" />
                      Choose File
                    </button>
                    {form.resume && (
                      <div className="flex items-center text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200 font-semibold">
                        <span className="text-green-600 mr-2">✓</span>
                        {form.resume.name}
                      </div>
                    )}
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
                  {fileError && (
                    <div className="text-red-600 text-sm mt-3 bg-red-50 p-3 rounded-lg border border-red-200 font-semibold">
                      {fileError}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  {fieldWarning && (
                    <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border-2 border-red-200 font-semibold">
                      {fieldWarning}
                    </div>
                  )}
                  <button 
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={formLoading || !!fileError || !form.resume} 
                    className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    {formLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
                
                {formMsg && (
                  <div className="text-center text-green-700 bg-green-50 p-4 rounded-xl border-2 border-green-200 font-bold text-lg">
                    {formMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      
    </AppShell>
  );
} 