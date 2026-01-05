import type { VideoState } from '@/store/useVideoStore';
import type { TgetVideo } from '@/types/types';

export const getVideo: TgetVideo = () => {
  const video = document.querySelector('video');
  if (!video) throw new Error('No video found');

  return video;
};

export const togglePlay = (video: HTMLVideoElement, setIsPlaying: VideoState['setIsPlaying']) => {
  if (video.paused) {
    video.play();
    setIsPlaying(true);
  } else {
    video.pause();
    setIsPlaying(false);
  }
};

export const handleKeyDown = (
  e: KeyboardEvent,
  video: HTMLVideoElement,
  setIsPlaying: VideoState['setIsPlaying'],
  setTimeSkip: VideoState['setTimeSkip']
) => {
  switch (e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay(video, setIsPlaying);
      break;
    case 'ArrowRight':
      e.preventDefault();
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
      setTimeSkip('+');
      break;
    case 'ArrowLeft':
      e.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
      setTimeSkip('-');
      break;
    case 'Digit0':
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
      e.preventDefault();
      const num = parseInt(e.code.replace('Digit', ''), 10);
      const percent = num * 0.1;
      video.currentTime = percent * video.duration;
      break;
    default:
      break;
  }
};

export const getStorageKey = () => `video_progress_${window.location.href}`;

export const syncVideoProgress = (video: HTMLVideoElement) => {
  const storageKey = getStorageKey();
  const savedTime = localStorage.getItem(storageKey);
  if (savedTime) {
    const time = parseFloat(savedTime);

    video.addEventListener(
      'loadedmetadata',
      () => {
        video.currentTime = time;
      },
      { once: true }
    );

    if (video.readyState >= 1) {
      video.currentTime = time;
    }
  }
};

export const saveVideoProgress = (currentTime: number) => {
  const storageKey = getStorageKey();
  const timeToSave = currentTime < 5 ? 0 : currentTime - 5;
  localStorage.setItem(storageKey, timeToSave.toString());
};
