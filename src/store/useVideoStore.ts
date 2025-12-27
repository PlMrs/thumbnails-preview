import { create } from 'zustand';

interface VideoState {
  isPlaying: boolean;
  isFullscreen: boolean;
  progress: number;
  previewTime: string;
  previewPos: number;
  showPreview: boolean;
  userActive: boolean;
  setIsPlaying: (playing: boolean) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  setProgress: (percent: number) => void;
  updatePreview: (show: boolean, pos: number, time?: string) => void;
  setUserActive: (active: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  isPlaying: true,
  isFullscreen: false,
  progress: 0,
  previewTime: '00:00',
  previewPos: 0,
  showPreview: false,
  userActive: false,
  setUserActive: (active) => set({ userActive: active }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  setProgress: (percent) => set({ progress: percent }),
  updatePreview: (show, pos, time) => 
    set((state) => ({ 
      showPreview: show, 
      previewPos: pos, 
      previewTime: time ?? state.previewTime 
    })),
}));