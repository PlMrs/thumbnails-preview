import { TgetNeededElements, TprogressContainerOnMouseMouveListener } from "@/types/types";
import { getNeededElements } from "./functions";

export const spaceBarListener = (video: HTMLVideoElement) => window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();

    return video.paused ? video.play() : video.pause();
  }
});

export const progressContainerOnMouseMouveListener: TprogressContainerOnMouseMouveListener = (elements, video) => {

    const {
        progressContainer,
        previewBox,
        previewVideo,
        previewTime
    } = elements
    
    return progressContainer.addEventListener('mousemove', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const targetTime = percent * video.duration;

    // Afficher la box
    previewBox.style.display = 'block';
    previewBox.style.left = `${e.clientX - rect.left}px`;

    // Mise à jour preview
    previewVideo.currentTime = targetTime;
    
    // Formatage du temps
    const mins = Math.floor(targetTime / 60);
    const secs = Math.floor(targetTime % 60);
    previewTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
});}