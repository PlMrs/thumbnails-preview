import { createRoot } from 'react-dom/client';
import { VideoPlayer } from '../components/VideoPlayer';

const init = () => {
  const video = document.querySelector('video');
  
  if (video && !document.getElementById('my-react-root')) {
    // 1. Créer un conteneur pour React
    const rootContainer = document.createElement('div');
    rootContainer.id = 'my-react-root';
    
    // 2. L'insérer près de la vidéo
    video.parentElement?.appendChild(rootContainer);

    // 3. Monter React
    const root = createRoot(rootContainer);
    root.render(<VideoPlayer />);
  }
};

// Attendre que la page soit prête
setTimeout(init, 1000);