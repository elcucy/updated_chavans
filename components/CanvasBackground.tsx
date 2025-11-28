
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface CanvasBackgroundProps {
  particleColor?: string;
  lineColor?: string;
  particleCount?: number;
  className?: string;
}

const CanvasBackground: React.FC<CanvasBackgroundProps> = ({
  particleColor = 'rgba(255, 255, 255, 0.7)',
  lineColor = 'rgba(255, 255, 255, 0.1)',
  particleCount = 70,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    containerRef.current = canvas.parentElement;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
      height = containerRef.current ? containerRef.current.offsetHeight : window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((width * height / 1920 / 1080) * particleCount);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.2 + 0.5,
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      ctx.fillStyle = particleColor;
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
    };

    const animate = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    // --- Initialization ---
    resizeCanvas();
    
    if (prefersReducedMotion.current) {
        draw(); // Draw one static frame
    } else {
        animate();
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if(containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }


    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, lineColor, particleCount]);

  return <canvas ref={canvasRef} className={`canvas-background ${className}`} />;
};

export default CanvasBackground;
