import { progressContainerOnMouseMouveListener, spaceBarListener } from "@/utils/listeners";
import { createPlayerContainer, getNeededElements, getVideo, insertPlayerContainer } from "@/utils/functions";

import '../style.css';

const video = getVideo();

// Initiate listeners
spaceBarListener(video);

// 1. Désactiver les contrôles natifs
video.controls = false;

// 2. Créer l'interface
const playerContainer = createPlayerContainer();

// On insère le conteneur juste avant la vidéo dans le DOM
insertPlayerContainer(playerContainer,video);

const elements = getNeededElements();

const {previewVideo, progressBar, progressContainer, previewBox, previewTime} = elements


// Configurer la source de la preview
previewVideo.src = video.currentSrc || window.location.href;

// 3. Logique de mise à jour de la barre
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + '%';
});

// 4. Logique du Hover (Précision 100%)
progressContainerOnMouseMouveListener(elements, video);

progressContainer.addEventListener('mouseleave', () => {
    previewBox.style.display = 'none';
});

// 5. Cliquer pour chercher (Seek)
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
});

// Toggle Play/Pause au clic sur la vidéo
video.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
});