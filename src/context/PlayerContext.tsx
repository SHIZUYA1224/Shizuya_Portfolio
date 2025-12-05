'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import type { Track } from '@/config/tracks';

type PlayerControls = {
  seek?: (t: number) => void;
  play?: () => void;
  pause?: () => void;
  setVol?: (v: number) => void;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (t: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (v: boolean) => void;

  // 追加: 外部から audio 操作するため
  registerControls: (c: PlayerControls) => void;
  seekTo: (time: number) => void;
  playFrom: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const controlsRef = useRef<PlayerControls>({});

  const playTrack = (t: Track) => {
    setCurrentTrack(t);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  // registerControls: Player が呼び出してシーク/プレイ関数を登録する
  const registerControls = (c: PlayerControls) => {
    controlsRef.current = { ...controlsRef.current, ...(c ?? {}) };
  };

  // 外部から再生位置を切り替えるための関数
  const seekTo = (time: number) => {
    controlsRef.current.seek?.(time);
    // スクロール時は再生も始めたい場合が多いので isPlaying を true にする
    setIsPlaying(true);
    controlsRef.current.play?.();
  };

  // 時刻指定で再生を開始する（seek + play）
  const playFrom = (time: number) => {
    controlsRef.current.seek?.(time);
    controlsRef.current.play?.();
    setIsPlaying(true);
  };

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    setIsPlaying,
    registerControls,
    seekTo,
    playFrom,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
