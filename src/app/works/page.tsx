import React from "react";
import AppShell from "../layout";

interface CaseStudy {
  title: string;
  category: string;
  categoryClass: string;
  image: string;
}

export default function Page() {
  const caseStudies:CaseStudy[] = [
    {
      title:
        "Camiya Diamonds: Helping a reputed diamond brand from Calicut shine online with a stunning new digital presence",
      category: "Retail",
      categoryClass: "text-orange-600",
      image: "/images/camiya_header.jpeg", // Make sure this path is public
    },
    {
      title:
        "IKEA Foods: Delectably designed branded E-commerce store to launch a new sales channel",
      category: "Retail / Food",
      categoryClass: "text-blue-600",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDQwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjNDA4MEZGIi8+CjxyZWN0IHg9IjUwIiB5PSIxMDAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMwMDNCN0YiLz4KPHRleHQgeD0iMjAwIiB5PSIxNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkQ3MDAiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSJib2xkIj5JS0VBPC90ZXh0Pgo8L3N2Zz4K", // Replace with actual or static path
    },
    {
      title:
        "Turtlewax: Achieving glossy greatness for cars with a smooth redefined website",
      category: "Automobile",
      categoryClass: "text-green-600",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDQwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGOEZGIi8+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE0MCIgcj0iNDAiIGZpbGw9IiMzMzMiLz4KPGVsbGlwc2UgY3g9IjEyMCIgY3k9IjE4MCIgcng9IjYwIiByeT0iMTUiIGZpbGw9IiM2NjYiIG9wYWNpdHk9IjAuMyIvPgo8cmVjdCB4PSIyMDAiIHk9IjEwMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IiMwMEZGNzciLz4KPHRleHQgeD0iMjI1IiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTAiPkZMRVg8L3RleHQ+CjxyZWN0IHg9IjI4MCIgeT0iNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0iIzMzMyIgb3BhY2l0eT0iMC4xIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjE0Ij5DYXJ3YXNoPC90ZXh0Pgo8L3N2Zz4K", // Replace with actual or static path
    },
  ];

  return (

    <AppShell>
   <div className="bg-white min-h-screen px-6 pb-20 pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-12 h-px bg-black mr-6 transition-all duration-300" />
            <h1 className="text-6xl md:text-7xl font-extralight text-black tracking-tight">
              Our Team
            </h1>
          </div>
          <div className="flex items-center">
            <div className="w-32 h-px bg-gray-300 mr-6 transition-all duration-300" />
            <span className="text-gray-500 text-sm uppercase tracking-widest">
              {caseStudies.length} Creative Minds
            </span>
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="mb-24">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6 leading-relaxed transition-colors duration-300">
              We believe that great work comes from great people working together.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed transition-colors duration-300">
              Our diverse team brings together expertise from across disciplines, united by a shared passion for creating exceptional experiences. Each member contributes unique perspectives that drive innovation and push creative boundaries.
            </p>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {caseStudies.map((member, index) => (
            <div
              key={index}
              className="group cursor-pointer transform p-3 hover:scale-105 border-1 border-gray-300 transition-transform duration-500 ease-in-out"
              onClick={() => console.log("Team member clicked:", member.title)}
            >
              {/* Image Box with overlay fade */}
              <div className="relative overflow-hidden mb-6  border border-gray-200  transition-all duration-500">
                <img
                  src={member.image}
                  alt={member.title}
                  className="w-full h-80 object-cover transform   transition-transform duration-700 ease-out "
                />
                </div>

              {/* Text Content */}
              <div className="space-y-4 transition-all duration-500 ease-in-out p-3">
                <div className="flex items-center">
                  <div className="w-6 h-px bg-black mr-4 transition-all duration-500" />
                  <span
                    className={`uppercase text-xs font-medium tracking-widest ${member.categoryClass} transition-colors duration-300`}
                  >
                    {member.category}
                  </span>
                </div>

                <h3 className="text-xl font-light text-black leading-relaxed group-hover:text-gray-600 transition-colors duration-500 ease-in-out">
                  {member.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 group-hover:text-black transition-colors duration-500 ease-in-out">
                  <span className="mr-2">View Profile</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 ease-in-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="mt-24 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "8", label: "Years Experience" },
              { number: "15", label: "Awards Won" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center transition-transform duration-500 hover:scale-105">
                <div className="text-3xl font-light text-black mb-2">{stat.number}</div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-24 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div>
              <h2 className="text-3xl font-light text-black mb-2 transition-colors duration-300">
                Want to join our team?
              </h2>
              <p className="text-gray-600 text-lg transition-colors duration-300">
                We&apos;re always looking for talented individuals to join our creative family.
              </p>
            </div>
            <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors duration-300">
              View Careers
            </button>
          </div>
        </section>
      </div>
    </div>
    </AppShell>
  );
}
