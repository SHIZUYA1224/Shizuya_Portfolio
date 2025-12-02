// src/app/music/hooks/useAudioPlayer.ts
import { useEffect, useRef, useState } from 'react';
import type { Track } from '../../config/tracks'; // 追加: Track型をインポート

export default function useAudioPlayer(track: Track | null) {
  // 修正: trackにTrack型を追加
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 秒
  const [volume, setVolume] = useState(1);

  // track が切り替わった時の処理
  useEffect(() => {
    if (!audioRef.current || !track) return;

    audioRef.current.src = track.audioUrl;
    audioRef.current.load();
    setIsPlaying(true);

    audioRef.current.play();
  }, [track]);

  // 進捗更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setProgress(audio.currentTime);
    audio.addEventListener('timeupdate', update);

    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  // 再生 / 停止
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // シーク
  const seek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // 音量
  const setVol = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return {
    audioRef,
    isPlaying,
    progress,
    volume,
    togglePlay,
    seek,
    setVol,
  };
}
