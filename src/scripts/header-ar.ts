/**
 * Header AR functionality - Client-side script
 * Uses the AR viewer utility with proper npm package integration
 */

import { activateARForModel } from "../utils/ar-viewer";

// Video initialization function
function initializeVideo(): void {
  const videoElement = document.querySelector(
    "#headerVideo"
  ) as HTMLVideoElement;
  const screenWidth = window.innerWidth;

  if (screenWidth > 560 && videoElement) {
    const sources = [
      { src: "./videos/main-video.mp4", type: "video/mp4" },
      { src: "./videos/main-video.webm", type: "video/webm" },
      { src: "./videos/main-video.ogv", type: "video/ogg" },
    ];

    sources.forEach((source) => {
      const sourceElement = document.createElement("source");
      sourceElement.src = source.src;
      sourceElement.type = source.type;
      videoElement.appendChild(sourceElement);
    });
  } else if (videoElement) {
    videoElement.remove();
  }
}

// AR button initialization
function initializeARButton(): void {
  const arButton = document.querySelector(
    "#headerArButton"
  ) as HTMLButtonElement;

  if (!arButton) {
    console.warn("AR button not found");
    return;
  }

  arButton.addEventListener("click", async () => {
    try {
      // Show loading state
      arButton.disabled = true;
      const originalContent = arButton.innerHTML;
      arButton.innerHTML = "<span>Loading AR...</span>";

      // Activate AR
      await activateARForModel(
        "./3d/products/Rockfoil_DARKGOLD_3D_vertical.glb"
      );

      // Restore button state
      arButton.disabled = false;
      arButton.innerHTML = originalContent;
    } catch (error) {
      console.error("AR activation failed:", error);

      // Show error state
      arButton.innerHTML = "<span>AR Failed</span>";

      // Reset after 2 seconds
      setTimeout(() => {
        arButton.disabled = false;
        arButton.innerHTML = "<span>Zobraz u mňe doma</span><svg>...</svg>"; // Restore original
      }, 2000);
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeVideo();
  initializeARButton();
});
