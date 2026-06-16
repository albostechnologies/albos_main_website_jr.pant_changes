"use client";

/* eslint-disable react-hooks/refs -- Three.js buffer geometry requires reading mutable ref arrays
   during initial geometry construction in useMemo. This is the standard R3F pattern for
   dynamic buffer attributes that are mutated inside useFrame. */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 150;
const SPHERE_RADIUS = 3.0;
const CONNECTION_THRESHOLD = 1.15;
const ROTATION_SPEED = 0.02;
const ACCENT_RATIO = 0.15;
const MAX_LINE_SEGMENTS = 900;

// ─── Glow Texture (programmatic radial gradient) ─────────────────────────────
function createGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const c = size / 2;
  const gradient = ctx.createRadialGradient(c, c, 0, c, c, c);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.1, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.35)");
  gradient.addColorStop(0.6, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ─── Particle initialisation helpers ─────────────────────────────────────────
function initPositions() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * SPHERE_RADIUS;
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function initVelocities() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 0.05;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
  }
  return arr;
}

function initColorsAndAccents() {
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const accentIndices = new Uint8Array(PARTICLE_COUNT);
  const accent = new THREE.Color("#F97316");
  const white = new THREE.Color("#ffffff");
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const isAccent = Math.random() < ACCENT_RATIO;
    const c = isAccent ? accent : white;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    accentIndices[i] = isAccent ? 1 : 0;
  }
  return { colors, accentIndices };
}

// ─── Inner Scene ──────────────────────────────────────────────────────────────
function ParticleNetwork() {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);
  const linesRef = useRef(null);

  // Mutable typed-array buffers (must be mutated in-place for GPU upload)
  const positions = useRef(initPositions());
  const velocities = useRef(initVelocities());
  const linePositions = useRef(new Float32Array(MAX_LINE_SEGMENTS * 6));

  // Static data (never mutated after init)
  const { colors, accentIndices } = useMemo(() => initColorsAndAccents(), []);
  const glowTexture = useMemo(() => createGlowTexture(), []);

  // Build BufferGeometry objects once, referencing the mutable arrays
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.current, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [colors]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions.current, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  // ── Animation loop ──────────────────────────────────────────────────────
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const pos = positions.current;
    const vel = velocities.current;
    const lPos = linePositions.current;

    // ── Drift particles ──────────────────────────────────────────────────
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;

      const x = pos[i3],
        y = pos[i3 + 1],
        z = pos[i3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > SPHERE_RADIUS) {
        vel[i3] *= -1;
        vel[i3 + 1] *= -1;
        vel[i3 + 2] *= -1;
        const s = (SPHERE_RADIUS * 0.98) / dist;
        pos[i3] *= s;
        pos[i3 + 1] *= s;
        pos[i3 + 2] *= s;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // ── Compute connection lines ─────────────────────────────────────────
    let segCount = 0;
    const thSq = CONNECTION_THRESHOLD * CONNECTION_THRESHOLD;

    for (let i = 0; i < PARTICLE_COUNT && segCount < MAX_LINE_SEGMENTS; i++) {
      const i3 = i * 3;
      const ax = pos[i3],
        ay = pos[i3 + 1],
        az = pos[i3 + 2];

      for (
        let j = i + 1;
        j < PARTICLE_COUNT && segCount < MAX_LINE_SEGMENTS;
        j++
      ) {
        const j3 = j * 3;
        const dx = ax - pos[j3],
          dy = ay - pos[j3 + 1],
          dz = az - pos[j3 + 2];
        if (dx * dx + dy * dy + dz * dz < thSq) {
          const idx = segCount * 6;
          lPos[idx] = ax;
          lPos[idx + 1] = ay;
          lPos[idx + 2] = az;
          lPos[idx + 3] = pos[j3];
          lPos[idx + 4] = pos[j3 + 1];
          lPos[idx + 5] = pos[j3 + 2];
          segCount++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, segCount * 2);
    }

    // ── Slow scene rotation ──────────────────────────────────────────────
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED * dt;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particle dots */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          map={glowTexture}
          size={0.09}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      {/* Accent glow halo layer */}
      <AccentGlowLayer
        positionsRef={positions}
        accentIndices={accentIndices}
        glowTexture={glowTexture}
      />

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── Accent Glow Sub-component ────────────────────────────────────────────────
// A second, larger, softer Points layer for the accent (orange) particles that
// simulates a bloom / glow halo without a post-processing pass.
function AccentGlowLayer({ positionsRef, accentIndices, glowTexture }) {
  const ref = useRef(null);

  // Count accent particles once
  const accentCount = useMemo(
    () => accentIndices.reduce((s, v) => s + v, 0),
    [accentIndices],
  );

  // Mutable accent-only position buffer (kept in sync each frame)
  const accentPositions = useRef(null);

  // Lazy-init on first render
  if (accentPositions.current === null) {
    const pos = new Float32Array(accentCount * 3);
    const src = positionsRef.current;
    let idx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (accentIndices[i]) {
        pos[idx * 3] = src[i * 3];
        pos[idx * 3 + 1] = src[i * 3 + 1];
        pos[idx * 3 + 2] = src[i * 3 + 2];
        idx++;
      }
    }
    accentPositions.current = pos;
  }

  const accentColors = useMemo(() => {
    const col = new Float32Array(accentCount * 3);
    const c = new THREE.Color("#F97316");
    for (let i = 0; i < accentCount; i++) {
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [accentCount]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(accentPositions.current, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    geo.setAttribute("color", new THREE.BufferAttribute(accentColors, 3));
    return geo;
  }, [accentColors]);

  // Sync accent positions with main particle positions every frame
  useFrame(() => {
    const aPos = accentPositions.current;
    const src = positionsRef.current;
    let idx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (accentIndices[i]) {
        aPos[idx * 3] = src[i * 3];
        aPos[idx * 3 + 1] = src[i * 3 + 1];
        aPos[idx * 3 + 2] = src[i * 3 + 2];
        idx++;
      }
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={glowTexture}
        size={0.28}
        vertexColors
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

// ─── Exported Canvas Component ────────────────────────────────────────────────
export function ParticleMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ParticleNetwork />
    </Canvas>
  );
}
