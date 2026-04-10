import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroCanvas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax layers
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);

  // Frame sequence logic
  const frameCount = 150;
  const currentFrame = (index: number) => `/sequence-1/${(index + 1).toString().padStart(4, '0')}.jpg`;
  
  // We use a ref to store images so they don't trigger re-renders
  const images = useRef<HTMLImageElement[]>([]);
  const seqObj = useRef({ frame: 0 });

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load first image or fallback
    const fallbackImage = new Image();
    fallbackImage.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
    
    // Attempt to load the sequence. If they don't exist, we just rely on the fallback.
    const loadImages = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.current.push(img);
      }
    };
    loadImages();

    const render = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      const img = images.current[seqObj.current.frame];
      if (img && img.complete && img.naturalHeight !== 0) {
        // Draw sequence image
        drawCover(context, img, canvas.width, canvas.height);
      } else if (fallbackImage.complete) {
        // Draw fallback image
        drawCover(context, fallbackImage, canvas.width, canvas.height);
        
        // Darken the fallback slightly based on scroll to simulate the sequence
        const progress = seqObj.current.frame / frameCount;
        context.fillStyle = `rgba(13, 27, 42, ${progress * 0.5})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    fallbackImage.onload = render;

    // ScrollTrigger for scrubbing the sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // 400vh tall pinning
        scrub: 0.5,
        pin: true,
      }
    });

    tl.to(seqObj.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    // Parallax logic for text and background layers
    gsap.to(bgLayerRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
      }
    });

    gsap.to(midLayerRef.current, {
      yPercent: 60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
      }
    });

    // Image Travel Effect for Text (Slides in on section entry)
    gsap.fromTo(textRef.current, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        }
      }
    );

    // Initial render
    render();

    const handleResize = () => {
      render();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Ambient Particles effect
  useEffect(() => {
    if (!particlesRef.current) return;
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {x: number, y: number, r: number, vx: number, vy: number, alpha: number}[] = [];
    const numParticles = 80;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 1.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: Math.random() * -0.5 - 0.1,
            alpha: Math.random() * 0.3 + 0.3
        });
    }

    let animationFrameId: number;

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if(p.y < -10) p.y = canvas.height + 10;
        if(p.x < -10) p.x = canvas.width + 10;
        if(p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 184, 245, ${p.alpha})`; // pastel blue
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Utility to make canvas behave like object-fit: cover
  const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const ctxRatio = w / h;
    let renderW, renderH, renderX, renderY;

    if (imgRatio > ctxRatio) {
      renderH = h;
      renderW = img.naturalWidth * (h / img.naturalHeight);
      renderX = (w - renderW) / 2;
      renderY = 0;
    } else {
      renderW = w;
      renderH = img.naturalHeight * (w / img.naturalWidth);
      renderX = 0;
      renderY = (h - renderH) / 2;
    }
    
    ctx.clearRect(0, 0, w, h);
    // Apply filters as requested
    ctx.filter = 'saturate(1.1) brightness(1.05)';
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.filter = 'none';
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0D1B2A]">
      <div className="absolute inset-0 w-full h-screen z-0 pointer-events-none">
        {/* Parallax Background Layer 0.3x */}
        <div ref={bgLayerRef} className="absolute inset-0 opacity-40 mix-blend-screen scale-110" style={{ transformOrigin: 'top center' }}>
          <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" className="w-full h-[150%] object-cover object-top opacity-50" alt="Space" />
        </div>
        
        {/* The Frame Sequence Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-10" />
        
        {/* Parallax Mid Layer (Clouds/Atmosphere) 0.6x */}
        <div ref={midLayerRef} className="absolute inset-0 z-20 mix-blend-screen scale-110" style={{ transformOrigin: 'top center' }}>
           <img src="https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=1920&q=80" className="w-full h-[150%] object-cover object-center opacity-30" alt="Clouds" />
        </div>

        {/* Ambient Particles Canvas */}
        <canvas ref={particlesRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none mix-blend-screen" />
      </div>

      <div className="relative z-40 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
        
        <div ref={textRef} className="glass pointer-events-auto p-10 flex flex-col items-center justify-center text-center transform transition-all hover:scale-[1.02] duration-500 overflow-hidden relative group">
          {/* Liquid Glass SVG Filter implementation on hover via CSS classes or inline svg logic */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-white/20 to-atmos-blue/20"></div>

          <h1 className="font-display font-black text-6xl md:text-[180px] leading-none tracking-[0.4em] text-atmos-navy relative z-10 drop-shadow-2xl">
            ATMOS
          </h1>
          <h2 className="font-display font-bold text-2xl md:text-[48px] text-atmos-navy mt-4 relative z-10">
            AI FOR A BREATHING PLANET.
          </h2>
          <p className="font-mono text-atmos-blue font-bold tracking-widest uppercase mt-6 relative z-10 text-sm md:text-base">
            Monitor. Predict. Protect.
          </p>

          <div ref={ctaRef} className="mt-12 relative z-10">
            <button className="relative px-8 py-4 bg-white/20 backdrop-blur-md border border-white/50 rounded-full font-sans font-bold text-atmos-navy uppercase tracking-wider overflow-hidden group hover:shadow-[0_0_40px_rgba(91,184,245,0.4)] transition-all duration-500">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">See The Technology</span>
              <div className="absolute inset-0 bg-gradient-to-r from-atmos-deep to-atmos-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCanvas;
