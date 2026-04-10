import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FrameSequenceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);

  const frameCount = 120;
  const currentFrame = (index: number) => `/sequence-2/${(index + 1).toString().padStart(4, '0')}.jpg`;
  
  const images = useRef<HTMLImageElement[]>([]);
  const seqObj = useRef({ frame: 0 });

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load fallback image (dark forest night)
    const fallbackImage = new Image();
    fallbackImage.src = 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2064&auto=format&fit=crop';
    
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
        
        // Pseudo animation overlay since we don't have frames
        const progress = seqObj.current.frame / frameCount;
        context.fillStyle = `rgba(91, 184, 245, ${progress * 0.3})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw some fake "sensors Awakening" over time
        const numActiveSensors = Math.floor(progress * 50);
        context.fillStyle = 'rgba(168, 223, 255, 0.8)';
        for(let i=0; i < numActiveSensors; i++) {
          const x = (Math.sin(i*24) * 0.5 + 0.5) * canvas.width;
          const y = (Math.cos(i*72) * 0.5 + 0.5) * canvas.height;
          context.beginPath();
          context.arc(x, y, 4, 0, Math.PI * 2);
          context.fill();
        }
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

    // Fade in text panel mid-sequence
    tl.fromTo(textPanelRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: (frameCount-1)*0.2 },
      (frameCount-1)*0.4 // insert at 40%
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      
      {/* Floating glass panel */}
      <div className="absolute inset-0 w-full h-full flex items-center z-10 pointer-events-none max-w-7xl mx-auto px-6">
        <div ref={textPanelRef} className="glass p-10 max-w-lg opacity-0 pointer-events-auto transform-gpu">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            AI-Powered<br/>Environmental Sensors
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-white/20 pb-4">
              <div className="w-3 h-3 rounded-full bg-atmos-glow animate-pulse shadow-[0_0_10px_#A8DFFF]" />
              <div className="font-mono text-atmos-sky text-lg">70,000+ edge nodes deployed globally</div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-3 h-3 rounded-full bg-atmos-blue animate-pulse" />
              <div className="font-mono text-atmos-sky text-lg">Data processed in &lt;50ms</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameSequenceSection;
