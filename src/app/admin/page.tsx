'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Calendar, Download, Edit2, Filter, Plus, Search, Trash2, X, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { showToast } from '@/lib/toast';
import { toast } from 'sonner';
const BlogEditor = dynamic(() => import('./BlogEditor'), { ssr: false });

// Define proper interfaces instead of using 'any'
interface Job {
  _id: string;
  title: string;
  description: string;
  type: string; // Job type (e.g. Full-time, Part-time)
  location: string; // Job location
  department: string; // Job department
  createdAt?: string;
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  createdAt?: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  jobRole: string;
  resume: string;
  createdAt?: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  content: string;
  createdAt?: string;
}

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Job management - Replace any[] with Job[]
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobMsg, setJobMsg] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDepartment, setJobDepartment] = useState('');

  // Enquiries - Replace any[] with Enquiry[]
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  // Applications - Replace any[] with Application[]
  const [applications, setApplications] = useState<Application[]>([]);
  const [appFilter, setAppFilter] = useState('');
  const [deleteAppId, setDeleteAppId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries' | 'blogs'>('jobs');

  // Blog state - Replace any[] with Blog[]
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogMsg, setBlogMsg] = useState('');
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  // Add this state for step control
  const [blogStep, setBlogStep] = useState(1);

  useEffect(() => {
    // Persist login state using localStorage
    const storedLogin = localStorage.getItem('wydex_admin_logged_in');
    if (storedLogin === 'true') {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchJobs();
      fetchEnquiries();
      fetchApplications();
      fetchBlogs();
      localStorage.setItem('wydex_admin_logged_in', 'true');
    } else {
      localStorage.removeItem('wydex_admin_logged_in');
    }
  }, [loggedIn]);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/jobs');
    const data: Job[] = await res.json();
    setJobs(data);
  };

  const fetchEnquiries = async () => {
    const res = await fetch('/api/enquiry');
    const data: Enquiry[] = await res.json();
    setEnquiries(data);
  };

  const fetchApplications = async () => {
    const res = await fetch('/api/career/applications');
    const data: Application[] = await res.json();
    setApplications(data);
  };

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data: Blog[] = await res.json();
    setBlogs(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        setLoggedIn(true);
        showToast.success('Welcome back!', 'Successfully logged in');
      } else {
        setError(data.message || 'Login failed');
        showToast.error('Login Failed', data.message || 'Invalid credentials');
      }
    } catch {
      showToast.error('Login Failed', 'An error occurred during login');
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobMsg('');
    
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: jobTitle,
          description: jobDesc,
          type: jobType,
          location: jobLocation,
          department: jobDepartment
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setJobMsg('Job added!');
        setJobTitle('');
        setJobDesc('');
        setJobType('');
        setJobLocation('');
        setJobDepartment('');
        fetchJobs();
        showToast.success('Job Added!', 'New position has been created successfully');
      } else {
        setJobMsg(data.message || 'Error adding job');
        showToast.error('Failed to Add Job', data.message || 'An error occurred');
      }
    } catch {
      showToast.error('Failed to Add Job', 'An error occurred while adding the job');
    }
  };

  const handleEditJob = (job: Job) => {
    setEditJob(job);
    setEditTitle(job.title);
    setEditDesc(job.description);
    setJobType(job.type);
    setJobLocation(job.location);
    setJobDepartment(job.department);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;
    
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editJob._id,
          title: editTitle,
          description: editDesc,
          type: jobType,
          location: jobLocation,
          department: jobDepartment
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setEditJob(null);
        setEditTitle('');
        setEditDesc('');
        setJobType('');
        setJobLocation('');
        setJobDepartment('');
        fetchJobs();
        showToast.success('Job Updated!', 'Position has been updated successfully');
      } else {
        showToast.error('Failed to Update Job', data.message || 'An error occurred');
      }
    } catch {
      showToast.error('Failed to Update Job', 'An error occurred while updating the job');
    }
  };

  const handleDeleteJob = async (id: string) => {
    const loadingToast = showToast.loading('Deleting job position...');
    
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      
      // Always dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (data.success) {
        setDeleteJobId(null);
        fetchJobs();
        showToast.success('Job Deleted!', 'Position has been removed successfully');
      } else {
        showToast.error('Failed to Delete Job', data.message || 'An error occurred');
      }
    } catch {
      toast.dismiss(loadingToast);
      showToast.error('Failed to Delete Job', 'An error occurred while deleting the job');
    }
  };

  // Helper to check if Tiptap HTML is empty
  const isContentEmpty = (html: string) => {
    if (!html) return true;
    // Remove all tags and whitespace
    const cleaned = html.replace(/<(.|\n)*?>/g, '').replace(/&nbsp;/g, '').trim();
    return (
      cleaned === '' ||
      html === '<p></p>' ||
      html === '<p><br></p>' ||
      html === '<p> </p>'
    );
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogMsg('');

    if (!blogTitle.trim() || !blogDesc.trim() || isContentEmpty(blogContent)) {
      setBlogMsg('Please fill in all required fields and add blog content.');
      showToast.warning('Missing Required Fields', 'Please fill in all required fields and add blog content.');
      return;
    }
    
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: blogTitle, description: blogDesc, image: blogImage, content: blogContent })
      });
      const data = await res.json();
      
      if (data.success) {
        setBlogMsg('Blog added!');
        setBlogTitle('');
        setBlogDesc('');
        setBlogImage('');
        setBlogContent('');
        setBlogStep(1);
        fetchBlogs();
        showToast.success('Blog Published!', 'Your blog post has been published successfully');
      } else {
        setBlogMsg(data.message || 'Error adding blog');
        showToast.error('Failed to Publish Blog', data.message || 'An error occurred');
      }
    } catch {
      showToast.error('Failed to Publish Blog', 'An error occurred while publishing the blog');
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditBlog(blog);
    setBlogTitle(blog.title);
    setBlogDesc(blog.description);
    setBlogImage(blog.image || '');
    setBlogContent(blog.content);
  };

  const handleEditBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBlog) return;
    
    try {
      const res = await fetch('/api/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editBlog._id, title: blogTitle, description: blogDesc, image: blogImage, content: blogContent })
      });
      const data = await res.json();
      
      if (data.success) {
        setEditBlog(null);
        setBlogTitle('');
        setBlogDesc('');
        setBlogImage('');
        setBlogContent('');
        setBlogStep(1);
        fetchBlogs();
        setBlogMsg('Blog updated successfully!');
        showToast.success('Blog Updated!', 'Your blog post has been updated successfully');
      } else {
        showToast.error('Failed to Update Blog', data.message || 'An error occurred');
      }
    } catch {
      showToast.error('Failed to Update Blog', 'An error occurred while updating the blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const loadingToast = showToast.loading('Deleting blog post...');
    
    try {
      const res = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      
      // Always dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (data.success) {
        setDeleteBlogId(null);
        fetchBlogs();
        showToast.success('Blog Deleted!', 'Blog post has been removed successfully');
      } else {
        showToast.error('Failed to Delete Blog', data.message || 'An error occurred');
      }
    } catch {
      toast.dismiss(loadingToast);
      showToast.error('Failed to Delete Blog', 'An error occurred while deleting the blog');
    }
  };

  // Download resume from S3
  const handleDownloadResume = async (key: string) => {
    const res = await fetch('/api/s3/resume-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    const { url } = await res.json();
    window.open(url, '_blank');
  };

  // Delete application
  const handleDeleteApplication = async (id: string) => {
    const loadingToast = showToast.loading('Deleting application...');
    
    try {
      const res = await fetch('/api/career/applications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      
      // Always dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (data.success) {
        setDeleteAppId(null);
        fetchApplications();
        showToast.success('Application Deleted!', 'Application has been removed successfully');
      } else {
        showToast.error('Failed to Delete Application', data.message || 'An error occurred');
      }
    } catch {
      toast.dismiss(loadingToast);
      showToast.error('Failed to Delete Application', 'An error occurred while deleting the application');
    }
  };

  const tabs = [
    { id: 'jobs', label: 'Jobs', count: jobs.length },
    { id: 'applications', label: 'Applications', count: applications.length },
    { id: 'enquiries', label: 'Enquiries', count: enquiries.length },
    { id: 'blogs', label: 'Blogs', count: blogs.length },
  ];

  // Admin Navbar
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="focus:outline-none cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <button type="submit" className="w-full bg-black cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black tracking-tight">Admin</h1>
              <nav className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white text-black'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={() => {
                setLoggedIn(false);
                showToast.success('Logged Out', 'You have been successfully logged out');
              }}
              className="px-4 py-2 border cursor-pointer border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {/* Add Job Form */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Position
              </h2>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Position Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Job Type (e.g. Full-time, Part-time)"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Job Location"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Job Department"
                    value={jobDepartment}
                    onChange={(e) => setJobDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Job Description"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 cursor-pointer bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Add Position
                </button>
                {jobMsg && (
                  <div className="text-green-600 font-medium">{jobMsg}</div>
                )}
              </form>
            </div>

            {/* Jobs List */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Open Positions</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job._id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">{job.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{job.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="p-2 cursor-pointer text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteJobId(job._id)}
                          className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    No positions found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Applications</h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={appFilter}
                  onChange={(e) => setAppFilter(e.target.value)}
                  className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">All Positions</option>
                  {[...new Set(applications.map(a => a.jobRole))].map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applied</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.filter(a => !appFilter || a.jobRole === appFilter).map(app => (
                      <tr key={app._id} className="border-b border-gray-50 hover:bg-gray-25 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-black">{app.name}</div>
                            <div className="text-sm text-gray-600">{app.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{app.jobRole}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDownloadResume(app.resume)}
                              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-black hover:text-white transition-colors duration-200 text-sm font-medium"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </button>
                            <button
                              onClick={() => setDeleteAppId(app._id)}
                              className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 text-sm font-medium"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {applications.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    No applications found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Enquiries</h2>
            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div key={enq._id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-black">{enq.name}</h3>
                      <p className="text-gray-600">{enq.email}</p>
                      {enq.phone && <p className="text-gray-600">{enq.phone}</p>}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{enq.message}</p>
                </div>
              ))}
              {enquiries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  No enquiries found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            {/* Add/Edit Blog Form */}
            {!editBlog && blogStep === 1 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Blog
                </h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!blogTitle.trim() || !blogDesc.trim()) {
                    setBlogMsg('Please fill in all required fields.');
                    return;
                  }
                  setBlogMsg('');
                  setBlogStep(2);
                }} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                  <textarea
                    placeholder="Short Description"
                    value={blogDesc}
                    onChange={(e) => setBlogDesc(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Featured Image URL"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-6 cursor-pointer py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Continue to Content
                  </button>
                  {blogMsg && (
                    <div className="text-red-600 font-medium">{blogMsg}</div>
                  )}
                </form>
              </div>
            )}

            {!editBlog && blogStep === 2 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Blog Content</h2>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <BlogEditor value={blogContent} onChange={setBlogContent} />
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setBlogStep(1)}
                      className="px-6 py-3 cursor-pointer border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 cursor-pointer py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Publish Blog
                    </button>
                  </div>
                  {blogMsg && (
                    <div className="text-green-600 font-medium">{blogMsg}</div>
                  )}
                </form>
              </div>
            )}

            {editBlog && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Edit Blog</h2>
                <form onSubmit={handleEditBlogSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                  <textarea
                    placeholder="Short Description"
                    value={blogDesc}
                    onChange={(e) => setBlogDesc(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Featured Image URL"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                  <BlogEditor value={blogContent} onChange={setBlogContent} />
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditBlog(null);
                        setBlogTitle('');
                        setBlogDesc('');
                        setBlogImage('');
                        setBlogContent('');
                        setBlogStep(1);
                      }}
                      className="px-6 py-3 cursor-pointer border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 cursor-pointer py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Update Blog
                    </button>
                  </div>
                  {blogMsg && (
                    <div className="text-green-600 font-medium">{blogMsg}</div>
                  )}
                </form>
              </div>
            )}

            {/* Blogs List */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Published Blogs</h2>
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        {blog.image && (
                          <Image
                            src={blog.image}
                            alt="Blog"
                            width={100}
                            height={60}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black mb-2">{blog.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{blog.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="p-2 cursor-pointer text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteBlogId(blog._id)}
                          className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    No blogs found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {editJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Edit Position</h2>
              <button
                onClick={() => setEditJob(null)}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Delete Position</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteJobId(null)}
                  className="flex-1 cursor-pointer px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteJob(deleteJobId)}
                  className="flex-1 cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteBlogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Delete Blog</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteBlogId(null)}
                  className="flex-1 cursor-pointer px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteBlog(deleteBlogId)}
                  className="flex-1 cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Delete Application</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteAppId(null)}
                  className="flex-1 cursor-pointer px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteApplication(deleteAppId)}
                  className="flex-1 cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}