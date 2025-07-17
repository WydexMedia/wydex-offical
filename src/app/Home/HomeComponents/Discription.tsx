'use clind'
import React, { useState, useEffect } from 'react';

function Discription() { 
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const text =
    `" We are a passionate team in Calicut helping businesses grow through creative, result-driven digital marketing. "`;
  const words = text.split(' ');

  // Define animation range
  const startScroll = 400;
  const endScroll = 800;

  // Calculate progress
  let progress = 0;
  if (scrollY >= startScroll && scrollY <= endScroll) {
    progress = (scrollY - startScroll) / (endScroll - startScroll);
  } else if (scrollY > endScroll) {
    progress = 1;
  }

  // How many words to show
  const wordsToShow = Math.floor(progress * words.length);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative my-[-2px]">
      <div className="w-full text-center">
        <div>
          <p
            className="font-extralight text-[3rem] leading-[1.4] tracking-[-0.01em] p-5 text-center break-words flex flex-wrap justify-center"
          >
            {words.map((word, index) => {
              const isVisible = index < wordsToShow;
              const isCurrentWord = index === wordsToShow - 1;

              return (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                    }`}
                  style={{
                    color: isVisible
                      ? 'rgba(255,255,255,1)'
                      : 'rgba(255,255,255,0.2)',
                    textShadow: isCurrentWord
                      ? `0 0 10px rgba(0, 119, 255, 1), 
                       0 0 20px rgba(0, 119, 255, 0.8), 
                       0 0 40px rgba(0, 119, 255, 0.6), 
                       0 0 60px rgba(0, 119, 255, 0.4)`
                      : 'none',
                    filter: isCurrentWord ? 'brightness(1.3)' : 'none',
                    marginRight: '0.3em',
                  }}
                >
                  {word}
                </span>
              );
            })}


          </p>
        </div>
      </div>



      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
}

export default Discription;