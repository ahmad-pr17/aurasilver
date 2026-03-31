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

function SilverWire({ radius = 3.8, ...props }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-radius, 12, -2),   // Higher start
      new THREE.Vector3(-radius * 0.4, 6, -0.8),
      new THREE.Vector3(0, 0.95, 0),       // Anchored to Bail
      new THREE.Vector3(radius * 0.4, 6, -0.8),
      new THREE.Vector3(radius, 12, -2),
    ]);
  }, [radius]);

  return (
    <mesh castShadow {...props}>
      <tubeGeometry args={[curve, 100, 0.022, 12, false]} />
      <meshStandardMaterial
        color="#e8e8e8"
        metalness={1}
        roughness={0.1}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}

function StilettoPendant({ ...props }) {
  return (
    <group {...props} dispose={null}>
      {/* Main Silver Body (Flattened Teardrop/Pear Shape) */}
      <mesh position={[0, 0, 0]} scale={[1.2, 1.6, 0.5]} castShadow receiveShadow>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#e0e0e0"
          roughness={0.18}
          metalness={1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Tapering Silver Spike (The "Stiletto") */}
      <mesh castShadow receiveShadow position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.002, 3.2, 3]} />
        <meshStandardMaterial
          color="#e0e0e0"
          roughness={0.2}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Gemstone Bezel (Silver Ring) */}
      <mesh position={[0, 0, 0.28]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.26, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.15} />
      </mesh>

      {/* Gemstone (Oval Cabochon Emerald) */}
      <mesh position={[0, 0, 0.24]} scale={[1, 1.35, 0.4]}>
        <sphereGeometry args={[0.22, 64, 64]} />
        <MeshTransmissionMaterial
          samples={8}
          resolution={256}
          thickness={0.5}
          anisotropy={0.1}
          chromaticAberration={0.06}
          distortion={0.3}
          color="#1e5c3f"
          ior={1.6}
          roughness={0.02}
        />
      </mesh>

      {/* Bail (Silver Loop at top) */}
      <mesh position={[0, 0.88, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.12, 0.025, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
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
        <meshStandardMaterial color="#0f0f0f" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Polished Top Plate */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Experience({ scrollProgress }) {
  const pendantGroup = useRef();
  const pedestalGroup = useRef();

  useFrame((state) => {
    const progress = scrollProgress?.get() || 0;
    const r1 = Math.min(1, Math.max(0, progress * 2));         // 0.0 to 0.5 (Hero)
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2)); // 0.5 to 1.0 (Smooth Continuous)

    // Target Final Positions (One-step smooth glide)
    // Pedestal ends at -1.4
    // Pendant tip floats 0.5 above pedestal plate (-1.4 + 0.1 + 0.5 = -0.8)
    // Pendant group Y = -0.8 + 2.95 = 2.15
    const targetPendantY = 2.15;
    const targetPedestalY = -1.4;

    // Pendant movement
    pendantGroup.current.position.y = THREE.MathUtils.lerp(0.5, targetPendantY, r2);
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0.55, r2);
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 0.55, r2));

    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.4 + r1 * 6.28; // One full rotation

    // Pedestal movement
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-15, targetPedestalY, r2);
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <StilettoPendant />
          <SilverWire radius={3.5} />
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
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 35 }}>
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