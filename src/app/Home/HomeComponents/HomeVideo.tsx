import React from 'react';

function HomeVideo() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-full ">
        <video
          className="w-full h-full object-cover "
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10  w-full min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center text-center px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl  md:text-7xl  font-bold text-white mb-6 leading-tight">
            Best Digital  Marketing Agency{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
               in Calicut
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience immersive visuals through our creative video storytelling
            </p>

           

          </div>
        </section>


        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>


    </div>
  );
}

export default HomeVideo;