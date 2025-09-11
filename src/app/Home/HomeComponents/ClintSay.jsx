import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: `"Wydex Media’s expertise and dedication helped us scale Interval to new heights. Their team truly feels like an extension of ours."`,
    name: 'Aslah Thadathil',
    role: 'Co-founder of Interval',
    image: './images/aslah.png',
  },
  {
    quote: `"The team at Wydex is proactive, professional, and always delivers more than expected. Highly recommended!"`,
    name: 'Muhammed Arshad',
    role: 'COO Magic Lambs',
    image: '/images/arshad.jpeg',
  },
  {
    quote: `"From branding to digital marketing, Wydex Media is our go-to partner for growth and innovation."`,
    name: 'Fazil',
    role: 'proprietor of parcel service calicut',
    image: '/images/fazil.jpeg',
  },
  {
    quote: `"Wydex Media transformed our digital presence and helped us reach new customers. Their creativity and professionalism are unmatched."`,
    name: 'Sadik',
    role: 'CEO Camiya Diamonds',
    image: '',
  },
  {
    quote: `"The Wydex team delivered results beyond our expectations. Highly recommend them for any business looking to grow online."`,
    name: 'CEO Nilam Builders',
    role: 'CEO Nilam Builders',
    image: '',
  },
];

function ClintSay() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  // Auto-advance every 4 seconds
  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Swipe handlers (basic)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    } else if (distance < -minSwipeDistance) {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="py-20 px-4 bg-black ">
      {/* Geometric Background Elements */}
    

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-gray-300"></div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white">
                What Our Clients Say
              </h2>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
          </div>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Real stories from our valued partners
          </p>
        </div>

        {/* Carousel */}
        <div
          className="flex justify-center items-center relative max-w-2xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-full">
            <div className="group relative h-full">
              <div className="bg-white p-10 rounded-2xl shadow-md relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full min-h-[380px] justify-between">
                {/* Simple Quote Mark */}
                <div className="absolute top-6 left-8 text-6xl text-gray-200 font-serif leading-none z-0 select-none">“</div>
                {/* Content */}
                <div className="relative z-10 pt-8 flex flex-col h-full justify-between">
                  <blockquote className="text-gray-900 text-lg leading-relaxed mb-8 font-normal min-h-24 italic">
                    {testimonials[current].quote}
                  </blockquote>
                  <div className="flex items-center pt-6 border-t border-gray-200 mt-auto">
                    {testimonials[current].image ? (
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 shadow-sm mr-4"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-2xl rounded-full mr-4">
                        {testimonials[current].name.split(' ')[0][0]}
                      </div>
                    )}
                    <div>
                      <div className="text-gray-900 font-bold text-lg uppercase tracking-wide">{testimonials[current].name}</div>
                      <div className="text-gray-500 text-sm font-medium">{testimonials[current].role}</div>
                    </div>
                  </div>
                </div>
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-20 rounded-2xl"></div>
              </div>
            </div>
          </div>
          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-4 md:mt-0 absolute w-full left-0 top-full md:static md:w-auto md:top-auto md:left-auto">
            <button
              className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all duration-200 mx-2 md:mx-0"
              onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all duration-200 mx-2 md:mx-0"
              onClick={() => setCurrent((current + 1) % testimonials.length)}
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8">
            <div className="w-20 h-px bg-white"></div>
            <span className="text-white/60 text-sm uppercase tracking-widest font-medium">
              Trusted by Industry Leaders
            </span>
            <div className="w-20 h-px bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClintSay;
