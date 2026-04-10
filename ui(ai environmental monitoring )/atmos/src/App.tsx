import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Placeholder Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  
  // Integrate Lenis with GSAP ScrollTrigger
  useEffect(() => {
    // Lenis is currently managed inside ReactLenis component, but if custom hook logic is needed we can sync it here.
    // Setting up the GSAP ticker sync is standard
    const updateGsap = (time: number) => {
      gsap.ticker.tick(time);
    };
    gsap.ticker.lagSmoothing(0);
    
    // We bind requestAnimationFrame if doing custom lenis, but with ReactLenis we can just use the prop root.
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <Router>
        <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Other routes can map to parts of the home page or separate pages as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
