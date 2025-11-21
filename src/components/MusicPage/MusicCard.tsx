import React from 'react';

interface MusicCardProps {
  songTitle?: string;
  artistName?: string;
  onSelect?: () => void;  // 選択時のコールバック
}

export default function MusicCard({ songTitle, artistName, onSelect }: MusicCardProps) {
  return (
    <div onClick={onSelect}>
      <h3>{songTitle}</h3>
      <p>{artistName}</p>
    </div>
  );
}

// 使用例
<MusicCard 
  songTitle="Sample Song"
  artistName="Artist Name"
  onSelect={() => console.log('Selected')}
/>