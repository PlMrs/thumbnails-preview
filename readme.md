# Better Local Video Player

**Better Local Video Player** is a Firefox extension designed to enhance the native browser video player, specifically optimized for viewing **local video files** (`file://`). It replaces the basic default interface with a modern, feature-rich UI and adds essential productivity features like advanced keyboard shortcuts and progress persistence.

## 🚀 Features

### 🎮 Advanced Controls
* **Smart Play/Pause**: Toggle playback using the `Space` bar, the dedicated UI button, or by clicking anywhere on the video frame.
* **Keyboard Navigation**:
    * **Arrow Keys**: Jump forward or backward by 5 seconds with a visual feedback toast.
    * **Number Keys (0-9)**: Instantly seek to a specific percentage of the video (e.g., press `5` to go to 50% of the duration).
* **Custom Progress Bar**: A sleek, interactive progress bar with a real-time video preview tooltip and precise seek control.

### 💾 Smart Persistence
* **Progress Saving**: Automatically remembers your exact position in the video when you close the tab or refresh the page.
* **Auto-Resume**: When you reopen a local video file, the extension automatically seeks to your last position.
* **Context Buffer**: To help you get back into the story, the player resumes **5 seconds before** where you left off.
* **Safety Lock**: Prevents losing your place during accidental rapid page refreshes by requiring a minimum session time before updating the save.

## 🛠 Installation

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/better-local-video-player.git](https://github.com/your-username/better-local-video-player.git)
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Load it in Firefox**:
* Open Firefox and type ```about:debugging``` in the address bar.
* Click **"This Firefox"**.
* Click **"Load Temporary Add-on..."**.
* Select the ```manifest.json``` file from your ```dist``` folder.

**Note**: To use this extension with local files (```file://``` URLs), ensure you check the **"Allow access to file URLs"** box in the extension settings within the Firefox Add-ons Manager.

## 💻 Tech Stack
* **React & TypeScript**
* **Zustand** (State Management)
* **Vite** (Build Tool)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.