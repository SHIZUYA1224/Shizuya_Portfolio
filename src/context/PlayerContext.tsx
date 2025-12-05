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
    // 非同期で呼ぶ
    Promise.resolve().then(() => controlsRef.current.play?.());
  };

  const togglePlay = () => {
    let next = false;
    setIsPlaying((prev) => {
      next = !prev;
      return next;
    });
    Promise.resolve().then(() => {
      if (next) controlsRef.current.play?.();
      else controlsRef.current.pause?.();
    });
  };

  // registerControls: Player が呼び出してシーク/プレイ関数を登録する
  const registerControls = (c: PlayerControls) => {
    controlsRef.current = { ...controlsRef.current, ...(c ?? {}) };
    // 返り値: deregister
    return () => {
      // 適切にクリーンアップする戦略に応じて実装
      controlsRef.current = {}; // シンプルに全部消す
    };
  };

  // 外部から再生位置を切り替えるための関数
  const seekTo = (time: number) => {
    controlsRef.current.seek?.(time);
    setIsPlaying(true);
    setTimeout(() => controlsRef.current.play?.(), 0);
  };

  // 時刻指定で再生を開始する（seek + play）
  const playFrom = (time: number) => {
    controlsRef.current.seek?.(time);
    setIsPlaying(true);
    setTimeout(() => controlsRef.current.play?.(), 0);
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
