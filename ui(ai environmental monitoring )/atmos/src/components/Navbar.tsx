import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white/20 backdrop-blur-xl border-b border-white/40 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-display font-bold text-2xl tracking-[0.3em] text-atmos-navy relative">
            ATM<span className="relative">O<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-atmos-blue rounded-full"></span></span>S
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-atmos-navy/80">
          <Link to="/" className="hover:text-atmos-blue transition-colors">Home</Link>
          <a href="#monitor" className="hover:text-atmos-blue transition-colors">Monitor</a>
          <a href="#solutions" className="hover:text-atmos-blue transition-colors">Solutions</a>
          <a href="#impact" className="hover:text-atmos-blue transition-colors">Impact</a>
          <Link to="/about" className="hover:text-atmos-blue transition-colors">About</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-atmos-deep to-atmos-blue text-white font-medium hover:shadow-lg hover:shadow-atmos-blue/30 transition-all"
          >
            Join the Mission
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-atmos-navy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-screen bg-white/90 backdrop-blur-2xl border-t border-white/40 flex flex-col items-center pt-10 space-y-8 font-sans text-xl font-medium text-atmos-navy/80">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#monitor" onClick={() => setMobileMenuOpen(false)}>Monitor</a>
          <a href="#solutions" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#impact" onClick={() => setMobileMenuOpen(false)}>Impact</a>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-atmos-deep to-atmos-blue text-white mt-4"
          >
            Join the Mission
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
