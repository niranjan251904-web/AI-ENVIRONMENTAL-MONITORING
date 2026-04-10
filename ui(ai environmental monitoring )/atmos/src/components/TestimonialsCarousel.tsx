import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Quote } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-atmos-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-atmos-navy">Mission Partners</h2>
          <p className="text-atmos-muted font-sans mt-4 max-w-2xl mx-auto">
            Working alongside global leaders to deploy actionable planetary intelligence.
          </p>
        </div>

        <div 
          className="max-w-4xl mx-auto relative h-[300px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonialsData.map((testimonial: any, index: number) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
            const isNext = index === (currentIndex + 1) % testimonialsData.length;
            
            let transformClass = '';
            let opacityClass = 'opacity-0 pointer-events-none';
            let zIndexClass = 'z-0';
            
            if (isActive) {
              transformClass = 'translate-x-0 scale-100';
              opacityClass = 'opacity-100';
              zIndexClass = 'z-20';
            } else if (isPrev) {
              transformClass = '-translate-x-[120%] scale-90';
              opacityClass = 'opacity-0 md:opacity-40';
              zIndexClass = 'z-10';
            } else if (isNext) {
              transformClass = 'translate-x-[120%] scale-90';
              opacityClass = 'opacity-0 md:opacity-40';
              zIndexClass = 'z-10';
            }

            return (
              <div 
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${transformClass} ${opacityClass} ${zIndexClass}`}
              >
                <div className="glass p-10 md:p-14 w-full text-center group hover:bg-white/40 transition-colors duration-300 shadow-[0_10px_40px_rgba(13,27,42,0.05)] border-white border">
                  <Quote className="mx-auto text-atmos-blue mb-6 opacity-50" size={40} />
                  <p className="text-xl md:text-2xl font-sans font-medium text-atmos-navy leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-atmos-deep text-lg">{testimonial.author}</h4>
                    <p className="font-sans text-atmos-muted text-sm">{testimonial.role}, {testimonial.organization}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonialsData.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-atmos-blue scale-125' : 'bg-atmos-fog hover:bg-atmos-blue/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Logos Row */}
        <div className="mt-20 pt-16 border-t border-atmos-fog max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
           <div className="text-xl font-display font-bold text-atmos-navy grayscale hover:grayscale-0 hover:text-atmos-blue transition-all cursor-pointer">GreenSoftTech</div>
           <div className="text-xl font-display font-bold text-atmos-navy grayscale hover:grayscale-0 hover:text-atmos-blue transition-all cursor-pointer">UN Environment</div>
           <div className="text-xl font-display font-bold text-atmos-navy grayscale hover:grayscale-0 hover:text-atmos-blue transition-all cursor-pointer">Global Sust. Inst.</div>
           <div className="text-xl font-display font-bold text-atmos-navy grayscale hover:grayscale-0 hover:text-atmos-blue transition-all cursor-pointer">WHO Data Hub</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
