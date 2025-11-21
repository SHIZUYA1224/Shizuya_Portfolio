'use client';

import React from 'react';

export default function MusicSection() {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* 左側：テキストエリア */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Music & Audio Production
          </h2>
          <p className="text-gray-600 leading-relaxed">
            音楽制作やオーディオデザインも対応可能です。
            Web上でインタラクティブな音楽体験を提供し、
            ユーザーのエンゲージメントを高めます。
          </p>
          <div className="pt-2">
            <span className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
              音楽作品を見る →
            </span>
          </div>
        </div>

        {/* 右側：音楽プレイヤーエリア */}
        <div className="flex-1 w-full h-[400px] md:h-[500px] relative bg-white rounded-lg shadow-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-gray-600">音楽プレイヤーがここに表示されます</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              再生
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}