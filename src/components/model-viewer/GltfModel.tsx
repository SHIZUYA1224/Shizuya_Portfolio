'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GltfModelProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function GltfModel({ url, onLoad, onError }: GltfModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(url, true, true, (loader) => {
    loader.manager.onError = (failedUrl) => {
      onError?.(new Error(`Failed to load: ${failedUrl}`));
    };
  });

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;

    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      mixerRef.current = mixer;
    }

    onLoad?.();

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene, animations, onLoad]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload = () => {};
