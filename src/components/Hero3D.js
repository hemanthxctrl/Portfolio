'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleSphere({ mousePosition }) {
  const ref = useRef();
  
  // Generate random points in a sphere manually to avoid extra dependencies
  const sphere = useMemo(() => {
    const numPoints = 2000;
    const radius = 1.2;
    const points = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random()); // uniform distribution
      
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate sphere continuously
      ref.current.rotation.x += delta * 0.04;
      ref.current.rotation.y += delta * 0.06;
      
      // Smoothly tilt toward mouse position
      ref.current.rotation.x += (mousePosition.y * 0.12 - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (mousePosition.x * 0.12 - ref.current.rotation.y) * 0.05;
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <ParticleSphere mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
