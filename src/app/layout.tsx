import type { Metadata } from 'next';
import './globals.css';  // グローバルCSS（Tailwindなど）
import Header from '@/components/Header';

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
        <Header />

        {/* メインコンテンツ: 新規padding-top追加でHeader分の余白確保 */}
        <main className="pt-20">{children}</main>

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