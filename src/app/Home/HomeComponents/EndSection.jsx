import React from 'react';

const EndSection = () => {
  const handleExploreClick = () => {
    window.open('career.html', '_blank');
  };

  return (
    <section id="career" className="bg-white text-black py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-transparent to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 border border-black/10 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 border border-black/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side */}
        <div className="space-y-8 lg:pr-8">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-300 pb-1">
                Career Opportunity
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              You Will{' '}
              <span className="relative">
                Like
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-black transform -skew-y-1"></div>
              </span>{' '}
              It Here!
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
              At <span className="font-semibold text-black">WYDEX</span>, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let's make a fruitful journey!
            </p>
          </div>

          <div className="space-y-4">
            <a href="/career" className="inline-block w-full">
              <button
                type="button"
                className="group relative inline-flex items-center w-full justify-center px-8 py-4 bg-black text-white font-semibold text-lg rounded-full hover:cursor-pointer  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6 cursor-pointer"
              >
                <span className="relative z-10">Explore Opportunities</span>
                <div className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </a>
            
            
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center items-center">
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <img
                src="/images/Human.png"
                alt="Professional team member"
                className="rounded-xl w-full max-w-md object-cover h-96"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-2 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-black/20 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-black/30 rounded-full"></div>
            
            {/* Floating Badge */}
            <div className="absolute -top-8 -left-8 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Join Us
            </div>
          </div>

          {/* Circular Text */}
          <div className="absolute bottom-2 right-8 animate-spin" style={{ animation: 'spin 20s linear infinite' }}>
            <svg viewBox="0 0 200 200" className="w-32 h-32">
              <defs>
                <path
                  id="circle"
                  d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                />
              </defs>
              <text fill="black" fontSize="16" fontWeight="600">
                <textPath href="#circle" startOffset="0%">
                  JOIN OUR TEAM  •  JOIN OUR TEAM  •  JOIN OUR TEAM  •  JOIN OUR TEAM  •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-20"></div>
    </section>
  );
};

export default EndSection;