'use client'; // ← この行を一番上に追加してください

import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import MusicCard from '@/components/MusicPage/MusicCard';

export default function Music() {
  // サンプルデータ
  const sampleSongs = [
    { songTitle: 'Sample Song 1', artistName: 'Artist 1' },
    { songTitle: 'Sample Song 2', artistName: 'Artist 2' },
    { songTitle: 'Sample Song 3', artistName: 'Artist 3' },
  ];

  return (
    <main className="p-8">
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <Button href="/" text="Back to Home" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/room" text="3D Room" />

        {/* サンプルカードを表示 */}
        {sampleSongs.map((song, index) => (
          <MusicCard 
            key={index}
            songTitle={song.songTitle}
            artistName={song.artistName}
            onSelect={() => console.log(`${song.songTitle} selected`)}
          />
        ))}
      </div>
    </main>
  );
}