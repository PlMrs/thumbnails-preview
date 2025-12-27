import { DomKeys } from '../utils/constants'

export const VideoPlayer = () => {

    return (
      <div id={DomKeys.PROGRESSCONTAINER}>
        <div id={DomKeys.PROGRESSBAR}></div>
        <div id={DomKeys.PREVIEWBOX}>
            <video id={DomKeys.PREVIEWVIDEO} muted></video>
            <span id={DomKeys.PREVIEWTIME}>00:00</span>
        </div>
      </div>
    )
}