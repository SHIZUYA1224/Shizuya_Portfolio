'use client';

import { PlayerProvider, usePlayer } from '@/context/PlayerContext';
import Player from '@/components/Player'; // あなたのPlayerコンポーネント
import { TRACKS } from '@/config/tracks';
import type { ReactNode } from 'react';

function MusicPlayerWrapper() {
  const { currentTrack, playTrack } = usePlayer();
  return (
    <Player track={currentTrack} playlist={TRACKS} onSelectTrack={playTrack} />
  );
}

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <>
        {children}
        <MusicPlayerWrapper />
      </>
    </PlayerProvider>
  );
}
