import React from 'react';

const WhyChooseWydexMedia: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Why Choose Wydex Media?
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            As the best digital marketing agency in Calicut, we believe success comes from the right strategy, 
            creative quality, and continuous improvement. We help brands grow faster with smart, performance-driven ad campaigns.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                The right choice depends on your business goals, customer journey, and budget.
              </p>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Our team helps you craft a custom plan that ensures your ad spend brings maximum return.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors duration-300">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Strategic Approach</h3>
            <p className="text-gray-400">Data-driven strategies tailored to your unique business needs and market position.</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors duration-300">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">C</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Creative Excellence</h3>
            <p className="text-gray-400">High-quality creative content that captures attention and drives engagement.</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors duration-300">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">R</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Results-Driven</h3>
            <p className="text-gray-400">Continuous optimization and improvement to maximize your return on investment.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors duration-300 shadow-lg cursor-pointer">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseWydexMedia;