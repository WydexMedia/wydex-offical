import React from 'react';
import {
  Search, Palette, Target, Users
} from 'lucide-react';

const numberColors = ["text-blue-600", "text-purple-600", "text-pink-600", "text-green-600"];
const iconColors = ["text-blue-500", "text-purple-500", "text-pink-500", "text-green-500"];

const services = [
 {
  no: 1,
  title: 'Social Media Marketing',
  description: 'Wydax Media is one of the best digital marketing agencies in Calicut, helping businesses grow with expert social media marketing strategies. We create engaging content, targeted ads, and data-driven campaigns to boost your brand on Facebook, Instagram, and LinkedIn.',
  icon: <Users className="w-12 h-12" />,
  features: [],
},
{
  no: 2,
  title: 'SEO',
  description: 'As one of the best digital marketing agencies in Calicut, we improve your website’s Google ranking with expert SEO strategies. Our services include keyword research, on-page SEO, content optimization, and link building to drive long-term results.',
  icon: <Search className="w-12 h-12" />,
  features: [],
},
{
  no: 3,
  title: 'Web Design & Development',
  description: 'We craft responsive, SEO-friendly websites that blend design with performance. Our web solutions ensure smooth user experience, fast loading speeds, mobile optimization, and a strong online presence that drives conversions.',
  icon: <Palette className="w-12 h-12" />,
  features: [],
},
{
  no: 4,
  title: 'Branding & Strategy',
  description: 'We craft powerful brand identities and strategic roadmaps that resonate with your audience. From logo design to brand positioning, we ensure consistency, clarity, and creativity across all channels to drive lasting impact.',
  icon: <Target className="w-12 h-12" />,
  features: [],
},
  
];

function Services() {
  return (
    <section className="bg-white py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
              Our Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Why Choose the Best Digital Marketing Agency in Calicut? We deliver exceptional results through innovative strategies, 
            cutting-edge technology, and personalized service that drives your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full min-h-[420px] rounded-2xl"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Big Service Number */}
                <div className="flex items-center mb-6">
                  <div className={`text-6xl font-extrabold mr-4 drop-shadow-sm select-none leading-none ${numberColors[index % numberColors.length]}`} style={{WebkitTextStroke: '1px #bdbdbd'}}>
                    {String(service.no).padStart(2, '0')}
                  </div>
                  <div className={iconColors[index % iconColors.length]}>
                    {React.cloneElement(service.icon, { className: "w-12 h-12" })}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CTA Button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
