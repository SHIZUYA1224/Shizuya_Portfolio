'use client';

import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import TrackList from '@/components/TrackList';
import { TRACKS } from '@/config/tracks';
import { usePlayer } from '@/context/PlayerContext';

export default function Music() {
  const { playTrack } = usePlayer();

  return (
    <main>
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <div style={{ padding: 20 }}>
          <h1>Music</h1>
          <TrackList tracks={TRACKS} onSelectTrack={playTrack} />
        </div>
      </div>
    </main>
  );
}
