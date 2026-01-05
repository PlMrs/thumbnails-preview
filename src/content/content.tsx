import { createRoot } from 'react-dom/client';
import { getStorageKey, getVideo, saveVideoProgress, syncVideoProgress } from '@/utils/functions';
import { VideoPlayer } from '@/components/VideoPlayer';
import { DomKeys } from '@/utils/constants';

import '@/style.css';

const init = () => {
  const video = getVideo();
  if (!video) throw new Error('No video element found on the page.');

  video.controls = false;

  syncVideoProgress(video);

  const loadTimestamp = Date.now();
  window.addEventListener('beforeunload', () => {
    const now = Date.now();
    const secondsElapsedSinceLoad = (now - loadTimestamp) / 1000;
    if (secondsElapsedSinceLoad > 5) {
      if (video.currentTime < video.duration - 2) {
        saveVideoProgress(video.currentTime);
      } else {
        localStorage.removeItem(getStorageKey());
      }
    }
  });

  const originalParent = video.parentElement;

  if (!document.getElementById(DomKeys.PLAYERCONTAINER)) {
    const rootContainer = document.createElement('div');
    rootContainer.id = 'root';

    originalParent?.appendChild(rootContainer);

    const root = createRoot(rootContainer);
    root.render(<VideoPlayer video={video} />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
