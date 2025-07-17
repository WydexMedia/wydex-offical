

import React, { useEffect, useRef } from 'react';

const WydexMedia: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll<HTMLElement>('.platform-card, .decision-guide');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-[500px] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center justify-center py-24 md:py-40 px-4 text-center">
        
        {/* Subtle Grid Background Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='0.5'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>")`
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-[1.1]">
            Wydex Media
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl md:text-2xl opacity-90 px-4 md:px-0">
            The Best Digital Marketing Agency in Calicut
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white text-black rounded-full border-2 border-white font-semibold transition-all duration-300 hover:bg-transparent hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
          >
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
};

export default WydexMedia;
