import { useEffect, useRef, useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { DomKeys } from '@/utils/constants';
import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';
import { saveVideoProgress } from '@/utils/functions';
import { SkipToast } from './SkipToast';

export const ProgressBar: FC<Props> = ({ video }) => {
  const [displaySkip, setDisplaySkip] = useState<{ val: string; id: number } | null>(null);

  const { progress, previewTime, previewPos, showPreview, timeSkip, setProgress, updatePreview } =
    useVideoStore();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    if (!timeSkip) return;

    const label = timeSkip.type === '+' ? '+5s' : '-5s';
    setDisplaySkip({ val: label, id: Date.now() });

    const timer = setTimeout(() => {
      setDisplaySkip(null);
    }, 800);

    return () => clearTimeout(timer);
  }, [timeSkip]);

  useEffect(() => {
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [video, setProgress]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max(0, x / rect.width), 1);

    const time = percent * video.duration;

    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = time;
    }

    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    updatePreview(true, x, `${mins}:${secs}`);
  };

  const handleSeek = (e: MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
    saveVideoProgress(video.currentTime);
  };

  return (
    <div
      id={DomKeys.PROGRESSCONTAINER}
      ref={progressBarRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => updatePreview(false, 0)}
      onClick={handleSeek}
      style={{ position: 'relative' }}
    >
      <div id={DomKeys.PROGRESSBAR} style={{ transform: `scaleX(${progress / 100})` }} />

      {/* LA BULLE ANIMÉE */}
      {displaySkip && (
        <SkipToast key={displaySkip.id} value={displaySkip.val} progress={progress} />
      )}

      <div
        id={DomKeys.PREVIEWBOX}
        style={{
          display: showPreview ? 'flex' : 'none',
          position: 'absolute',
          left: `${previewPos}px`,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        <video ref={previewVideoRef} id={DomKeys.PREVIEWVIDEO} src={video.currentSrc} muted />
        <span id={DomKeys.PREVIEWTIME}>{previewTime}</span>
      </div>
    </div>
  );
};
