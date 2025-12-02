import useAudioPlayer from '../app/music/useAudioPlayer'; // オーディオプレイヤーロジック
import type { Track } from '../config/tracks'; // トラックデータ型
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'; // モダンなアイコンセット

interface PlayerProps {
  track: Track | null;
  playlist: Track[];
  onSelectTrack: (track: Track) => void;
}

export default function Player({
  track,
  playlist,
  onSelectTrack,
}: PlayerProps) {
  // useAudioPlayerは外部で定義されたフックであり、ここではパスを修正せず元の記述のまま残します。
  // useAudioPlayerからdurationを取得することを想定
  const { audioRef, isPlaying, progress, volume, togglePlay, seek, setVol } =
    useAudioPlayer(track);

  if (!track) return null;

  const currentIndex = playlist.findIndex((t) => t.id === track.id);

  const nextTrack = () => {
    const next = playlist[(currentIndex + 1) % playlist.length];
    onSelectTrack(next);
  };

  const prevTrack = () => {
    const prev =
      playlist[(currentIndex - 1 + playlist.length) % playlist.length];
    onSelectTrack(prev);
  };

  // 進捗状況をMM:SS形式にフォーマットするヘルパー関数
  const formatTime = (time: number): string => {
    if (!isFinite(time) || time < 0) return '0:00';

    const totalSeconds = Math.floor(time);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const minutes = Math.floor(totalSeconds / 60);

    return `${minutes}:${seconds}`;
  };

  return (
    // プレイヤーバー全体: 画面下部に固定 (fixed bottom-0)、モノクロ背景と境界線
    <div className="fixed bottom-0 left-0 right-0 bg-black text-gray-300 p-3 z-50 border-t border-gray-600">
      <audio ref={audioRef} />

      {/* プレイヤーのメインコンテナ: 中央揃え、要素を水平に配置 */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* 1. 曲情報 (左側): 最低限の表示 */}
        <div className="flex items-center w-1/4 min-w-[150px] pr-2">
          {/* アートワーク: サイズを小さく、シンプルな角丸 */}
          <img
            src={
              track.coverUrl ||
              'https://placehold.co/40x40/374151/ffffff?text=♫'
            }
            alt={`${track.title} cover`}
            className="w-10 h-10 rounded-md object-cover mr-2 flex-shrink-0"
          />
          {/* タイトルとアーティスト */}
          <div className="truncate">
            {/* タイトル */}
            <h3 className="text-sm font-medium truncate text-gray-200">
              {track.title}
            </h3>
            {/* アーティスト: グレーの小さな文字で表示 */}
            <p className="text-xs text-gray-500 truncate">
              {track.artist || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* 2. コントロールボタン (中央): 最低限のボタン配置 */}
        <div className="flex items-center justify-center space-x-3 w-1/2">
          {/* Prevボタン */}
          <button
            onClick={prevTrack}
            className="text-gray-500 p-1 rounded-full focus:outline-none hover:text-gray-300"
            aria-label="Previous Track"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* 再生/一時停止ボタン: 背景色のみ設定 */}
          <button
            onClick={togglePlay}
            className="p-2 bg-gray-700 text-gray-200 rounded-full focus:outline-none hover:bg-gray-600"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {/* isPlayingに応じてアイコンを切り替える (PauseまたはPlay) */}
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-px" />
            )}
          </button>

          {/* Nextボタン */}
          <button
            onClick={nextTrack}
            className="text-gray-500 p-1 rounded-full focus:outline-none hover:text-gray-300"
            aria-label="Next Track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* 3. プログレスバー & ボリューム (右側): シンプルなスライダー */}
        {/* mediumスクリーン以上でのみ表示 (md:flex) - レスポンシブをシンプル化 */}
        <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
          {/* プログレスバー (時間表示付き) */}
          <div className="flex items-center w-full max-w-sm">
            {/* 現在時間 */}
            <span className="text-xs text-gray-500 mr-1 min-w-[30px] text-right font-mono">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={track.duration || 100}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              // スライダーのカスタマイズを最低限に
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-label="Track Progress"
            />
            {/* トラックの合計時間 */}
            <span className="text-xs text-gray-500 ml-1 min-w-[30px] text-left font-mono">
              {formatTime(track.duration || 0)}
            </span>
          </div>

          {/* 音量コントロール */}
          <div className="flex items-center min-w-[100px]">
            <Volume2 className="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVol(Number(e.target.value))}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-label="Volume Control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
