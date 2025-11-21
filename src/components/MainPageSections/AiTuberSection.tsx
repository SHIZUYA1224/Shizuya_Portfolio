'use client';

import React from 'react';

export default function AiTuberSection() {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* 左側：AI-Tuber 表示エリア */}
        <div className="flex-1 w-full h-[400px] md:h-[500px] relative bg-white rounded-lg shadow-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-gray-600">チャットの動画がここに表示されます</p>
          </div>
        </div>

        {/* 右側：テキストエリア */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            AI-Tuber & Interactive AI
          </h2>
          <p className="text-gray-600 leading-relaxed">
            AI を活用したインタラクティブなキャラクター制作も対応可能です。
            チャットの動画で AI-Tuber の魅力を紹介します。
          </p>
          <div className="pt-2">
            <span className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
              動画を見る →
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}