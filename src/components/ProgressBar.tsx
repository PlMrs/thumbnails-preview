import React, { useEffect, useRef } from 'react';
import { DomKeys } from '@/utils/constants';
import { useVideoStore } from '@/store/useVideoStore';
import type { Props } from '@/types/types';

export const ProgressBar = ({ video }: Props) => {
  const { progress, previewTime, previewPos, showPreview, setProgress, updatePreview } =
    useVideoStore();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [video, setProgress]);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const handleSeek = (e: React.MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
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
