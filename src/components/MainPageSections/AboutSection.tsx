export default function AboutSection() {
  return (
    <section className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>

      <p className="mb-3 leading-relaxed">
        はじめまして、SHIZUYA です。  
        3D・音楽・AI・ネットワークの複数分野を組み合わせた
        <span className="font-semibold">「3D Interactive Self-Introduction Site」</span>
        を制作しています。
      </p>

      <p className="mb-3 leading-relaxed">
        Three.js / React / Next.js を中心に、VRM モデルの表示、AI チャット、
        音声再生、インタラクションデザインなど、
        「見るだけでなく触れるプロフィール」をテーマに開発を進めています。
      </p>

      <p className="leading-relaxed">
        フロントエンド・Unity・FastAPI・音楽制作など、
        多分野を横断しながら表現の幅を拡張するクリエイティブワークが好きです。
        現在は 3D 空間を起点にした“新しい自己紹介の形”を模索しています。
      </p>
    </section>
  );
}