import { useEffect } from 'react';
import { PlayPauseButton } from './PlayPauseButton';
import { ProgressBar } from './ProgressBar';
import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';
import { TimeLeft } from './TimeLeft';
import { FullscreenButton } from './FullscreenButton';
import { DomKeys } from '@/utils/constants';
import { togglePlay } from '@/utils/functions';

export const Controls = ({ video }: Props) => {
  const { setIsPlaying } = useVideoStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay(video, setIsPlaying);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id={DomKeys.CONTROLS}>
      <PlayPauseButton video={video} />
      <ProgressBar video={video} />
      <TimeLeft video={video} />
      <FullscreenButton />
    </div>
  );
};
