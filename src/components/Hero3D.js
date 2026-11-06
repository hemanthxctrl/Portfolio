'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

// Pre-generate deterministic spherical point distribution
function createSpherePoints(numPoints = 1600, radius = 1.2) {
  const points = new Float32Array(numPoints * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;

    // Slight radial depth variation based on index
    const r = radius * (0.85 + 0.15 * Math.sin(i * 12.9898));

    points[i * 3] = r * rad * Math.cos(theta);
    points[i * 3 + 1] = r * y;
    points[i * 3 + 2] = r * rad * Math.sin(theta);
  }
  return points;
}

const STATIC_SPHERE_POINTS = createSpherePoints();

function ParticleSphere() {
  const ref = useRef();
  const sphere = useMemo(() => STATIC_SPHERE_POINTS, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate sphere continuously
      ref.current.rotation.x += delta * 0.04;
      ref.current.rotation.y += delta * 0.06;

      // Smoothly tilt toward mouse pointer without any React re-renders
      const targetX = state.pointer.y * 0.12;
      const targetY = state.pointer.x * 0.12;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0062ff"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
