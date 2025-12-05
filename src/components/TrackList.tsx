// src/components/TrackList.tsx
'use client';

import type { Track } from '../config/tracks'; // 修正: パスを正しく
import MusicCard from '@/components/Music/MusicCard'; // 追加

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export default function TrackList({ tracks, onSelectTrack }: TrackListProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {tracks.map((track) => (
        <div key={track.id} className="w-64">
          <MusicCard
            track={track}
            onSelect={onSelectTrack} // あれば通知して親で扱える
          />
        </div>
      ))}
    </div>
  );
}
