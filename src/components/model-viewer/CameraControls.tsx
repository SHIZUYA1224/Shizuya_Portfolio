// src/components/model-viewer/CameraControls.tsx

'use client';

import { OrbitControls } from '@react-three/drei';

interface CameraControlsProps {
  autoRotate?: boolean;
}

export function CameraControls({ autoRotate = false }: CameraControlsProps) {
  return (
    <OrbitControls
      autoRotate={autoRotate}
      autoRotateSpeed={2}
      enablePan
      enableZoom
      enableRotate
      minDistance={1}
      maxDistance={100}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
}
