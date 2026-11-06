'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS_DATA = [
  { name: 'Python', orbit: 1.2, speed: 0.5, color: '#3776AB', angleOffset: 0 },
  { name: 'AWS', orbit: 1.2, speed: 0.5, color: '#FF9900', angleOffset: (2 * Math.PI) / 3 },
  { name: 'JavaScript', orbit: 1.2, speed: 0.5, color: '#F7DF1E', angleOffset: (4 * Math.PI) / 3 },
  
  { name: 'React.js', orbit: 1.9, speed: 0.35, color: '#61DAFB', angleOffset: 0 },
  { name: 'Node.js', orbit: 1.9, speed: 0.35, color: '#339933', angleOffset: (2 * Math.PI) / 3 },
  { name: 'MongoDB', orbit: 1.9, speed: 0.35, color: '#47A248', angleOffset: (4 * Math.PI) / 3 },
  
  { name: 'Git', orbit: 2.6, speed: 0.2, color: '#F05032', angleOffset: 0 },
  { name: 'Nginx', orbit: 2.6, speed: 0.2, color: '#009639', angleOffset: Math.PI / 2 },
  { name: 'SQL', orbit: 2.6, speed: 0.2, color: '#00758F', angleOffset: Math.PI },
  { name: 'Figma', orbit: 2.6, speed: 0.2, color: '#F24E1E', angleOffset: (3 * Math.PI) / 2 },
];

function OrbitingSkill({ name, orbit, speed, color, angleOffset }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + angleOffset;
    const x = Math.cos(t) * orbit;
    const z = Math.sin(t) * orbit;
    const y = Math.sin(t * 2) * 0.15; // Vertical wave effect

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      // Keep text facing camera
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Skill Sphere Node */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Glowing Orbit Ring (Subtle) */}
      <mesh position={[0, -0.01, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} wireframe />
      </mesh>

      {/* Skill Label */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.15}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/outfit/v11/Q3pwM5Zwc8c8GXfznPfn.woff" // Outfit Font
      >
        {name}
      </Text>
    </group>
  );
}

function GalaxySystem() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Render static concentric orbit line helper path rings
  const orbitRings = useMemo(() => {
    const rings = [];
    const orbits = [1.2, 1.9, 2.6];
    
    orbits.forEach((radius) => {
      const ringPoints = [];
      const numSegments = 64;
      for (let i = 0; i <= numSegments; i++) {
        const theta = (i / numSegments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      rings.push(new THREE.BufferGeometry().setFromPoints(ringPoints));
    });
    return rings;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Core Sun Node */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#0062ff" toneMapped={false} />
      </mesh>
      
      {/* Core Aura */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.15} wireframe />
      </mesh>

      <Text
        position={[0, 0.45, 0]}
        fontSize={0.22}
        color="#0062ff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        CSE Core
      </Text>

      {/* Orbit Rings Line Helpers */}
      {orbitRings.map((geometry, idx) => (
        <line key={idx} geometry={geometry}>
          <lineBasicMaterial color="#000000" transparent opacity={0.07} />
        </line>
      ))}

      {/* Orbiting Skill Elements */}
      {SKILLS_DATA.map((skill, idx) => (
        <OrbitingSkill key={idx} {...skill} />
      ))}
    </group>
  );
}

export default function SkillsGalaxy() {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }} className="interactive">
      <Canvas camera={{ position: [0, 2.5, 4.5], fov: 55 }}>
        <ambientLight intensity={1.0} />
        <GalaxySystem />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 5} />
      </Canvas>
    </div>
  );
}
