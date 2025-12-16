import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/modules/shared/ui/button';
import { ArrowDown, Terminal, Link as LinkIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { AppContext } from '@/modules/shared/types';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { socialLinks } = useOutletContext<AppContext>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.5)';
        ctx.fill();
      });

      particles.forEach((p1, i: number) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 dark:opacity-20"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
            <Terminal className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software Engineer
        </motion.h1>

        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-mono text-sm">
            Full Stack
          </span>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-mono text-sm">
            DevOps
          </span>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-mono text-sm">
            Cloud
          </span>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building scalable systems and solving complex problems with clean, efficient code
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
          >
            View Projects
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base px-8 py-6"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </motion.div>

        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {socialLinks.filter(link => link.is_active).map((link) => {
            // @ts-ignore - Dynamic icon lookup
            const Icon = LucideIcons[link.icon] || LinkIcon;
            return (
              <a
                key={link.ID}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={link.platform}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
