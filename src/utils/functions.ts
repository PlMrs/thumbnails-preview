import { TcreatePlayerContainer, TgetNeededElements, TgetVideo, TinsertPlayerContainer } from "@/types/types";
import { DomKeys } from "./constants";


export const getVideo:TgetVideo = () => {
    const video = document.querySelector('video');
    if(!video) throw new Error('No video found');

    return video
}

export const getNeededElements: TgetNeededElements = () => {
    const progressContainer = document.getElementById(DomKeys.PROGRESSCONTAINER);
    const progressBar = document.getElementById(DomKeys.PROGRESSBAR);
    const previewBox = document.getElementById(DomKeys.PREVIEWBOX);
    const previewVideo = document.getElementById(DomKeys.PREVIEWVIDEO) as HTMLVideoElement;
    const previewTime = document.getElementById(DomKeys.PREVIEWTIME);

    if(!progressContainer) throw new Error('no progress container found');
    if(!progressBar) throw new Error('no progress bar found');
    if(!previewBox) throw new Error('no preview box found');
    if(!previewVideo) throw new Error('no preview video found');
    if(!previewTime) throw new Error('no preview time found');
    

    return {
        progressContainer,
        progressBar,
        previewBox,
        previewVideo,
        previewTime
    }
}

export const createPlayerContainer: TcreatePlayerContainer  = () => {
    const playerContainer = document.createElement('div');
    playerContainer.id = DomKeys.PLAYERCONTAINER;

    const controls = document.createElement('div');
    controls.id = DomKeys.CONTROLS;

    const progressContainer = document.createElement('div');
    progressContainer.id = DomKeys.PROGRESSCONTAINER;

    const progressBar = document.createElement('div');
    progressBar.id = DomKeys.PROGRESSBAR;

    const previewBox = document.createElement('div');
    previewBox.id = DomKeys.PREVIEWBOX;

    const previewVideo = document.createElement('video');
    previewVideo.id = DomKeys.PREVIEWVIDEO
    previewVideo.muted = true;

    const previewTime = document.createElement('span');
    previewTime.id = DomKeys.PREVIEWTIME
    previewTime.innerText = '00:00';

    // insert previewTime and previewVideo inside the preview box
    previewBox.appendChild(previewVideo);
    previewBox.appendChild(previewTime);

    // insert the progress bar and the preview box inside progress container
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(previewBox);

    //insert the progress container inside controls
    controls.appendChild(progressContainer)

    // insert controls inside player container
    playerContainer.appendChild(controls);

    return playerContainer;
}

export const insertPlayerContainer:TinsertPlayerContainer = (playerContainer, video) => {
    if(!video.parentNode) throw new Error('no parent node');

    video.parentNode.insertBefore(playerContainer, video);
    playerContainer.appendChild(video);
}