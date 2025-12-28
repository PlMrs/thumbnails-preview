export type TgetVideo = () => HTMLVideoElement;

export interface Props {
  video: HTMLVideoElement;
}

export type SkipToastProps = {
  value: string;
  progress: number;
};
