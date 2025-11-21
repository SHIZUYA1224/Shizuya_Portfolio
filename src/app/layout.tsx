// filepath: /Users/Dev/Portfolio/portfolio/src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';  // グローバルCSS（Tailwindなど）

export const metadata: Metadata = {
  title: 'SHIZUYA Portfolio',
  description: '3D Interactive Self-Introduction Site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        {/* ヘッダー */}
        <header className="bg-white shadow-md p-4">
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-xl font-bold">SHIZUYA Portfolio</h1>
            <div className="flex gap-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/room" className="hover:underline">3D Room</a>
              <a href="/ai-tuber" className="hover:underline">AI-Tuber</a>
              <a href="/music" className="hover:underline">Music</a>
            </div>
          </nav>
        </header>

        {/* メインコンテンツ */}
        <main>{children}</main>

        {/* フッター */}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2024 SHIZUYA. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}