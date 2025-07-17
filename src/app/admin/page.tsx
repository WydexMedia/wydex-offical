'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const BlogEditor = dynamic(() => import('./BlogEditor'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Job management
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobMsg, setJobMsg] = useState('');

  // Enquiries
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [editJob, setEditJob] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  // Applications
  const [applications, setApplications] = useState<any[]>([]);
  const [appFilter, setAppFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries' | 'blogs'>('jobs');

  // Blog state
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogMsg, setBlogMsg] = useState('');
  const [editBlog, setEditBlog] = useState<any | null>(null);
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
    const data = await res.json();
    setJobs(data);
  };

  const fetchEnquiries = async () => {
    const res = await fetch('/api/enquiry');
    const data = await res.json();
    setEnquiries(data);
  };

  const fetchApplications = async () => {
    const res = await fetch('/api/career/applications');
    const data = await res.json();
    setApplications(data);
  };

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setLoggedIn(true);
    } else {
      setError(data.message || 'Login failed');
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobMsg('');
    const res = await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: jobTitle, description: jobDesc })
    });
    const data = await res.json();
    if (data.success) {
      setJobMsg('Job added!');
      setJobTitle('');
      setJobDesc('');
      fetchJobs();
    } else {
      setJobMsg(data.message || 'Error adding job');
    }
  };

  const handleEditJob = (job: any) => {
    setEditJob(job);
    setEditTitle(job.title);
    setEditDesc(job.description);
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;
    const res = await fetch('/api/admin/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editJob._id, title: editTitle, description: editDesc })
    });
    const data = await res.json();
    if (data.success) {
      setEditJob(null);
      fetchJobs();
    }
  };
  const handleDeleteJob = async (id: string) => {
    const res = await fetch('/api/admin/jobs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) {
      setDeleteJobId(null);
      fetchJobs();
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
      return;
    }

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
      fetchBlogs();
    } else {
      setBlogMsg(data.message || 'Error adding blog');
    }
  };

  const handleEditBlog = (blog: any) => {
    setEditBlog(blog);
    setBlogTitle(blog.title);
    setBlogDesc(blog.description);
    setBlogImage(blog.image);
    setBlogContent(blog.content);
  };
  const handleEditBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBlog) return;
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
      fetchBlogs();
    }
  };
  const handleDeleteBlog = async (id: string) => {
    const res = await fetch('/api/blogs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) {
      setDeleteBlogId(null);
      fetchBlogs();
    }
  };

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
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-black text-white px-8 py-4 flex gap-6 items-center">
        <span className="text-xl font-bold tracking-wide">Admin</span>
        <button onClick={() => setActiveTab('jobs')} className={activeTab === 'jobs' ? 'underline' : ''}>Jobs</button>
        <button onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'underline' : ''}>Applications</button>
        <button onClick={() => setActiveTab('enquiries')} className={activeTab === 'enquiries' ? 'underline' : ''}>Enquiries</button>
        <button onClick={() => setActiveTab('blogs')} className={activeTab === 'blogs' ? 'underline' : ''}>Blogs</button>
        <div className="flex-1" />
        <button onClick={() => { setLoggedIn(false); }} className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">Logout</button>
      </nav>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <>
            {/* Add Job Form */}
            <form onSubmit={handleAddJob} className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Add Job Requirement</h2>
              <div className="mb-3">
                <input type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg mb-2" required />
                <textarea placeholder="Job Description" value={jobDesc} onChange={e => setJobDesc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Add Job</button>
              {jobMsg && <div className="mt-2 text-green-600">{jobMsg}</div>}
            </form>
            {/* Job List */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Current Job Requirements</h2>
              <ul className="space-y-4">
                {jobs.map((job, idx) => (
                  <li key={job._id || idx} className="border-b pb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-bold">{job.title}</div>
                      <div className="text-gray-700">{job.description}</div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button onClick={() => handleEditJob(job)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => setDeleteJobId(job._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </div>
                  </li>
                ))}
                {jobs.length === 0 && <li className="text-gray-500">No jobs found.</li>}
              </ul>
            </div>
          </>
        )}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Candidate Applications</h2>
            <div className="mb-4">
              <label className="mr-2 font-semibold">Filter by Job Role:</label>
              <select value={appFilter} onChange={e => setAppFilter(e.target.value)} className="border px-2 py-1 rounded">
                <option value="">All</option>
                {[...new Set(applications.map(a => a.jobRole))].map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Job Role</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.filter(a => !appFilter || a.jobRole === appFilter).map(app => (
                    <tr key={app._id}>
                      <td className="p-2 border">{app.name}</td>
                      <td className="p-2 border">{app.email}</td>
                      <td className="p-2 border">{app.jobRole}</td>
                      <td className="p-2 border">{app.createdAt ? new Date(app.createdAt).toLocaleString() : ''}</td>
                      <td className="p-2 border">
                        <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr><td colSpan={5} className="text-center text-gray-500 p-4">No applications found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'enquiries' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Enquiries</h2>
            <ul className="space-y-4">
              {enquiries.map((enq, idx) => (
                <li key={enq._id || idx} className="border-b pb-2">
                  <div className="font-bold">{enq.name} ({enq.email})</div>
                  <div className="text-gray-700">{enq.message}</div>
                  {enq.phone && <div className="text-gray-700">Phone: {enq.phone}</div>}
                  <div className="text-xs text-gray-400">{enq.createdAt ? new Date(enq.createdAt).toLocaleString() : ''}</div>
                </li>
              ))}
              {enquiries.length === 0 && <li className="text-gray-500">No enquiries found.</li>}
            </ul>
          </div>
        )}
        {activeTab === 'blogs' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Blogs</h2>
            {/* Add Blog Form - Step 1: Card Details */}
            {blogStep === 1 && (
              <form onSubmit={e => {
                e.preventDefault();
                if (!blogTitle.trim() || !blogDesc.trim()) {
                  setBlogMsg('Please fill in all required fields.');
                  return;
                }
                setBlogMsg('');
                setBlogStep(2);
              }} className="mb-10 space-y-4">
                <input type="text" placeholder="Blog Title (h1)" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                <textarea placeholder="Short Description" value={blogDesc} onChange={e => setBlogDesc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="Image URL" value={blogImage} onChange={e => setBlogImage(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Next</button>
                {blogMsg && <div className="mt-2 text-green-600">{blogMsg}</div>}
              </form>
            )}
            {/* Add Blog Form - Step 2: Blog Content */}
            {blogStep === 2 && (
              <form onSubmit={handleAddBlog} className="mb-10 space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Content</label>
                  <BlogEditor value={blogContent} onChange={setBlogContent} />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setBlogStep(1)} className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition">Back</button>
                  <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">Save Blog</button>
                </div>
                {blogMsg && <div className="mt-2 text-green-600">{blogMsg}</div>}
              </form>
            )}
            {/* Blog List */}
            <div>
              <h3 className="text-lg font-semibold mb-2">All Blogs</h3>
              <ul className="space-y-4">
                {blogs.map((blog, idx) => (
                  <li key={blog._id || idx} className="border-b pb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-bold text-lg">{blog.title}</div>
                      <div className="text-gray-700">{blog.description}</div>
                      {blog.image && <img src={blog.image} alt="Blog" className="w-32 h-20 object-cover rounded mt-2" />}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button onClick={() => handleEditBlog(blog)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => setDeleteBlogId(blog._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </div>
                  </li>
                ))}
                {blogs.length === 0 && <li className="text-gray-500">No blogs found.</li>}
              </ul>
            </div>
            {/* Delete Confirmation Modal */}
            {deleteBlogId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
                  <button onClick={() => setDeleteBlogId(null)} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black">&times;</button>
                  <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
                  <p>Are you sure you want to delete this blog?</p>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setDeleteBlogId(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={() => handleDeleteBlog(deleteBlogId!)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Edit Job Modal */}
        {editJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button onClick={() => setEditJob(null)} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black">&times;</button>
              <h2 className="text-xl font-bold mb-4">Edit Job</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required className="w-full border px-3 py-2 rounded" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} required className="w-full border px-3 py-2 rounded" rows={3} />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Save Changes</button>
              </form>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {deleteJobId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
              <button onClick={() => setDeleteJobId(null)} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black">&times;</button>
              <h2 className="text-xl font-bold mb-4">Delete Job</h2>
              <p>Are you sure you want to delete this job?</p>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setDeleteJobId(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={() => handleDeleteJob(deleteJobId!)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 