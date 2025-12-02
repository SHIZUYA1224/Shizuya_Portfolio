'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import * as THREE from 'three';

interface VrmModelProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function VrmModel({ url, onLoad, onError }: VrmModelProps) {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  });

  useEffect(() => {
    const loadVrm = async () => {
      try {
        const vrmData = gltf.userData.vrm as VRM | undefined;

        if (!vrmData) {
          throw new Error('VRMデータが見つかりません');
        }

        VRMUtils.removeUnnecessaryVertices(vrmData.scene);
        VRMUtils.removeUnnecessaryJoints(vrmData.scene);

        vrmData.humanoid?.resetNormalizedPose();

        const box = new THREE.Box3().setFromObject(vrmData.scene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2 / maxDim;

        vrmData.scene.scale.setScalar(scale);

        const center = box.getCenter(new THREE.Vector3());
        vrmData.scene.position.x = -center.x * scale;
        vrmData.scene.position.y = -box.min.y * scale;
        vrmData.scene.position.z = -center.z * scale;

        setVrm(vrmData);
        onLoad?.();
      } catch (error) {
        onError?.(
          error instanceof Error ? error : new Error('VRM読み込みエラー')
        );
      }
    };

    loadVrm();

    return () => {
      if (vrm) {
        VRMUtils.deepDispose(vrm.scene);
      }
    };
  }, [gltf, onLoad, onError, vrm]);

  useFrame((_, delta) => {
    vrm?.update(delta);
  });

  if (!vrm) return null;

  return (
    <group ref={groupRef}>
      <primitive object={vrm.scene} />
    </group>
  );
}
