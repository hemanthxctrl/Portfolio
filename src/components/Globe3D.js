'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NetworkGlobe() {
  const groupRef = useRef();

  // Rotate the globe constantly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  // Generate random coordinates representing cloud servers
  const points = useMemo(() => {
    const list = [];
    const numPoints = 15;
    const r = 1.5;
    
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      list.push(new THREE.Vector3(x, y, z));
    }
    return list;
  }, []);

  // Generate connection curves between some coordinates
  const connections = useMemo(() => {
    const lines = [];
    // Connect points to adjacent ones
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      
      // Create a curve that arches outward to simulate orbital routes
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(1.8); // Arch outward
      
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(20);
      lines.push(curvePoints);
    }
    return lines;
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
      {connections.map((pts, idx) => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={idx} geometry={lineGeometry}>
            <lineBasicMaterial
              color="#0062ff"
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

export default function Globe3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }} className="interactive">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }}>
        <ambientLight intensity={1.0} />
        <NetworkGlobe />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
