import { useEffect } from 'react';
import type { FC } from 'react';
import { PlayPauseButton } from './PlayPauseButton';
import { ProgressBar } from './ProgressBar';
import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';
import { TimeLeft } from './TimeLeft';
import { FullscreenButton } from './FullscreenButton';
import { DomKeys } from '@/utils/constants';
import { handleKeyDown } from '@/utils/functions';

export const Controls: FC<Props> = ({ video }) => {
  const { setIsPlaying, setTimeSkip } = useVideoStore();

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e, video, setIsPlaying, setTimeSkip));
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
