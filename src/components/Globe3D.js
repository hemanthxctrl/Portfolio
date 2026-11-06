'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function generateDeterministicPoints(numPoints = 15, r = 1.5) {
  const list = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;

    const x = r * rad * Math.cos(theta);
    const z = r * rad * Math.sin(theta);
    list.push(new THREE.Vector3(x, y * r, z));
  }
  return list;
}

const STATIC_POINTS = generateDeterministicPoints();

function NetworkGlobe() {
  const groupRef = useRef();

  // Rotate the globe constantly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  const points = useMemo(() => STATIC_POINTS, []);

  // Pre-generate connection curves between coordinates
  const lineGeometries = useMemo(() => {
    const geometries = [];
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];

      // Create a curve that arches outward to simulate orbital routes
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(1.8);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(20);
      geometries.push(new THREE.BufferGeometry().setFromPoints(curvePoints));
    }
    return geometries;
  }, [points]);

  return (
    <group ref={groupRef}>
      {/* Central Translucent Globe */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#e2e8f0"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh>
        <sphereGeometry args={[1.51, 16, 16]} />
        <meshBasicMaterial
          color="#0062ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Glowing Cloud Nodes */}
      {points.map((p, idx) => (
        <mesh key={idx} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? "#00d2ff" : "#0062ff"}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      {lineGeometries.map((geometry, idx) => (
        <line key={idx} geometry={geometry}>
          <lineBasicMaterial
            color="#0062ff"
            transparent
            opacity={0.2}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}

export default function Globe3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }} className="interactive">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.0} />
        <NetworkGlobe />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
