import Button from '@/components/common/Button'; // 修正: components/ を追加

export default function Header() {
  return (
    <header
      className="
      fixed top-0 left-0 w-full z-50
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
      backdrop-blur-md bg-opacity-90
      transition-all duration-500 ease-in-out
      shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      animate-fadeInDown
      /* 新規: スクロール時の透明度変化（CSSで擬似） */
      scroll-transparent
    "
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* ロゴ/タイトル: 新規回転アニメ追加 */}
        <div className="text-white font-bold text-2xl group">
          Portfolio
          <span className="ml-2 text-slate-400 animate-pulse group-hover:rotate-180 transition-transform duration-500">
            ✦
          </span>
        </div>

        {/* ナビリンク: 各liにグロー効果追加 */}
        <ul className="flex space-x-8 items-center">
          <li>
            <a
              href="/"
              className="
              text-white hover:text-slate-300 relative transition-all duration-300
              /* 新規: グロー効果 */
              hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/room"
              className="
              text-white hover:text-slate-300 relative transition-all duration-300
              hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              ROOM
            </a>
          </li>
          <li>
            <a
              href="/chat"
              className="
              text-white hover:text-slate-300 relative transition-all duration-300
              hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              CHAT
            </a>
          </li>
          <li>
            <a
              href="/music"
              className="
              text-white hover:text-slate-300 relative transition-all duration-300
              hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              MUSIC
            </a>
          </li>
          <li>
            <a
              href="/model"
              className="
              text-white hover:text-slate-300 relative transition-all duration-300
              /* 新規: グロー効果 */
              hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]
              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              MODEL
            </a>
          </li>
          {/* CTAボタン: そのまま */}
          <li>
            <Button href="#contact" text="Get in Touch" />
          </li>
        </ul>
      </nav>

      {/* パーティクル背景: 1つ追加で4つに */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        {/* 新規: 4つ目追加 */}
        <div className="particle particle-4"></div>
      </div>
    </header>
  );
}
