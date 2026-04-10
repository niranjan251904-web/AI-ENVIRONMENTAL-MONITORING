import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-atmos-sky pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="font-display font-bold text-3xl tracking-[0.3em] text-atmos-navy block mb-4">
            ATMOS
          </Link>
          <p className="text-atmos-muted font-sans max-w-sm mb-6">
            AI FOR A BREATHING PLANET. <br/>
            Monitor. Predict. Protect.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-atmos-navy hover:text-atmos-blue transition-colors">
              <MessageSquare size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-atmos-navy hover:text-atmos-blue transition-colors">
              <Users size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-atmos-navy hover:text-atmos-blue transition-colors">
              <Code size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-atmos-navy mb-4">Solutions</h4>
          <ul className="space-y-3 text-atmos-muted font-sans text-sm">
            <li><a href="#" className="hover:text-atmos-blue">Air Quality</a></li>
            <li><a href="#" className="hover:text-atmos-blue">Ocean Health</a></li>
            <li><a href="#" className="hover:text-atmos-blue">Deforestation</a></li>
            <li><a href="#" className="hover:text-atmos-blue">Carbon Footprint</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-atmos-navy mb-4">Company</h4>
          <ul className="space-y-3 text-atmos-muted font-sans text-sm">
            <li><Link to="/about" className="hover:text-atmos-blue">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-atmos-blue">Contact</Link></li>
            <li><a href="#" className="hover:text-atmos-blue">Careers</a></li>
            <li><a href="#" className="hover:text-atmos-blue">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-atmos-navy mb-4">Partners</h4>
          <ul className="space-y-3 text-atmos-muted font-sans text-sm">
            <li><a href="#" className="hover:text-atmos-blue">UN Environment</a></li>
            <li><a href="#" className="hover:text-atmos-blue">GreenSoftTech</a></li>
            <li><a href="#" className="hover:text-atmos-blue">Data API</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-atmos-fog flex flex-col md:flex-row items-center justify-between relative z-10 text-sm text-atmos-muted font-sans">
        <p>&copy; 2025 ATMOS. All rights reserved.</p>
        <p>Built for GreenSoftTech Hackathon 2025</p>
      </div>

      {/* Massive subtle background text */}
      <div className="absolute bottom-[-40px] md:bottom-[-80px] left-1/2 -translate-x-1/2 text-[120px] md:text-[240px] font-display font-black text-atmos-sky/40 select-none pointer-events-none whitespace-nowrap">
        ATMOS
      </div>
    </footer>
  );
};

export default Footer;
