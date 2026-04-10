import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ImpactStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const statsElements = sectionRef.current.querySelectorAll('.impact-stat');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        statsElements.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          
          gsap.fromTo(el, 
            { innerHTML: 0 },
            { 
              innerHTML: target, 
              duration: 2.5, 
              ease: "power3.out",
              snap: { innerHTML: target % 1 !== 0 ? 0.1 : 1 },
              onUpdate: function() {
                el.innerHTML = prefix + String(this.targets()[0].innerHTML) + suffix;
              }
            }
          );
        });
      }
    });

  }, []);

  return (
    <section ref={sectionRef} id="impact" className="py-24 relative bg-atmos-navy overflow-hidden">
      {/* Background Cloud Parallax */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
        <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" className="w-full h-full object-cover" alt="Atmosphere" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Global Scale Intervention</h2>
          <p className="text-atmos-sky font-sans max-w-2xl mx-auto opacity-80">Measuring the tangible impact of our planetary intelligence network.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          <div>
            <div className="text-4xl md:text-6xl font-mono font-bold text-atmos-blue impact-stat" data-target="2.3" data-suffix="M+">2.3M+</div>
            <div className="text-atmos-sky font-bold uppercase tracking-wider mt-4 text-sm md:text-base">Sensors Active</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-mono font-bold text-atmos-blue impact-stat" data-target="147" data-suffix="">147</div>
            <div className="text-atmos-sky font-bold uppercase tracking-wider mt-4 text-sm md:text-base">Countries Covered</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-mono font-bold text-atmos-blue impact-stat" data-target="34" data-suffix="%">34%</div>
            <div className="text-atmos-sky font-bold uppercase tracking-wider mt-4 text-sm md:text-base">Pollution Reduction</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-mono font-bold text-atmos-blue impact-stat" data-target="1.2" data-suffix="B+">1.2B+</div>
            <div className="text-atmos-sky font-bold uppercase tracking-wider mt-4 text-sm md:text-base">People Protected</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
