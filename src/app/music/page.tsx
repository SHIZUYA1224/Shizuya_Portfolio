'use client';

import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import TrackList from '@/components/TrackList';
import Player from '@/components/Player';
import { TRACKS } from '../../config/tracks';
import { useState } from 'react';
import type { Track } from '../../config/tracks'; // 型インポート

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <main>
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <Button href="/" text="Back to Home" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/room" text="3D Room" />

        <div style={{ padding: 20 }}>
          <h1>Music</h1>

          <TrackList tracks={TRACKS} onSelectTrack={setCurrentTrack} />

          <Player
            track={currentTrack}
            playlist={TRACKS}
            onSelectTrack={setCurrentTrack}
          />
        </div>
      </div>
    </main>
  );
}
