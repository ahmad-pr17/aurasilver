"use client";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  PresentationControls,
  ContactShadows,
  PerspectiveCamera,
  BakeShadows
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PendantModel() {
  const mesh = useRef();

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      {/* Silver Frame - Geometric Placeholder */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          roughness={0.1} 
          metalness={1} 
          envMapIntensity={2}
        />
      </mesh>

      {/* Gemstone - Transmissive Placeholder */}
      <mesh position={[0, 0, 0]} castShadow>
        <octahedronGeometry args={[0.8, 0]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={0.5}
          thickness={1.5}
          samples={10}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          distortion={0.5}
          chromaticAberration={0.05}
          anisotropicBlur={0.1}
          distortionScale={0.5}
          temporalDistortion={0.5}
          color="#3498db"
          roughness={0}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDPreview() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'grab' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1500} castShadow />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <PendantModel />
            </Float>
          </PresentationControls>
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
          <Environment preset="city" />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
