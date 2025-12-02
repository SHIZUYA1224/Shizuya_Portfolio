// src/components/TrackList.tsx
'use client';

import type { Track } from '../config/tracks'; // 修正: パスを正しく

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export default function TrackList({ tracks, onSelectTrack }: TrackListProps) {
  // 修正: propsに型を追加
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
      {tracks.map((track) => (
        <div
          key={track.id}
          onClick={() => onSelectTrack(track)}
          style={{
            width: 120,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          <img
            src={track.coverUrl}
            style={{ width: '100%', borderRadius: 6 }}
            alt=""
          />
          <div style={{ marginTop: 6 }}>{track.title}</div>
        </div>
      ))}
    </div>
  );
}
