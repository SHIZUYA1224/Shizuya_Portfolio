'use client';

import useAudioPlayer from '@/app/music/useAudioPlayer';
import type { Track } from '@/config/tracks';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext'; // 追加: Context との同期

type PlayerProps = {
  track: Track | null;
  playlist: Track[];
  onSelectTrack: (t: Track) => void;
};

export default function Player({
  track,
  playlist,
  onSelectTrack,
}: PlayerProps) {
  const {
    audioRef,
    progress,
    volume,
    duration,
    seek,
    setVol,
    play,
    pause,
    isPlaying,
  } = useAudioPlayer(track);

  const {
    currentTrack,
    isPlaying: ctxIsPlaying,
    setIsPlaying: setCtxIsPlaying,
    registerControls,
  } = usePlayer();

  // Context -> Audio 一方向同期（再生を命令）
  // 追加: 内部の isPlaying と照合して差分がある場合のみ呼ぶ
  useEffect(() => {
    if (ctxIsPlaying === isPlaying) return;
    if (ctxIsPlaying) void play();
    else pause();
  }, [ctxIsPlaying, isPlaying, play, pause]);

  // audio の実際の状態が変わったら Context を更新（Audio -> Context）
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setCtxIsPlaying(true);
    const handlePause = () => setCtxIsPlaying(false);
    const handleEnded = () => setCtxIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, setCtxIsPlaying]);

  // registerControls の登録はそのまま
  useEffect(() => {
    registerControls({ seek, play, pause, setVol });
  }, [registerControls, seek, play, pause, setVol]);

  // 再生しないときはPlayer UI非表示（既存）
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

  // formatTime 省略（元のまま）
  const formatTime = (time: number) => {
    if (!isFinite(time) || time < 0) return '0:00';
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-gray-300 p-3 z-50 border-t border-gray-600">
      <audio ref={audioRef} />

      {/* UI: 既存の JSX そのまま */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* 左：曲情報 */}
        <div className="flex items-center w-1/4 min-w-[150px] pr-2">
          <img
            src={
              track.coverUrl ||
              'https://placehold.co/40x40/374151/ffffff?text=♫'
            }
            alt={`${track.title} cover`}
            className="w-10 h-10 rounded-md object-cover mr-2 flex-shrink-0"
          />
          <div className="truncate">
            <h3 className="text-sm font-medium truncate text-gray-200">
              {track.title}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {track.artist || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* 中央: Prev / Play / Next */}
        <div className="flex items-center justify-center space-x-3 w-1/2">
          <button onClick={prevTrack} aria-label="Previous Track">
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play ボタンは Context を操作し、Context -> audio の流れで再生を操作 */}
          <button
            onClick={() => setCtxIsPlaying(!ctxIsPlaying)}
            aria-label={ctxIsPlaying ? 'Pause' : 'Play'}
          >
            {ctxIsPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button onClick={nextTrack} aria-label="Next Track">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* 右側のシーク/ボリューム */}
        <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
          <div className="flex items-center w-full max-w-sm">
            <span className="text-xs mr-1 min-w-[30px] text-right font-mono">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(duration || track.duration || 0, 0)}
              value={Math.min(
                progress,
                Math.max(duration || track.duration || 0)
              )}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs ml-1 min-w-[30px] text-left font-mono">
              {formatTime(duration || track.duration || 0)}
            </span>
          </div>

          <div className="flex items-center min-w-[100px]">
            <Volume2 className="w-4 h-4 mr-1 text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVol(Number(e.target.value))}
              className="w-full h-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
