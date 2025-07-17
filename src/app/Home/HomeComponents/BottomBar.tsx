import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

// Add BlogPost type for type safety
interface BlogPost {
  _id: string;
  image?: string;
  title: string;
  description: string;
  author?: string;
  createdAt?: string;
}

function BottomBar() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogPosts(data));
  }, []);

  const handleGetStarted = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden" id="blog">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-600/10 to-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Get Started Button */}
      <div className="text-center mb-10">
        <button onClick={handleGetStarted} className="inline-block px-8 py-4 bg-white text-black font-semibold text-lg rounded-full shadow hover:bg-gray-200 transition-all duration-300 cursor-pointer">
          Get Started
        </button>
      </div>

      <div className="mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
              Insights & Knowledge
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Latest
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blog Posts
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with our expert insights, industry trends, and actionable strategies
            to elevate your digital marketing game.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex flex-nowrap space-x-6 my-3">
            {blogPosts.map((post, index) => (
              <div key={post._id}>
                <div
                  className={`${index === 0 && 'ml-5'} flex-shrink-0 w-80 bg-gray-900 overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 border-gray-800`}
                >
                  <div className="relative overflow">
                    <img
                      src={post.image || '/images/default.jpg'}
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center space-x-3 text-gray-400 text-xs mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post._id}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition-all"
                    >
                      <span>Read More</span>
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                {blogPosts.length - 1 === index && <div className='text-black'>h</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BottomBar;