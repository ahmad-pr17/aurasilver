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
    // Smoother, less aggressive interpolation steps
    const r1 = Math.min(1, Math.max(0, progress * 1.8));
    const r2 = Math.min(1, Math.max(0, (progress - 0.5) * 2));

    // Mouse Parallax Logic
    const mouseX = state.mouse.x * 0.15; // Slightly reduced mouse sensitivity
    const mouseY = state.mouse.y * 0.15;

    // Movement & Vertical Scroll Path
    // Drifts RIGHT during r1, the starts centering for the dock during r2
    // Reduced from 2.5 to 1.25 for a more centered, balanced experience
    const targetX = THREE.MathUtils.lerp(0, 1.25, r1) - THREE.MathUtils.lerp(0, 1.25, r2);
    const targetY = THREE.MathUtils.lerp(1, 0, r1) + THREE.MathUtils.lerp(0, 1.5, r2);

    pendantGroup.current.position.x = targetX + mouseX;
    pendantGroup.current.position.y = targetY + mouseY;
    // Z-axis (Zoom) reduced from 3.5 to 1.5 peak
    pendantGroup.current.position.z = THREE.MathUtils.lerp(0, 0, r1) - THREE.MathUtils.lerp(0, 0, r2);

    // Rotation: gentle spin + mouse tilt
    pendantGroup.current.rotation.y = state.clock.getElapsedTime() * 0.25 + (r1 * Math.PI * 0.5) + (mouseX * 0.4);
    pendantGroup.current.rotation.x = mouseY * 0.4;

    // Scale: Subtle grow effect reduced from 1.4 to 1.2 peak
    pendantGroup.current.scale.setScalar(THREE.MathUtils.lerp(1.1, 1.2, r1) - THREE.MathUtils.lerp(0, 0.4, r2));

    // Pedestal comes from deep below and stays low for atmospheric footer background
    pedestalGroup.current.position.y = THREE.MathUtils.lerp(-18, -6.5, r2);
    pedestalGroup.current.position.x = 0;
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={pendantGroup}>
          <PendantModel />
          <SilverWire radius={3.8} />
        </group>
      </Float>

      <group ref={pedestalGroup}>
        <PedestalModel />
      </group>

      <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={3} far={15} />
      <Environment preset="city" />
    </>
  );
}

export default function ThreeDPreview({ scrollProgress }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 35 }}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.8} />

        {/* Cinematic Rim Lights */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2500} castShadow color="#ffffff" />
        <pointLight position={[-10, -5, 5]} intensity={1500} color="#e0e0ff" />
        <pointLight position={[0, 10, -10]} intensity={800} color="#ffffff" />

        <Suspense fallback={null}>
          <Experience scrollProgress={scrollProgress} />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}