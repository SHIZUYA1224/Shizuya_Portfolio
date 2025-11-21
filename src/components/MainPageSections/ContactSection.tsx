'use client';

import React from 'react';

export default function ContactSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Contact Me
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          プロジェクトのご相談やお問い合わせはこちらから。
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="mailto:your-email@example.com" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Email で連絡
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900">
            GitHub
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}