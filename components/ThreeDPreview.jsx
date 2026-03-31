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
  
  // Custom teardrop shape using LatheGeometry
  const teardropPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.5 + 0.1, (i - 5) * 0.4));
    }
    return points;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Elegant Teardrop Frame */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.05, 128, 32, 2, 3]} />
        <meshStandardMaterial 
          color="#e0e0e0" 
          roughness={0.05} 
          metalness={1} 
          envMapIntensity={2}
        />
      </mesh>

      {/* Floating Gemstone */}
      <mesh position={[0, 0, 0]} castShadow>
        <dodecahedronGeometry args={[0.55, 0]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={0.5}
          thickness={1}
          samples={16}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          distortion={0.3}
          chromaticAberration={0.08}
          anisotropicBlur={0.1}
          color="#3498db"
          roughness={0.02}
        />
      </mesh>

      {/* Small Bail at the top */}
      <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 16, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
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

function Experience() {
  const scroll = useScroll();
  const pendantGroup = useRef();
  const pedestalGroup = useRef();

  useFrame((state) => {
    const r1 = scroll.range(0, 0.5); // Intro phase
    const r2 = scroll.range(0.5, 1); // Docking phase
    
    // Pendant movement
    pendantGroup.current.position.y = THREE.MathUtils.lerp(1, 1.6, r2); // Final docking position
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, -0.5, r2);
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(1.5, 0.8, r2));
    
    // Rotation logic
    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.5 + r1 * 4;
    
    // Pedestal movement
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-10, -3.5, r2);
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

export default function ThreeDPreview() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2000} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={500} color="#3498db" />

        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <Experience />
          </ScrollControls>
          <Environment preset="city" />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
