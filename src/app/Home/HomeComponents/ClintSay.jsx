import React from 'react';

const testimonials = [
  {
    quote: `"Wydex Media’s expertise and dedication helped us scale Interval to new heights. Their team truly feels like an extension of ours."`,
    name: 'Aslah Thadathil',
    role: 'Co-founder of Interval',
    image: '/images/interval.webp',
  },
  {
    quote: `"The team at Wydex is proactive, professional, and always delivers more than expected. Highly recommended!"`,
    name: 'Muhammed Arshad',
    role: 'COO Magic Lambs',
    image: '/images/interval.webp',
  },
  {
    quote: `"From branding to digital marketing, Wydex Media is our go-to partner for growth and innovation."`,
    name: '',
    role: '',
    image: '/images/interval.webp',
  },
];

function ClintSay() {
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

        {/* Testimonials Grid */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div key={index} className="group relative h-full">
              <div className="bg-white p-10 rounded-2xl shadow-md relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full min-h-[380px] justify-between">
                {/* Simple Quote Mark */}
                <div className="absolute top-6 left-8 text-6xl text-gray-200 font-serif leading-none z-0 select-none">“</div>
                {/* Content */}
                <div className="relative z-10 pt-8 flex flex-col h-full justify-between">
                  <blockquote className="text-gray-900 text-lg leading-relaxed mb-8 font-normal min-h-24 italic">
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center pt-6 border-t border-gray-200 mt-auto">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 shadow-sm mr-4"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-2xl rounded-full mr-4">
                        {t.name.split(' ')[0][0]}
                      </div>
                    )}
                    <div>
                      <div className="text-gray-900 font-bold text-lg uppercase tracking-wide">{t.name}</div>
                      <div className="text-gray-500 text-sm font-medium">{t.role}</div>
                    </div>
                  </div>
                </div>
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-20 rounded-2xl"></div>
              </div>
            </div>
          ))}
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
