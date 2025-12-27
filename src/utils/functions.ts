import type { VideoState } from "@/store/useVideoStore";
import type { TgetVideo } from "@/types/types";


export const getVideo:TgetVideo = () => {
    const video = document.querySelector('video');
    if(!video) throw new Error('No video found');

    return video
}

export const togglePlay = (video: HTMLVideoElement, setIsPlaying: VideoState['setIsPlaying'] ) => {
    if (video.paused) {
        video.play();
        setIsPlaying(true);
    } else {
        video.pause();
        setIsPlaying(false);
    }
}