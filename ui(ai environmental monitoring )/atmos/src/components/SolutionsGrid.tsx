import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { solutionsData } from '../data/solutionsData';

const SolutionsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", ease: "circOut", duration: 0.8 }
    }
  };

  return (
    <section id="solutions" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-atmos-navy">Planetary Intelligence Grid</h2>
          <p className="text-atmos-muted font-sans mt-4 max-w-2xl mx-auto">
            Six interconnected AI models working in harmony to provide a comprehensive, real-time pulse of earth's vital signs.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutionsData.map((solution: any, index: number) => (
            <motion.div 
              key={solution.id} 
              variants={itemVariants}
              className={`glass p-8 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2
                ${solution.isFlagship ? 'md:col-span-2 shadow-[0_0_30px_rgba(91,184,245,0.2)] border-atmos-blue/40' : ''}
              `}
            >
              {/* Liquid glass shimmer hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay bg-gradient-to-br from-white/40 to-atmos-blue/10" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-full bg-atmos-sky overflow-hidden flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-atmos-blue transition-all duration-500 shadow-sm border border-atmos-fog">
                  <img src={solution.icon} alt={solution.title} className="w-full h-full object-cover mix-blend-multiply group-hover:invert transition-all duration-500" />
                </div>
                
                <h3 className={`font-display font-bold text-atmos-navy mb-3 ${solution.isFlagship ? 'text-2xl' : 'text-xl'}`}>
                  {solution.title}
                </h3>
                
                <p className="font-sans text-atmos-muted mb-auto">
                  {solution.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-atmos-fog flex items-end justify-between">
                  <div>
                    <div className="font-mono font-bold text-atmos-deep text-2xl">{solution.metric}</div>
                    <div className="font-sans text-xs font-bold text-atmos-muted uppercase tracking-wide mt-1">{solution.metricLabel}</div>
                  </div>
                  <button className="text-atmos-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold whitespace-nowrap text-sm">
                    Explore Data →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
