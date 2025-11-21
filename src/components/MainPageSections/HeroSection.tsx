import Title from '../common/Title';

export default function HeroSection() {
  return (
    // h-[500px] は任意の高さに変えてください（例: h-screen, min-h-[400px]など）
    <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. 背景レイヤー */}
      <div className="absolute inset-0 z-0">
        {/* 画像 */}
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* オーバーレイ（文字を読みやすくする黒フィルタ） */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. コンテンツレイヤー (z-10で前面に表示) */}
      <div className="relative z-10 px-4 text-center text-white">
        <Title className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Simple is Best
        </Title>
        <p className="text-lg md:text-xl font-light opacity-90">
          最小限の要素で、最大限のインパクトを。
        </p>
      </div>

    </section>
  );
}
