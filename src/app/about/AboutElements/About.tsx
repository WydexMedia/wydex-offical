import React, { useEffect, useRef } from 'react'; 

function About() {
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
        
        const elements = document.querySelectorAll<HTMLElement>('.platform-card, .section-header');
        elements.forEach(el => {
            observerRef.current?.observe(el);
        });
        
        return () => {
            observerRef.current?.disconnect();
        };
    }, []);
    
    return (
        <>
            {/* About Section */}
            <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='dots' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='%23000000'/></pattern></defs><rect width='100' height='100' fill='url(%23dots)'/></svg>")`
                        }}
                    />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="section-header text-center mb-12 sm:mb-16 lg:mb-20">
                        
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900 leading-tight">
                            Smart Advertising Choices That 
                            <span className="block bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mt-2">
                                Drive Results
                            </span>
                        </h2>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Choosing where to invest your advertising budget is one of the most important decisions for your business.
                            We help you make smart, result-driven choices between Google Ads and Meta Ads to maximize your return.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
                        {/* Google Ads Card */}
                        <div className="platform-card group relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                            {/* Card Header */}
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                                    🔍
                                </div>
                                <div className="w-full h-1 bg-gradient-to-r from-gray-900 to-transparent rounded-full"></div>
                            </div>
                            
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                                Google Ads: Capturing People Ready to Buy
                            </h3>
                            
                            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Google Ads helps you connect with customers who are already looking for your product or service.
                                When someone types a keyword into Google Search, your ad appears right when they&apos;re ready to make a decision.
                            </p>

                            {/* Best For Section */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border border-gray-200">
                                <h4 className="text-gray-900 mb-4 text-base sm:text-lg font-semibold flex items-center">
                                    <span className="text-xl sm:text-2xl mr-2">💡</span>
                                    Best for:
                                </h4>
                                <ul className="space-y-3">
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-purple-600 font-bold">→</span>
                                        Businesses offering services that customers actively search for
                                    </li>
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-purple-600 font-bold">→</span>
                                        E-commerce stores targeting specific buying intent
                                    </li>
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-purple-600 font-bold">→</span>
                                        Local businesses wanting instant visibility
                                    </li>
                                </ul>
                            </div>

                            {/* Benefits List */}
                            <ul className="space-y-4">
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Your business shows up at the right moment — when customers are searching</span>
                                </li>
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Detailed targeting by keywords, location, language, device</span>
                                </li>
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Wide visibility across Google Search, YouTube, and partner sites</span>
                                </li>
                            </ul>
                            
                            {/* Card Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">High Intent Traffic</span>
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Meta Ads Card */}
                        <div className="platform-card group relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
                            {/* Card Header */}
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                                    📱
                                </div>
                                <div className="w-full h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                            </div>
                            
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                                Meta Ads: Building Interest, Demand & Relationships
                            </h3>
                            
                            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Meta Ads display across Facebook, Instagram, Messenger, and the Audience Network.
                                These ads target users based on interests, behavior, age, location, and more — even when they aren&apos;t searching for your product.
                            </p>

                            {/* Best For Section */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border border-blue-200">
                                <h4 className="text-gray-900 mb-4 text-base sm:text-lg font-semibold flex items-center">
                                    <span className="text-xl sm:text-2xl mr-2">💡</span>
                                    Best for:
                                </h4>
                                <ul className="space-y-3">
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-cyan-600 font-bold">→</span>
                                        Brands focused on creating demand and awareness
                                    </li>
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-cyan-600 font-bold">→</span>
                                        Businesses with strong visual or lifestyle appeal
                                    </li>
                                    <li className="relative pl-6 text-gray-700 text-sm sm:text-base">
                                        <span className="absolute left-0 text-cyan-600 font-bold">→</span>
                                        Lead generation campaigns with forms or WhatsApp integration
                                    </li>
                                </ul>
                            </div>

                            {/* Benefits List */}
                            <ul className="space-y-4">
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Powerful audience targeting based on interests and demographics</span>
                                </li>
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Engaging formats: reels, stories, carousels, videos, and more</span>
                                </li>
                                <li className="relative pl-8 text-gray-700 text-sm sm:text-base flex items-start">
                                    <span className="absolute left-0 text-green-600 font-bold text-lg">✓</span>
                                    <span>Lower cost for awareness and engagement campaigns</span>
                                </li>
                            </ul>
                            
                            {/* Card Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Brand Awareness</span>
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                        <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom CTA */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-4">
                            <div className="bg-white rounded-full px-8 py-3">
                                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    Ready to Choose Your Platform?
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Let&apos;s discuss which advertising platform aligns best with your business goals
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;