"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  ContactShadows,
  BakeShadows,
  useGLTF,
  Center,
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function SilverWire({ radius = 4.2, ...props }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-radius, 15, -2.5),   // Even higher start
      new THREE.Vector3(-radius * 0.45, 7, -1),
      new THREE.Vector3(0, -1, 0),       // Anchored exactly to Top of Pendant
      new THREE.Vector3(radius * 0.44, 8, -1),
      new THREE.Vector3(radius, 15, -2.5),
    ]);
  }, [radius]);

  return (
    <mesh castShadow {...props}>
      <tubeGeometry args={[curve, 100, 0.038, 16, false]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={1}
        roughness={0.05}
        envMapIntensity={3}
      />
    </mesh>
  );
}

function PendantModel({ ...props }) {
  const { scene } = useGLTF("/pendant.glb");

  // High-Polish Silver Material Polish
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Preserve emissives or specific textures if any, but ensure silver sheen
        if (child.material) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.08;
          child.material.envMapIntensity = 3.5;
          child.material.color.set("#e0e0e0"); // Brighter Sterling Silver
        }
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      <Center top position={[0, -4, 1]}>
        <primitive object={scene} scale={2} />
      </Center>
    </group>
  );
}

// Pre-load the model
useGLTF.preload("/pendant.glb");

function PedestalModel({ ...props }) {
  return (
    <group {...props}>
      {/* Base Pedestal (Weighted Silver Column) */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.9, 4, 64]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Polished Top Plate */}
      <mesh position={[0, 1, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

function Experience({ scrollProgress }) {
  const pendantGroup = useRef();
  const pedestalGroup = useRef();

  useFrame((state) => {
    const progress = scrollProgress?.get() || 0;
    const r1 = Math.min(1, Math.max(0, progress * 2));
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2));

    // Target Final Positions - Adjusted for Visibility in lower center
    // Pedestal Plate Y = -2.5 (safely within typical viewport bottom)
    const targetPedestalY = -2.5;
    // Pendant tip floats exactly above plate
    // Scaled 6.5 model height is ~4.8. Origin top at 0. Tip is at -4.8. 
    // We want tip at targetPedestalY + 0.1(plate) + 0.35(gap) = -2.05
    // So PendantY - 4.8 = -2.05 => PendantY = 2.75
    const targetPendantY = 1.75;

    pendantGroup.current.position.y = THREE.MathUtils.lerp(0.5, targetPendantY, r2);
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0.55, r2);
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 0.55, r2));

    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.4 + r1 * 6.28;

    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-15, targetPedestalY, r2);
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <PendantModel />
          <SilverWire radius={3.8} />
        </group>
      </Float>

      <group ref={pedestalGroup}>
        <PedestalModel />
      </group>

      <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={2.8} far={15} />
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
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3500} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={1200} color="#1e5c3f" />

        <Suspense fallback={null}>
          <Experience scrollProgress={scrollProgress} />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}