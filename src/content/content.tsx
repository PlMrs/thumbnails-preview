import { createRoot } from 'react-dom/client';
import { VideoPlayer } from '../components/VideoPlayer';

import '@/style.css';

const init = () => {
  const video = document.querySelector('video');
  
  if (video && !document.getElementById('root')) {
    // 1. Créer un conteneur pour React
    const rootContainer = document.createElement('div');
    rootContainer.id = 'root';
    
    // 2. L'insérer près de la vidéo
    video.parentElement?.appendChild(rootContainer);

    // 3. Monter React
    const root = createRoot(rootContainer);
    root.render(<VideoPlayer />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // Le DOM est déjà prêt
  init();
}