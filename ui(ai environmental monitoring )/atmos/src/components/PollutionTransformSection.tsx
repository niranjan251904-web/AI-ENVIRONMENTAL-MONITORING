import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PollutionTransformSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const frameCount = 180;
  const currentFrame = (index: number) => `/sequence-3/${(index + 1).toString().padStart(4, '0')}.jpg`;
  
  const images = useRef<HTMLImageElement[]>([]);
  const seqObj = useRef({ frame: 0 });

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load fallback image (city)
    const fallbackImage = new Image();
    fallbackImage.src = 'https://images.unsplash.com/photo-1473876637954-4b493d59fd97?q=80&w=2008&auto=format&fit=crop';
    
    const loadImages = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.current.push(img);
      }
    };
    loadImages();

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
      ctx.drawImage(img, renderX, renderY, renderW, renderH);
    };

    const render = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      const img = images.current[seqObj.current.frame];
      if (img && img.complete && img.naturalHeight !== 0) {
        drawCover(context, img, canvas.width, canvas.height);
      } else if (fallbackImage.complete) {
        drawCover(context, fallbackImage, canvas.width, canvas.height);
        
        // Pseudo animation: Smog -> Clear
        const progress = seqObj.current.frame / frameCount;
        
        // Starting smog: brown/grey overlay. Ends: transparent
        const smogAlpha = Math.max(0, 0.7 - (progress * 1.5));
        context.fillStyle = `rgba(139, 115, 85, ${smogAlpha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Ending sky filter (pastel blue tint)
        const skyAlpha = Math.min(0.2, progress * 0.3);
        context.fillStyle = `rgba(91, 184, 245, ${skyAlpha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    fallbackImage.onload = render;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", 
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

    // Fade in overlay card at 50%
    tl.fromTo(overlayRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: (frameCount-1)*0.2 },
      (frameCount-1)*0.5
    );

    render();

    const handleResize = () => render();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0D1B2A]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" style={{ filter: 'contrast(1.1) brightness(1.05)', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }} />
      
      {/* Centered glass panel overlay */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-end pb-32 z-10 pointer-events-none">
        <div ref={overlayRef} className="glass p-8 max-w-2xl text-center opacity-0 pointer-events-auto transform-gpu border-atmos-blue shadow-[0_20px_50px_rgba(26,126,200,0.2)]">
          <h2 className="text-2xl md:text-4xl font-display font-black text-atmos-navy">
            ATMOS AI reduced visible AQI events by 34% in pilot cities
          </h2>
          <p className="mt-4 font-mono text-atmos-blue uppercase tracking-widest text-sm font-bold">
            Verified by GreenSoftTech Analytics
          </p>
        </div>
      </div>
    </section>
  );
};

export default PollutionTransformSection;
