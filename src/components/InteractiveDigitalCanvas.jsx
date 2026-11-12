import React, { useEffect, useRef } from 'react';
import styles from './InteractiveDigitalCanvas.module.css';

/**
 * AMPLIFY DIGITAL — INTERACTIVE DIGITAL GEOMETRIC CANVAS
 * 
 * Features:
 * 1. Living Constellation Mesh: Drifting cyber data nodes with dynamic laser links.
 * 2. Origami Crystal Shards: Translucent rotating geometric facets echoing the 3D origami bird.
 * 3. Interactive Cursor Physics: Mouse attractor, neural thread connections, and chromatic spotlight.
 * 4. Dual-Tone Brand Palette: Electric Cyan (#00E5FF) & Violet (#9D4EDD) on left, Solar Amber (#FF7A00) & Magenta (#E02696) on right.
 * 5. 60Hz/120Hz ProMotion Performance: GPU-accelerated requestAnimationFrame loop with visibility detection.
 */

export default function InteractiveDigitalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Mouse & Touch Tracking with Smooth Lerp ─────────────────────────────
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 170,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    // ── Scroll Momentum ────────────────────────────────────────────────────
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.12;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Particle Configuration ─────────────────────────────────────────────
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 32 : 68;
    const SHARD_COUNT = isMobile ? 6 : 14;

    const brandColors = [
      { r: 0, g: 229, b: 255 },    // Cyber Cyan (#00E5FF)
      { r: 157, g: 78, b: 221 },   // Electric Violet (#9D4EDD)
      { r: 109, g: 24, b: 255 },   // Deep Indigo (#6D18FF)
      { r: 255, g: 122, b: 0 },    // Solar Amber (#FF7A00)
      { r: 224, g: 38, b: 150 },   // Neon Magenta (#E02696)
      { r: 255, g: 255, b: 255 },   // Spark White (#FFFFFF)
    ];

    // Initialize particles with 3D depth layers
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const z = 0.3 + Math.random() * 0.7; // Depth factor
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * z,
        vy: (Math.random() - 0.5) * 0.45 * z,
        radius: (1.2 + Math.random() * 1.6) * z,
        z,
        color,
        baseAlpha: 0.35 + Math.random() * 0.45,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    });

    // ── Origami Crystal Shards (Echoing Hero 3D Origami Bird) ───────────────
    const shards = Array.from({ length: SHARD_COUNT }, () => {
      const z = 0.4 + Math.random() * 0.6;
      const size = (16 + Math.random() * 28) * z;
      const color = brandColors[Math.floor(Math.random() * (brandColors.length - 1))];
      // Generate 3 vertices relative to center for triangular origami facet
      const vertices = [
        { x: 0, y: -size },
        { x: size * (0.8 + Math.random() * 0.3), y: size * (0.6 + Math.random() * 0.3) },
        { x: -size * (0.7 + Math.random() * 0.3), y: size * (0.5 + Math.random() * 0.3) },
      ];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 * z,
        vy: (Math.random() - 0.5) * 0.3 * z - 0.1, // Gentle upward cosmic float
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        scaleY: 1,
        flipSpeed: 0.01 + Math.random() * 0.015,
        flipPhase: Math.random() * Math.PI * 2,
        vertices,
        color,
        z,
        baseAlpha: 0.22 + Math.random() * 0.25,
      };
    });

    // ── Animation Loop ─────────────────────────────────────────────────────
    let time = 0;
    let isRunning = true;

    const onVisibilityChange = () => {
      isRunning = !document.hidden;
      if (isRunning && !animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let lastTime = performance.now();

    function render(now) {
      if (!isRunning) return;
      animId = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      // Smooth cursor lerp
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // ── 1. Interactive Cursor Chromatic Spotlight ─────────────────────────
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const isLeft = mouse.x < width * 0.5;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        if (isLeft) {
          // Cyan-to-Violet glow on left
          grad.addColorStop(0, 'rgba(0, 229, 255, 0.16)');
          grad.addColorStop(0.45, 'rgba(157, 78, 221, 0.09)');
          grad.addColorStop(1, 'transparent');
        } else {
          // Amber-to-Magenta glow on right
          grad.addColorStop(0, 'rgba(255, 122, 0, 0.16)');
          grad.addColorStop(0.45, 'rgba(224, 38, 150, 0.09)');
          grad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Render Floating Origami Crystal Shards ─────────────────────────
      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];

        // Motion update
        s.x += s.vx;
        s.y += s.vy - scrollVelocity * s.z;
        s.angle += s.rotSpeed;
        s.flipPhase += s.flipSpeed;
        s.scaleY = Math.cos(s.flipPhase);

        // Screen wrap
        if (s.x < -60) s.x = width + 60;
        if (s.x > width + 60) s.x = -60;
        if (s.y < -60) s.y = height + 60;
        if (s.y > height + 60) s.y = -60;

        // Dynamic light reflection glint
        const glint = Math.abs(Math.sin(s.angle * 2));
        const alpha = s.baseAlpha * (0.6 + glint * 0.7);

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.scale(1, s.scaleY);

        // Glass shard translucent fill
        ctx.beginPath();
        ctx.moveTo(s.vertices[0].x, s.vertices[0].y);
        ctx.lineTo(s.vertices[1].x, s.vertices[1].y);
        ctx.lineTo(s.vertices[2].x, s.vertices[2].y);
        ctx.closePath();

        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.12})`;
        ctx.fill();

        // Luminous crystal facet edge
        ctx.strokeStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.65})`;
        ctx.lineWidth = 1.1 * s.z;
        ctx.stroke();

        ctx.restore();
      }

      // ── 3. Update & Draw Particles ────────────────────────────────────────
      const maxConnectDist = isMobile ? 85 : 110;
      const mouseDistThreshold = mouse.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural floating drift with cosine wobble
        p.x += p.vx + Math.cos(time + p.pulseOffset) * 0.15;
        p.y += p.vy - scrollVelocity * p.z;

        // Interactive mouse attractor / repulsion spring
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseDistThreshold && dist > 1) {
            // Gentle fluid attraction towards cursor
            const force = (1 - dist / mouseDistThreshold) * 1.8 * p.z;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;

            // Draw neural link from particle to cursor
            const mouseLinkAlpha = (1 - dist / mouseDistThreshold) * 0.55 * p.z;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${mouseLinkAlpha})`;
            ctx.lineWidth = 0.9 * p.z;
            ctx.stroke();
          }
        }

        // Screen wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Twinkle pulse
        const pulse = Math.sin(time * 3 + p.pulseOffset);
        const currentAlpha = Math.min(1, Math.max(0.2, p.baseAlpha + pulse * 0.25));

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
        ctx.shadowBlur = 6 * p.z;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // ── 4. Dynamic Constellation Mesh Lines ─────────────────────────────
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.28 * Math.min(p.z, p2.z);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            // Midpoint color blend
            const mr = Math.round((p.color.r + p2.color.r) * 0.5);
            const mg = Math.round((p.color.g + p2.color.g) * 0.5);
            const mb = Math.round((p.color.b + p2.color.b) * 0.5);

            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${lineAlpha})`;
            ctx.lineWidth = 0.85 * Math.min(p.z, p2.z);
            ctx.stroke();
          }
        }
      }
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
