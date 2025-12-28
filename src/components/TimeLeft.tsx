import { useEffect, useState } from 'react';
import type { Props } from '@/types/types';
import { DomKeys } from '@/utils/constants';
import type { FC } from 'react';

export const TimeLeft: FC<Props> = ({ video }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => setCurrentTime(video.currentTime);

  useEffect(() => {
    video.addEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const formatSmartTime = (timeInSeconds: number) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = Math.floor(timeInSeconds % 60);

    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  };

  return (
    <div id={DomKeys.TIMELEFT} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <span className="current-time">{formatSmartTime(currentTime)}</span>
      <span className="separator">/</span>
      <span className="total-time">{formatSmartTime(video.duration)}</span>
    </div>
  );
};
