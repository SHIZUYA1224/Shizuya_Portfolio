'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, OrbitControls, ContactShadows } from '@react-three/drei';

/**
 * シンプルな3Dモデル
 * - ゆっくり回るだけ
 * - 色はサイトに合わせて調整しやすいグレー/ブルー系
 */
function SimpleObject() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    // 毎フレーム少しずつ回転させる
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Torus ref={meshRef} args={[1, 0.4, 16, 48]} scale={1.8}>
      <meshStandardMaterial
        color="#6366f1" // インディゴブルー（好みの色に変えてください）
        roughness={0.4} // 少しツヤを抑える
        metalness={0.6} // 金属感を足す
      />
    </Torus>
  );
}

export default function ThreeDFeature() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* 左側：テキストエリア */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            3D Modeling & Design
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Webデザインだけでなく、3Dアセットの制作や実装も対応可能です。
            React Three Fiberを用いたインタラクティブな表現で、
            ブランドに新しい奥行きを持たせることができます。
          </p>
          <div className="pt-2">
            <span className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
              制作事例を見る →
            </span>
          </div>
        </div>

        {/* 右側：3D表示エリア 
            背景色を指定していないので、親の bg-white がそのまま透けます
        */}
        <div className="flex-1 w-full h-[400px] md:h-[500px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* ライト設定: シンプルに */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            
            {/* オブジェクト */}
            <SimpleObject />
            
            {/* 床に落ちる影（あると接地感が出て「そこに在る」感じになる） */}
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} />
            
            {/* ユーザーが動かせるようにする（ズームは無効化して邪魔にならないように） */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
