export type TgetVideo = () => HTMLVideoElement;

export type TgetNeededElements = () => {
        progressContainer: HTMLElement
        progressBar: HTMLElement
        previewBox: HTMLElement
        previewVideo: HTMLVideoElement
        previewTime: HTMLElement
}

export type TpreviewContainerOnMouseMouve = (
    e: MouseEvent,
    elements: ReturnType<TgetNeededElements>
) => void;

export type TprogressContainerOnMouseMouveListener = (
    elements: ReturnType<TgetNeededElements>,
    video: HTMLVideoElement
) => void

export type TcreatePlayerContainer = () => HTMLDivElement

export type TinsertPlayerContainer = (
    playerContainer: ReturnType<TcreatePlayerContainer>,
    video: ReturnType<TgetVideo>
) => void