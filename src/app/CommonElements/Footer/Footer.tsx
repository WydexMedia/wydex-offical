"use client";
import React from 'react';
import { Phone, Mail, MessageCircle, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

function FooterPage() {
  return (
    <footer className="relative bg-black w-full text-white overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 flex justify-center items-center">
                <Image
                  src="/images/wydex-whitelogo.png"
                  alt="Wydex Logo"
                  width={50}
                  height={50}
                  className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="text-xl font-semibold text-blue-400">WYDEX Media</p>
            </div>

            <p className="text-gray-400 text-base leading-relaxed text-center">
              Driving growth through creative marketing and technology solutions tailored for your success.
            </p>

            <div className="flex justify-center space-x-6 pt-4">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-400 border-b border-blue-400/30 pb-3">
              Company
            </h3>
            <div className="space-y-3">
              {['About', 'Services', 'Industries', 'Works', 'Careers', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 text-base"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-400 border-b border-blue-400/30 pb-3">
              Services
            </h3>
            <div className="space-y-3">
              {['Branding', 'Experience Design', 'Technology', 'Digital Marketing', 'Resource Augmentation', 'Partnership'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 text-base"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-400 border-b border-blue-400/30 pb-3">
              Connect
            </h3>
            <div className="space-y-5">
              {[
                { label: 'General', icon: <Phone />, value: '+91 9188380779', href: 'tel:+91 9188380779' },
                { label: 'Email', icon: <Mail />, value: 'wydexmedia@gmail.com', href: 'mailto:wydexmedia@gmail.com' },
                { label: 'WhatsApp', icon: <MessageCircle />, value: '+91 9188380779', href: 'https://wa.me/9188380779' },
                { label: 'HR Enquiry', icon: <Phone />, value: '+91 7593 885 895', href: 'tel:+917593885895' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="text-blue-400 group-hover:scale-110 transition-transform w-5 h-5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <a href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors text-base">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-base">
              <span className="text-blue-400 font-bold">WYDEX</span> © 2025 All rights reserved
            </div>
            <div className="flex space-x-8 text-base">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;