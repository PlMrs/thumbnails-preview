import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';
import { togglePlay } from '@/utils/functions';

export const PlayPauseButton = ({ video }: Props) => {
  const { isPlaying, setIsPlaying } = useVideoStore();

  return (
    <button
      onClick={() => togglePlay(video, setIsPlaying)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
      </svg>
    </button>
  );
};
