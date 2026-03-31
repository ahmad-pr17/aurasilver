"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  PresentationControls,
  ContactShadows,
  BakeShadows,
  ScrollControls,
  useScroll,
  MeshDistortMaterial
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function PendantModel({ ...props }) {
  const mesh = useRef();
  
  return (
    <group {...props} dispose={null}>
      {/* Elegant Polished Silver Teardrop Loop */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.9, 0.04, 32, 100]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.01} 
          metalness={1} 
          envMapIntensity={2.5}
        />
      </mesh>
      
      {/* Small Bail (Connector) */}
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 16, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>

      {/* High-Faceted Gemstone (Sapphire) */}
      <mesh position={[0, 0, 0]} castShadow>
        <icosahedronGeometry args={[0.5, 0]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={0.2}
          thickness={1.2}
          samples={16}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          distortion={0.2}
          chromaticAberration={0.1}
          anisotropicBlur={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#1a5f7a" // Deep, sophisticated teal-blue
          roughness={0.01}
          ior={2.4}
        />
      </mesh>
    </group>
  );
}

function PedestalModel({ ...props }) {
  return (
    <group {...props}>
      {/* Base Pedestal */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 4, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>
      
      {/* Velvet Top Cushion */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.55, 1.55, 0.2, 64]} />
        <meshStandardMaterial 
          color="#151515" 
          roughness={1} 
        />
      </mesh>

      {/* Silver Neck/Hook */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Experience({ scrollProgress }) {
  const pendantGroup = useRef();
  const pedestalGroup = useRef();

  useFrame((state) => {
    // We use the scrollProgress prop passed from the parent (Framer Motion)
    const progress = scrollProgress.get(); 
    
    // Mapping progress to ranges [0, 0.5] and [0.5, 1]
    const r1 = Math.min(1, Math.max(0, progress * 2));
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2));
    
    // Pendant movement
    // Higher position: Pendant group at -1.0, Bail at 0.9 -> Final World Y = -0.1
    // Added Z-offset of 0.4 to prevent clipping through the pedestal pillar
    pendantGroup.current.position.y = THREE.MathUtils.lerp(0, -1.0, r2); 
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0.4, r2);
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(1.2, 0.7, r2));
    
    // Rotation logic
    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.3 + r1 * 4;
    
    // Pedestal movement - slides up from below
    // Pedestal group at -1.6, Hook at 1.5 -> Final World Y = -0.1 (Matched!)
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-15, -1.6, r2);
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <PendantModel />
        </group>
      </Float>

      <group ref={pedestalGroup}>
        <PedestalModel />
      </group>

      <ContactShadows 
        position={[0, -3.4, 0]} 
        opacity={0.6} 
        scale={20} 
        blur={2} 
        far={10} 
      />
    </>
  );
}

export default function ThreeDPreview({ scrollProgress }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2500} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={500} color="#3498db" />

        <Suspense fallback={null}>
          <Experience scrollProgress={scrollProgress} />
          <Environment preset="city" />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
