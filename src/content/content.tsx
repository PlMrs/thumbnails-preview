import { createRoot } from 'react-dom/client';
import { getVideo } from '@/utils/functions';
import { VideoPlayer } from '@/components/VideoPlayer';
import { DomKeys } from '@/utils/constants';

import '@/style.css';

const init = () => {
  const video = getVideo();
  if (!video) return;

  video.controls = false;

  const originalParent = video.parentElement;

  if (video && !document.getElementById(DomKeys.PLAYERCONTAINER)) {
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
