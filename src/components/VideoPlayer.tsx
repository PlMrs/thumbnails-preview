import { useEffect, useRef } from "react";
import type { Props } from "@/types/types";
import { Controls } from "./Controls";
import { DomKeys } from "@/utils/constants";
import { useVideoStore } from "@/store/useVideoStore";

export const VideoPlayer = ({ video }: Props) => {
    const videoSlotRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { isPlaying, userActive, setUserActive } = useVideoStore();

    const handleActivity = () => {
        setUserActive(true);
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (isPlaying) {
            timeoutRef.current = setTimeout(() => {
                setUserActive(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (videoSlotRef.current && video) {
            videoSlotRef.current.appendChild(video);
        }

        const videoSlot = videoSlotRef.current;
        if (videoSlot) {
            videoSlot.addEventListener('mousemove', handleActivity);
        }

        return () => {
            if (videoSlot) videoSlot.removeEventListener('mousemove', handleActivity);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [video, isPlaying]);

    return (
        <div id={DomKeys.PLAYERCONTAINER} className={userActive ? "user-active" : "user-inactive"}>
            <div ref={videoSlotRef} id="video-slot" />
            <Controls video={video} />
        </div>
    );
};