'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Track } from '@/config/tracks';

export default function useAudioPlayer(track: Track | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 秒
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState<number>(track?.duration || 0);

  // Track 切り替え時の初期化と自動再生
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = track.audioUrl;
    audio.load();

    audio.volume = volume;
    setProgress(0);
    setDuration(track.duration || 0);

    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [track, volume]);

  // イベント登録: loadedmetadata/timeupdate/play/pause/ended を一か所で登録
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      const d = Number.isFinite(audio.duration)
        ? audio.duration
        : track?.duration ?? 0;
      setDuration(d);
      setProgress(audio.currentTime || 0);
    };

    const onTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    // debug: console.log('[useAudioPlayer] attached audio events', { src: audio.src });

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [track]);

  // 音量を audio に反映（外部 setVol からの変更も反映）
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // play/pause/seek/setVol as before
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

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const safeSeek = () => {
      const target = Math.max(0, value);
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(target, audio.duration);
      } else {
        audio.currentTime = target;
      }
      setProgress(audio.currentTime);
    };

    if (audio.readyState >= 1) safeSeek();
    else {
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
    duration,
    isPlaying, // 表示のみ/比較用
    togglePlay,
    seek,
    setVol,
    play,
    pause,
  };
}
