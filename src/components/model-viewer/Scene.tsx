'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Grid, Center } from '@react-three/drei';
import { Lighting } from './Lighting';
import { CameraControls } from './CameraControls';
import { GltfModel } from './GltfModel';
import { VrmModel } from './VrmModel';
import type { PresetModel, ViewerSettings } from '@/types/model';

interface SceneProps {
  model: PresetModel | null;
  settings: ViewerSettings;
  onModelLoad?: () => void;
  onModelError?: (error: Error) => void;
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}

export function Scene({
  model,
  settings,
  onModelLoad,
  onModelError,
}: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 3], fov: 50 }}
      style={{ background: settings.backgroundColor }}
    >
      <Lighting />
      <Environment preset="studio" />

      {settings.showGrid && (
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
      )}

      <Suspense fallback={<Loader />}>
        <Center>
          {model?.type === 'gltf' && (
            <GltfModel
              url={model.url}
              onLoad={onModelLoad}
              onError={onModelError}
            />
          )}
          {model?.type === 'vrm' && (
            <VrmModel
              url={model.url}
              onLoad={onModelLoad}
              onError={onModelError}
            />
          )}
        </Center>
      </Suspense>

      <CameraControls autoRotate={settings.autoRotate} />
    </Canvas>
  );
}
