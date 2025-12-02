// src/components/model-viewer/Lighting.tsx

'use client';

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 5, -5]} intensity={0.3} />
      <pointLight position={[0, 10, -10]} intensity={0.5} />
    </>
  );
}
