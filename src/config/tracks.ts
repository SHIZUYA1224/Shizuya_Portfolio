export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // 秒
  category: string;
  genre: string;
};

export const TRACKS: Track[] = [
  {
    id: '001',
    title: 'Art Work',
    artist: 'SHIZUYA',
    coverUrl: '/covers/artwork.jpg',
    audioUrl: '/music/目覚め.mp3',
    duration: 191,
    category: 'DoPs',
    genre: 'Electronic',
  },
  {
    id: '002',
    title: 'Rain',
    artist: 'SHIZUYA',
    coverUrl: '/covers/rain.png',
    audioUrl: '/music/目覚めサビ.mp3',
    duration: 142,
    category: 'BGM',
    genre: 'LoFi',
  },
];
