'use client';  // Next.js で Three.js を使う場合、クライアントサイドレンダリングが必要

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import Button from '../../components/common/Button';
import Title from '@/components/common/Title';

export default function Room() {
  const router = useRouter();

  const handleObjectClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="h-screen">
      {/* 3D シーン */}
      <Title text="3D Room" />
      <p className="text-white mb-8">Welcome to my 3D Interactive Self-Introduction Site</p>
        <div className="flex gap-4 items-start">
          <Button href="/" text="Back to Home" />
          <Button href="/ai-tuber" text="AI-Tuber" />
          <Button href="/music" text="Music App" />
        </div>

      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* 3つのオブジェクト */}
        <Box args={[1, 1, 1]} position={[-2, 0, 0]} onClick={() => handleObjectClick('/ai-tuber')}>
          <meshStandardMaterial color="red" />
        </Box>
        <Box args={[1, 1, 1]} position={[0, 0, 0]} onClick={() => handleObjectClick('/music')}>
          <meshStandardMaterial color="green" />
        </Box>
        <Box args={[1, 1, 1]} position={[2, 0, 0]} onClick={() => handleObjectClick('/room')}>
          <meshStandardMaterial color="blue" />
        </Box>
        
        <OrbitControls />
      </Canvas>

      {/* UI オーバーレイ */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-white mb-4">3D Room</h1>
        <p className="text-white mb-8">Welcome to my 3D Interactive Self-Introduction Site</p>
        <div className="flex flex-col gap-4 items-start">
          <Button href="/" text="Back to Home" />
          <Button href="/ai-tuber" text="AI-Tuber" />
          <Button href="/music" text="Music App" />
        </div>
      </div>
    </main>
  );
}