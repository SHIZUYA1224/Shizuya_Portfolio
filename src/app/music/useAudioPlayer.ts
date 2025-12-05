'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Track } from '@/config/tracks';

export default function useAudioPlayer(track: Track | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 秒
  const [volume, setVolume] = useState(1);
  // 追加: 実際の audio.duration を保持
  const [duration, setDuration] = useState<number>(track?.duration || 0);

  // Track 切り替え時の初期化と自動再生
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = track.audioUrl;
    audio.load();

    // preserve current volume value when switching sources
    audio.volume = volume;

    // reset UI state (progress/duration fallback)
    setProgress(0);
    setDuration(track.duration || 0);

    // play attempt (catch Promise rejection)
    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [track, volume]);

  // loadedmetadata で duration/currentTime をセット
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      // audio.duration は sec なので数値をセット
      const d = isFinite(audio.duration)
        ? audio.duration
        : track?.duration ?? 0;
      setDuration(d);
      setProgress(audio.currentTime || 0);
    };
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => audio.removeEventListener('loadedmetadata', onLoaded);
  }, [track]);

  // timeupdate イベントで進捗を更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const current = audio.currentTime || 0;
      setProgress(current);
      // sync duration in case it's changed or unknown
      if (isFinite(audio.duration)) setDuration(audio.duration);
    };
    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  // 音量を audio に反映（外部 setVol からの変更も反映）
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // 明示的な play/pause をエクスポートして Context と同期しやすくする
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // 既存の togglePlay を play/pause の wrapper に変更
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, play, pause]);

  // safe seek: loadedmetadata を待つ
  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const safeSeek = () => {
      const target = Math.max(0, value);
      if (isFinite(audio.duration)) {
        audio.currentTime = Math.min(target, audio.duration);
      } else {
        audio.currentTime = target;
      }
      setProgress(audio.currentTime);
    };

    if (audio.readyState >= 1) {
      safeSeek();
    } else {
      const onLoaded = () => {
        safeSeek();
        audio.removeEventListener('loadedmetadata', onLoaded);
      };
      audio.addEventListener('loadedmetadata', onLoaded);
    }
  }, []);

  const setVol = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return {
    audioRef,
    progress,
    volume,
    duration, // 追加: 実際の duration をエクスポート
    togglePlay,
    seek,
    setVol,
    play,
    pause,
  };
}
