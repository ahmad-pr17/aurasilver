"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  ContactShadows,
  BakeShadows,
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function Chain({ links = 14, scrollProgress, ...props }) {
  const group = useRef();
  
  // Create links data
  const linkData = useMemo(() => {
    return Array.from({ length: links }).map((_, i) => ({
      rotation: [Math.PI / 2, i % 2 === 0 ? 0 : Math.PI / 2, 0],
    }));
  }, [links]);

  useFrame(() => {
    const progress = scrollProgress?.get() || 0;
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2)); // Docking phase
    
    // Stretch the chain as it docks
    group.current.children.forEach((child, i) => {
      const spacing = 0.18 + (r2 * 0.05); // Links pull apart slightly
      child.position.y = i * spacing;
    });
  });

  return (
    <group ref={group} {...props}>
      {linkData.map((data, i) => (
        <mesh key={i} rotation={data.rotation} castShadow>
          <torusGeometry args={[0.1, 0.015, 12, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function StilettoPendant({ ...props }) {
  return (
    <group {...props} dispose={null}>
      {/* 1. THE SILVER BODY (Tapered Needle) */}
      <mesh castShadow receiveShadow position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.35, 0.01, 3.5, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.01}
          metalness={1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* 2. THE GEM HOLDER */}
      <mesh position={[0, 0, 0]} scale={[1.15, 1.35, 0.7]} castShadow>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.02} metalness={1} envMapIntensity={2} />
      </mesh>

      {/* 3. SILVER BEZEL */}
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>

      {/* 4. THE BAIL (Attached to the chain) */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.12, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>

      {/* 5. THE EMERALD */}
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
      {/* Base Pedestal */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.9, 4, 64]} />
        <meshStandardMaterial 
          color="#0f0f0f" 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>
      
      {/* Thinner Silver Neck to avoid clipping */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.8, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.01} />
      </mesh>
      
      {/* Silver Hook */}
      <mesh position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.015, 16, 64, Math.PI]} />
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
    const r1 = Math.min(1, Math.max(0, progress * 2)); // 0 to 0.5
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2)); // 0.5 to 1
    
    // Position Refinement: Move forward by 0.55 in Z to clear the stand neck
    pendantGroup.current.position.y = THREE.MathUtils.lerp(0.5, -0.8, r2); 
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0.55, r2);
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(1.2, 0.8, r2));
    
    // Rotation logic
    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.4 + r1 * 4;
    
    // Pedestal slides up
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-15, -1.6, r2);
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <StilettoPendant />
          {/* Animated Chain starting from the Bail (0.85) */}
          <Chain scrollProgress={scrollProgress} position={[0, 0.95, 0]} />
        </group>
      </Float>

      <group ref={pedestalGroup}>
        <PedestalModel />
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={15} blur={2.5} far={10} />
      <Environment preset="studio" />
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
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}