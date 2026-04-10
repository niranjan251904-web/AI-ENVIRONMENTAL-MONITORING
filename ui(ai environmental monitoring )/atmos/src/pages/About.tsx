import React from 'react';
import { Activity, Satellite, BrainCircuit, Globe2 } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-white relative overflow-hidden">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-atmos-navy mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-atmos-deep to-atmos-blue">Origin.</span>
            </h1>
            <p className="font-sans text-atmos-muted text-lg leading-relaxed mb-6">
              ATMOS was born at the intersection of desperation and innovation. During the GreenSoftTech Hackathon 2025, our team realized that current environmental monitoring tools were fragmented, delayed, and unintelligible to decision-makers.
            </p>
            <p className="font-sans text-atmos-muted text-lg leading-relaxed">
              We set out to build an AI for a breathing planet—a unified intelligence layer that doesn't just display data, but predicts crises and prescribes localized mitigation pathways before irreversible damage occurs.
            </p>
          </div>
          <div className="glass p-2 relative group overflow-hidden rounded-3xl">
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop" className="w-full h-[400px] object-cover rounded-2xl" alt="Team collaborating" />
            <div className="absolute inset-0 bg-atmos-blue/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 bg-atmos-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-atmos-navy">Our Intelligence Loop</h2>
            <p className="text-atmos-muted font-sans mt-4 max-w-2xl mx-auto">
              How ATMOS converts raw planetary telemetry into actionable, life-saving directives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Sense', desc: 'Ingesting 400TB+ daily from satellites & IoT edge nodes.', icon: Satellite },
              { num: '02', title: 'Analyze', desc: 'Computer vision & NLP models interpret unstructured streams.', icon: Activity },
              { num: '03', title: 'Predict', desc: 'Simulating climatic futures to forecast anomaly events.', icon: BrainCircuit },
              { num: '04', title: 'Act', desc: 'Dispatching localized mitigation paths to partners.', icon: Globe2 }
            ].map((step, i) => (
               <div key={i} className="glass p-8 relative flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute -top-6 -right-6 text-8xl font-black font-display text-white/40 pointer-events-none select-none z-0">{step.num}</div>
                  <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 z-10 text-atmos-blue shadow-lg">
                    <step.icon size={28} />
                  </div>
                  <h3 className="font-display font-bold text-atmos-navy text-xl mb-3 relative z-10">{step.title}</h3>
                  <p className="font-sans text-atmos-muted text-sm relative z-10">{step.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Partner Badge Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
            
            <h2 className="text-4xl font-display font-bold text-atmos-navy mb-16">The Core Architects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
              {[
                  { name: 'Alex Mercer', role: 'AI Model Lead', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' },
                  { name: 'Dr. Sarah Lin', role: 'Climate Scientist', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
                  { name: 'James Doe', role: 'Frontend Engineer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' }
              ].map((member, i) => (
                  <div key={i} className="glass p-6 group">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl relative group-hover:scale-105 transition-transform">
                          <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <h3 className="font-display font-bold text-atmos-deep text-xl">{member.name}</h3>
                      <p className="font-sans text-atmos-muted text-sm mt-1">{member.role}</p>
                  </div>
              ))}
            </div>

            <div className="inline-flex glass px-8 py-6 items-center gap-6 rounded-2xl mx-auto border-atmos-blue shadow-[0_10px_40px_rgba(91,184,245,0.15)]">
               <div>
                 <p className="text-sm font-bold text-atmos-muted uppercase tracking-widest mb-1">Proudly Built For</p>
                 <h4 className="font-display font-black text-2xl text-atmos-navy">GreenSoftTech Hackathon</h4>
               </div>
               <div className="h-12 w-px bg-atmos-fog"></div>
               <div className="text-atmos-blue text-4xl font-black">2025</div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default About;
