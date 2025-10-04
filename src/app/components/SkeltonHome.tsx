import React from 'react';

const SkeletonHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
              <nav className="hidden md:flex space-x-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </nav>
            </div>
            <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-16 w-96 bg-gray-700 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-6 w-80 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
            <div className="h-12 w-40 bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
          
          {/* Video/Animation Skeleton */}
          <div className="h-96 bg-gray-800 rounded-xl animate-pulse mb-16"></div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-gray-700 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-6 w-96 bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6">
                <div className="h-12 w-12 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-3"></div>
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Stories Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-80 bg-gray-700 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-6 w-96 bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse mr-4"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-20 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse mb-4 md:mb-0"></div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkeletonHome;