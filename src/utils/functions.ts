import type { TgetVideo } from "@/types/types";


export const getVideo:TgetVideo = () => {
    const video = document.querySelector('video');
    if(!video) throw new Error('No video found');

    return video
}