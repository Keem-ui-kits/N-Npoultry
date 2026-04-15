'use client';

import * as THREE from 'three';
import { useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';

function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 768;
    const z = isMobile ? 8.5 : 5.5;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(0, 0, z);
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  return null;
}

function EggMesh() {
  const geometry = useMemo(() => {
    try {
      const geo = new THREE.SphereGeometry(1.6, 64, 64);
      const pos = geo.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);
        const normalizedY = y / 1.6;
        const taper = 1 - 0.12 * normalizedY;
        x *= taper * 0.88;
        z *= taper * 0.88;
        y *= 1.15;
        if (y > 0) y *= 1.02;
        pos.setXYZ(i, x, y, z);
      }

      geo.computeVertexNormals();
      return geo;
    } catch (e) {
      console.error('Failed to create egg geometry:', e);
      return new THREE.SphereGeometry(1.6, 32, 32);
    }
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <mesh castShadow geometry={geometry}>
      <meshPhysicalMaterial
        color="#c86d38"
        roughness={0.5}
        metalness={0.05}
        clearcoat={0.2}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
}

export function FloatingEgg3DScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => { setReducedMotion(e.matches); };
    mq.addEventListener('change', handler);
    return () => { mq.removeEventListener('change', handler); };
  }, []);

  if (reducedMotion) {
    return (
      <div className="w-full h-[350px] md:h-[750px] relative flex items-center justify-center">
        <img src="/table-eggs.png" alt="Fresh eggs" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
      </div>
    );
  }

  return (
    <div className="w-full h-[350px] md:h-[750px] relative pointer-events-none md:pointer-events-auto overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-transparent flex items-center justify-center text-muted-foreground/20">Loading...</div>}>
        <Canvas
          shadows
          camera={{ fov: 45, position: [0, 0, 5.5] }}
          gl={{
            antialias: true,
            alpha: true,
            depth: true,
            powerPreference: 'default'
          }}
          // Use dynamic dpr but cap it at 2 for mobile stability
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        >
          <CameraController />
          <ambientLight intensity={1.2} color="#ffe8d6" />

          <directionalLight
            position={[-5, 5, 5]}
            intensity={2.8}
            castShadow
            shadow-mapSize={[256, 256]} // Reduced resolution for stability
          />

          <pointLight position={[5, -5, 5]} intensity={1.5} color="#ffedd6" />
          
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.3, 0.3]}
          >
            <Float
              speed={1.2}
              rotationIntensity={0.2}
              floatIntensity={0.8}
              floatingRange={[-0.15, 0.15]}
            >
              <EggMesh />
            </Float>
          </PresentationControls>

          <Environment preset="city" />

          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.4}
            scale={7}
            blur={2.5}
            far={4}
            resolution={256}
            color="#000000"
          />

        </Canvas>
      </Suspense>
    </div>
  );
}
