import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';
import { useEffect } from 'react';

export const PlayPauseButton = ({ video }: Props) => {
  const {isPlaying, setIsPlaying} = useVideoStore();

  useEffect(() => {
    setIsPlaying(!video.paused);
  }, []);

  const togglePlay = () => {
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <button 
      onClick={togglePlay}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isPlaying ? (
        /* Icône Pause (Deux barres) */
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        /* Icône Play (Triangle) */
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};