"use client";
import Image from 'next/image';
import React from 'react';
const clientLogos = [
  { src: '/wydex Clinets black/ATHER  best digital marketing agency in calicut.webp', alt: 'Ather' },
  { src: '/wydex Clinets black/BAMBEE  best digital marketing agency in calicut.webp', alt: 'Bambee' },
  { src: '/wydex Clinets black/BEXLEY  best digital marketing agency in calicut.webp', alt: 'Bexley' },
  { src: '/wydex Clinets black/BNI  best digital marketing agency in calicut.webp', alt: 'BNI' },
  { src: '/wydex Clinets black/BOTIQUEEN  best digital marketing agency in calicut.webp', alt: 'Botiqueen' },
  { src: '/wydex Clinets black/CAMIYA  best digital marketing agency in calicut.webp', alt: 'Camiya' },
  { src: '/wydex Clinets black/care best digital marketing agency in calicut.webp', alt: 'Care' },
  { src: '/wydex Clinets black/CHILLIES RESTAURENT  best digital marketing agency in calicut.webp', alt: 'Chillies Restaurant' },
  { src: '/wydex Clinets black/COBALT  best digital marketing agency in calicut.webp', alt: 'Cobalt' },
  { src: '/wydex Clinets black/FIALOVY  best digital marketing agency in calicut.webp', alt: 'Fialovy' },
  { src: '/wydex Clinets black/FINJET  best digital marketing agency in calicut.webp', alt: 'Finjet' },
  { src: '/wydex Clinets black/FLAVOURS OF KERALA  best digital marketing agency in calicut.webp', alt: 'Flavours of Kerala' },
  { src: '/wydex Clinets black/FOO FOODS  best digital marketing agency in calicut.webp', alt: 'Foo Foods' },
  { src: '/wydex Clinets black/GROVEX  best digital marketing agency in calicut.webp', alt: 'Grovex' },
  { src: '/wydex Clinets black/Grovex best digital marketing agency in calicut.webp', alt: 'Grovex' },
  { src: '/wydex Clinets black/HISLEEP  best digital marketing agency in calicut.webp', alt: 'Hisleep' },
  { src: '/wydex Clinets black/INTERVAL  best digital marketing agency in calicut.webp', alt: 'Interval' },
  { src: '/wydex Clinets black/ISTORIES  best digital marketing agency in calicut.webp', alt: 'Istories' },
  { src: '/wydex Clinets black/LINEN PALACE  best digital marketing agency in calicut.webp', alt: 'Linen Palace' },
  { src: '/wydex Clinets black/MECHTRON  best digital marketing agency in calicut.webp', alt: 'Mechtron' },
  { src: '/wydex Clinets black/NAADAN BLOGGERS  best digital marketing agency in calicut.webp', alt: 'Naadan Bloggers' },
  { src: '/wydex Clinets black/NURTURE  best digital marketing agency in calicut.webp', alt: 'Nurture' },
  { src: '/wydex Clinets black/PG  best digital marketing agency in calicut.webp', alt: 'PG' },
  { src: '/wydex Clinets black/POGO  best digital marketing agency in calicut.webp', alt: 'Pogo' },
  { src: '/wydex Clinets black/PROSKILL  best digital marketing agency in calicut.webp', alt: 'Proskill' },
  { src: '/wydex Clinets black/SAVIDHAM  best digital marketing agency in calicut.webp', alt: 'Savidham' },
  { src: '/wydex Clinets black/UMAI  best digital marketing agency in calicut.webp', alt: 'Umai' },
  { src: '/wydex Clinets black/VHARA  best digital marketing agency in calicut.webp', alt: 'Vhara' },
  { src: '/wydex Clinets black/ZELEBRAE  best digital marketing agency in calicut.webp', alt: 'Zelebrae' },
  { src: '/wydex Clinets black/ZOOTY  best digital marketing agency in calicut.webp', alt: 'Zooty' },
];

export default function ListClients() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Clients
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our clients are everything to us; so are we to them.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="group flex items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center">
          <button
            type="button"
            onClick={() => router.push('/Home/listClients')}
            className="
      group cursor-pointer
      inline-flex flex-col items-center justify-center
      px-4 py-4 md:px-10
      bg-black rounded-lg
      shadow-lg hover:shadow-2xl
      transition-all duration-300
      cursor-pointer
    "
          >
            <p className="text-2xl md:text-3xl font-semibold text-white mb-4 text-center">
              Our client stories do not end here...
            </p>
            <div
              className="
        inline-flex items-center
        text-gray-400 group-hover:text-white
        transition-colors duration-300
      "
            >
              <svg
                className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div> */}


      </div>
    </section>
  );
}