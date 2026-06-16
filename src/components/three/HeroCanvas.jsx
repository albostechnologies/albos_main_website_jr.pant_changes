"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Configuration ────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 220;
const CONNECTION_DISTANCE = 150;
const PARTICLE_SPEED = 0.2;
const ACCENT_RATIO = 0.25;
const MOUSE_RADIUS = 220;

// ─── Premium 3D Particle Mesh — Canvas 2D rendering ──────────────────────────
export function HeroCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(), // depth 0..1
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        vz: (Math.random() - 0.5) * 0.003,
        isAccent: Math.random() < ACCENT_RATIO,
        baseSize: Math.random() * 2.5 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;
      const centerX = w / 2;
      const centerY = h / 2;

      // ── Draw large ambient gradient orbs for depth atmosphere ──
      const orbX1 = w * 0.3 + Math.sin(time * 0.3) * 80;
      const orbY1 = h * 0.4 + Math.cos(time * 0.2) * 60;
      const gradient1 = ctx.createRadialGradient(
        orbX1,
        orbY1,
        0,
        orbX1,
        orbY1,
        350,
      );
      gradient1.addColorStop(0, "rgba(249, 115, 22, 0.08)");
      gradient1.addColorStop(0.4, "rgba(249, 115, 22, 0.03)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      const orbX2 = w * 0.7 + Math.cos(time * 0.25) * 60;
      const orbY2 = h * 0.6 + Math.sin(time * 0.35) * 50;
      const gradient2 = ctx.createRadialGradient(
        orbX2,
        orbY2,
        0,
        orbX2,
        orbY2,
        280,
      );
      gradient2.addColorStop(0, "rgba(251, 146, 60, 0.06)");
      gradient2.addColorStop(0.5, "rgba(249, 115, 22, 0.02)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      // ── Rotating wireframe icosahedron (prominent 3D element) ──
      const icoRadius = Math.min(w, h) * 0.28;
      const rotX = time * 0.12;
      const rotY = time * 0.18;

      // Icosahedron vertices (golden ratio)
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawVerts = [
        [-1, phi, 0],
        [1, phi, 0],
        [-1, -phi, 0],
        [1, -phi, 0],
        [0, -1, phi],
        [0, 1, phi],
        [0, -1, -phi],
        [0, 1, -phi],
        [phi, 0, -1],
        [phi, 0, 1],
        [-phi, 0, -1],
        [-phi, 0, 1],
      ];
      const icoEdges = [
        [0, 1],
        [0, 5],
        [0, 7],
        [0, 10],
        [0, 11],
        [1, 5],
        [1, 7],
        [1, 8],
        [1, 9],
        [2, 3],
        [2, 4],
        [2, 6],
        [2, 10],
        [2, 11],
        [3, 4],
        [3, 6],
        [3, 8],
        [3, 9],
        [4, 5],
        [4, 9],
        [4, 11],
        [5, 9],
        [5, 11],
        [6, 7],
        [6, 8],
        [6, 10],
        [7, 8],
        [7, 10],
        [8, 9],
        [10, 11],
      ];

      // Project 3D → 2D with rotation
      const projectVert = (v) => {
        const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        const nx = v[0] / len,
          ny = v[1] / len,
          nz = v[2] / len;

        // Rotate Y
        const cosY = Math.cos(rotY),
          sinY = Math.sin(rotY);
        const x1 = nx * cosY - nz * sinY;
        const z1 = nx * sinY + nz * cosY;

        // Rotate X
        const cosX = Math.cos(rotX),
          sinX = Math.sin(rotX);
        const y1 = ny * cosX - z1 * sinX;
        const z2 = ny * sinX + z1 * cosX;

        // Perspective projection
        const perspective = 3.5;
        const scale = perspective / (perspective + z2);

        return {
          x: centerX + x1 * icoRadius * scale,
          y: centerY + y1 * icoRadius * scale,
          z: z2,
        };
      };

      const projectedVerts = rawVerts.map(projectVert);

      // Draw wireframe edges with prominent opacity
      ctx.lineWidth = 1.2;
      for (const [a, b] of icoEdges) {
        const va = projectedVerts[a];
        const vb = projectedVerts[b];
        const avgZ = (va.z + vb.z) / 2;
        // Front edges: 0.35, back edges: 0.08
        const opacity = 0.08 + (avgZ + 1) * 0.14;

        ctx.beginPath();
        ctx.moveTo(va.x, va.y);
        ctx.lineTo(vb.x, vb.y);
        ctx.strokeStyle = `rgba(249, 115, 22, ${Math.min(opacity, 0.45)})`;
        ctx.stroke();
      }

      // Draw wireframe vertices as bright dots
      for (const v of projectedVerts) {
        const dotSize = 2 + (v.z + 1) * 1.8;
        // Front vertices: 0.8, back vertices: 0.25
        const opacity = 0.25 + (v.z + 1) * 0.28;

        // Glow behind vertex
        ctx.beginPath();
        ctx.arc(v.x, v.y, dotSize * 3, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(
          v.x,
          v.y,
          0,
          v.x,
          v.y,
          dotSize * 3,
        );
        glowGrad.addColorStop(
          0,
          `rgba(249, 115, 22, ${Math.min(opacity * 0.4, 0.3)})`,
        );
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Vertex dot
        ctx.beginPath();
        ctx.arc(v.x, v.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${Math.min(opacity, 0.9)})`;
        ctx.fill();
      }

      // ── Update & draw particles ──
      const sortedIndices = particles
        .map((_, i) => i)
        .sort((a, b) => particles[a].z - particles[b].z);

      for (const i of sortedIndices) {
        const p = particles[i];

        // Mouse interaction — gentle push away
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity
        p.vx *= 0.988;
        p.vy *= 0.988;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) {
          p.vx = (p.vx / speed) * 2.5;
          p.vy = (p.vy / speed) * 2.5;
        }

        // Minimum speed to keep particles moving
        if (speed < PARTICLE_SPEED * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Z oscillation for depth
        p.z += p.vz;
        if (p.z < 0) {
          p.z = 0;
          p.vz = Math.abs(p.vz);
        }
        if (p.z > 1) {
          p.z = 1;
          p.vz = -Math.abs(p.vz);
        }

        // Wrap around edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Depth-based rendering
        const depthScale = 0.5 + p.z * 0.5;
        const depthOpacity = 0.3 + p.z * 0.5;
        const pulse = Math.sin(time * 1.8 + p.pulseOffset) * 0.2;
        const size = p.baseSize * depthScale * (1 + pulse);

        // Draw particle with glow
        if (p.isAccent) {
          // Accent particle — larger glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
          const accentGlow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            size * 4,
          );
          accentGlow.addColorStop(
            0,
            `rgba(249, 115, 22, ${depthOpacity * 0.25})`,
          );
          accentGlow.addColorStop(1, "transparent");
          ctx.fillStyle = accentGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249, 115, 22, ${depthOpacity})`;
          ctx.fill();
        } else {
          // Neutral particle — subtle glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
          const whiteGlow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            size * 2.5,
          );
          whiteGlow.addColorStop(
            0,
            `rgba(120, 113, 108, ${depthOpacity * 0.12})`,
          );
          whiteGlow.addColorStop(1, "transparent");
          ctx.fillStyle = whiteGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${depthOpacity * 0.5})`;
          ctx.fill();
        }
      }

      // ── Draw connection lines with stronger opacity ──
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const depthDiff = Math.abs(particles[i].z - particles[j].z);
            if (depthDiff > 0.4) continue;

            const avgZ = (particles[i].z + particles[j].z) / 2;
            const baseOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.35;
            const opacity = baseOpacity * (0.4 + avgZ * 0.6);
            const hasAccent = particles[i].isAccent || particles[j].isAccent;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            if (hasAccent) {
              ctx.strokeStyle = `rgba(249, 115, 22, ${Math.min(opacity * 2, 0.5)})`;
            } else {
              ctx.strokeStyle = `rgba(120, 113, 108, ${Math.min(opacity, 0.2)})`;
            }
            ctx.stroke();
          }
        }
      }

      // ── Draw orbiting accent glow orbs ──
      for (let i = 0; i < 6; i++) {
        const angle = time * 0.15 + (i / 6) * Math.PI * 2;
        const radius = Math.min(w, h) * (0.2 + i * 0.04);
        const gx = centerX + Math.cos(angle) * radius;
        const gy = centerY + Math.sin(angle) * radius * 0.6;
        const glowSize = 80 + i * 10;
        const glowGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, glowSize);
        const glowOpacity = 0.08 + Math.sin(time + i) * 0.04;
        glowGrad.addColorStop(0, `rgba(249, 115, 22, ${glowOpacity})`);
        glowGrad.addColorStop(0.6, `rgba(249, 115, 22, ${glowOpacity * 0.3})`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(gx, gy, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
