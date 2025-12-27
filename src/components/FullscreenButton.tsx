import { useVideoStore } from '@/store/useVideoStore';
import { DomKeys } from '@/utils/constants';
import { useEffect } from 'react';

export const FullscreenButton = () => {
  const {isFullscreen, setIsFullscreen} = useVideoStore();

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setIsFullscreen]);

  const toggleFullscreen = () => {
    const playerContainer = document.getElementById(DomKeys.PLAYERCONTAINER);

    if (!document.fullscreenElement) {
      playerContainer?.requestFullscreen().catch(err => {
        console.error(`Erreur plein écran: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button 
      onClick={toggleFullscreen}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '8px' }}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        {isFullscreen ? (
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        ) : (
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        )}
      </svg>
    </button>
  );
};