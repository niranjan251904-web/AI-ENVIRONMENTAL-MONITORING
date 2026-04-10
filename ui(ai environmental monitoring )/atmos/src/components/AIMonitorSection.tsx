import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AIMonitorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !statsRef.current || !bgRef.current) return;

    // Background parallax
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Image travel effect (slides in from right)
    gsap.fromTo(imageRef.current, 
      { x: '100%', opacity: 0 },
      { 
        x: '0%', 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Stats counter animation
    const statsElements = statsRef.current.querySelectorAll('.stat-val');
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      onEnter: () => {
        statsElements.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isPercent = el.innerHTML.includes('%');
          const isMillion = el.innerHTML.includes('M');
          
          gsap.fromTo(el, 
            { innerHTML: 0 },
            { 
              innerHTML: target, 
              duration: 2, 
              ease: "power2.out",
              snap: { innerHTML: isPercent || target % 1 !== 0 ? 0.1 : 1 },
              onUpdate: function() {
                el.innerHTML = this.targets()[0].innerHTML + (isPercent ? '%' : isMillion ? 'M+' : '+');
              }
            }
          );
        });
      }
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden bg-atmos-surface">
      {/* Parallax Earth From Above Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" ref={bgRef} style={{ originY: 0 }}>
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="w-full h-[140%] object-cover" alt="Earth from above" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Stats Panel (Glassmorphism) */}
        <div ref={statsRef} className="lg:w-1/2 w-full glass p-10 relative group overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-white/20 to-atmos-blue/20" />
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-atmos-navy mb-8 relative z-10">AI-Powered Sensing at Scale</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <div className="text-5xl font-mono font-bold text-atmos-blue stat-val" data-target="2.3">2.3M+</div>
              <div className="text-atmos-navy font-bold uppercase tracking-wider mt-2 text-sm">Sensor Nodes Tracked</div>
            </div>
            <div>
              <div className="text-5xl font-mono font-bold text-atmos-blue stat-val" data-target="147">147</div>
              <div className="text-atmos-navy font-bold uppercase tracking-wider mt-2 text-sm">Countries Monitored</div>
            </div>
            <div>
              <div className="text-5xl font-mono font-bold text-atmos-blue">R-Time</div>
              <div className="text-atmos-navy font-bold uppercase tracking-wider mt-2 text-sm">AQI Predictions</div>
            </div>
            <div>
              <div className="text-5xl font-mono font-bold text-atmos-blue stat-val" data-target="98.4">98.4%</div>
              <div className="text-atmos-navy font-bold uppercase tracking-wider mt-2 text-sm">Forecast Accuracy</div>
            </div>
          </div>
        </div>

        {/* Right: Satellite Imagery */}
        <div className="lg:w-1/2 w-full h-[500px] overflow-hidden rounded-3xl relative shadow-[0_20px_50px_rgba(13,27,42,0.1)] border border-white/40" ref={imageRef}>
          <img src="https://images.unsplash.com/photo-1541888045952-4752765809f6?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Satellite Scan" />
          <div className="absolute inset-0 bg-gradient-to-t from-atmos-navy/80 to-transparent flex items-end p-8">
             <div className="glass px-4 py-2 border-atmos-blue/50">
               <p className="font-mono text-white text-sm flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> LIVE STREAM — ORBITAL VIEW 14
               </p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIMonitorSection;
