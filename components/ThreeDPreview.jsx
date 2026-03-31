"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  ContactShadows,
  BakeShadows,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function StilettoPendant({ ...props }) {
  return (
    <group {...props} dispose={null}>
      {/* 1. THE SILVER BODY (Tapered Needle - High Polish) */}
      <mesh castShadow receiveShadow position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.35, 0.01, 3.5, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.01}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>

      {/* 2. THE GEM HOLDER (Refined teardrop-like setting) */}
      <mesh position={[0, 0, 0]} scale={[1.1, 1.3, 0.7]} castShadow>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.01} metalness={1} envMapIntensity={2} />
      </mesh>

      {/* 3. SILVER BEZEL (Setting ring for the emerald) */}
      <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>

      {/* 4. THE BAIL (Polished Loop) */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.12, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>

      {/* 5. THE EMERALD (Deeper refraction) */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.22, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          thickness={0.8}
          anisotropy={0.2}
          chromaticAberration={0.06}
          distortion={0.3}
          color="#1e5c3f"
          ior={1.6}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

function PedestalModel({ ...props }) {
  return (
    <group {...props}>
      {/* Base Pedestal (Weighted Silver Column) */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.9, 4, 64]} />
        <meshStandardMaterial 
          color="#0f0f0f" 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>
      
      {/* Polished Top Plate */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>

      {/* Silver Hook (Fine Wire Look) */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>
      <mesh position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.02, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>
    </group>
  );
}

function Experience({ scrollProgress }) {
  const pendantGroup = useRef();
  const pedestalGroup = useRef();

  useFrame((state) => {
    const progress = scrollProgress?.get() || 0;
    
    // Ranges
    const r1 = Math.min(1, Math.max(0, progress * 2)); // Intro (0 to 0.5)
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2)); // Docking (0.5 to 1)
    
    // Pendant movement logic
    // Bail is at 0.85. Pedestal hook is at 1.65. Base Y = -1.6
    // Net hook Y = -1.6 + 1.65 = 0.05.
    // To dock bail on hook, pendant group Y needs to be 0.05 - 0.85 = -0.8
    pendantGroup.current.position.y = THREE.MathUtils.lerp(0.5, -0.8, r2); 
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0.14, r2); // Gentle Z adjustment to avoid clipping
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(1.2, 0.85, r2));
    
    // Rotation logic
    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.4 + r1 * 4;
    
    // Pedestal slides up from darkness
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-15, -1.6, r2);
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <StilettoPendant />
        </group>
      </Float>

      <group ref={pedestalGroup}>
        <PedestalModel />
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={15} blur={2.5} far={10} />
    </>
  );
}

export default function ThreeDPreview({ scrollProgress }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2500} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={800} color="#1e5c3f" />

        <Suspense fallback={null}>
          <Experience scrollProgress={scrollProgress} />
          <Environment preset="studio" />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}