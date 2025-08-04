/**
 * AR Viewer utility using @google/model-viewer npm package
 * Provides cross-platform AR functionality for 3D models
 */

// Import the model-viewer library
import "@google/model-viewer";

// Type definitions for model-viewer
interface ModelViewerElement extends HTMLElement {
  src: string;
  ar: boolean;
  arScale: string;
  arModes: string;
  cameraControls: boolean;
  touchAction: string;
  cameraOrbit: string;
  activateAR(): Promise<void>;
  canActivateAR: boolean;
}

export class ARViewer {
  private modelPath: string;
  private modelViewer: ModelViewerElement | null = null;

  constructor(modelPath: string) {
    this.modelPath = modelPath;
  }

  /**
   * Initialize and activate AR view
   */
  public async activateAR(): Promise<void> {
    try {
      // Create model-viewer element
      this.modelViewer = document.createElement(
        "model-viewer"
      ) as ModelViewerElement;

      // Configure model-viewer properties
      this.configureModelViewer();

      // Add to DOM (hidden)
      this.hideElement();
      document.body.appendChild(this.modelViewer);

      // Wait for model to load
      await this.waitForModelLoad();

      // Check if AR is available
      if (!this.modelViewer?.canActivateAR) {
        throw new Error("AR is not available on this device");
      }

      // Activate AR
      await this.modelViewer.activateAR();

      // Schedule cleanup
      this.scheduleCleanup();
    } catch (error) {
      console.error("Failed to activate AR:", error);
      this.cleanup();
      throw error;
    }
  }

  /**
   * Configure model-viewer element properties
   */
  private configureModelViewer(): void {
    if (!this.modelViewer) return;

    // Set source
    this.modelViewer.src = this.modelPath;

    // Enable AR
    this.modelViewer.ar = true;
    this.modelViewer.arScale = "auto";
    this.modelViewer.arModes = "webxr scene-viewer quick-look";

    // Configure camera
    this.modelViewer.cameraControls = true;
    this.modelViewer.touchAction = "pan-y";
    this.modelViewer.cameraOrbit = "0deg 90deg 2.5m";

    // Set additional attributes
    this.modelViewer.setAttribute("ar", "");
    this.modelViewer.setAttribute("ar-scale", "auto");
    this.modelViewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
    this.modelViewer.setAttribute("camera-controls", "");
    this.modelViewer.setAttribute("touch-action", "pan-y");
    this.modelViewer.setAttribute("camera-orbit", "0deg 90deg 2.5m");
  }

  /**
   * Hide the model-viewer element
   */
  private hideElement(): void {
    if (!this.modelViewer) return;

    this.modelViewer.style.position = "fixed";
    this.modelViewer.style.top = "-9999px";
    this.modelViewer.style.left = "-9999px";
    this.modelViewer.style.width = "1px";
    this.modelViewer.style.height = "1px";
    this.modelViewer.style.opacity = "0";
    this.modelViewer.style.pointerEvents = "none";
    this.modelViewer.style.visibility = "hidden";
  }

  /**
   * Wait for model to load
   */
  private async waitForModelLoad(): Promise<void> {
    if (!this.modelViewer) throw new Error("Model viewer not initialized");

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Model load timeout"));
      }, 10000); // 10 second timeout

      const checkReady = () => {
        if (
          this.modelViewer &&
          typeof this.modelViewer.activateAR === "function"
        ) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };

      // Start checking immediately
      checkReady();

      // Also listen for load event
      this.modelViewer?.addEventListener(
        "load",
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true }
      );

      // Listen for error event
      this.modelViewer?.addEventListener(
        "error",
        (error) => {
          clearTimeout(timeout);
          reject(error);
        },
        { once: true }
      );
    });
  }

  /**
   * Schedule cleanup after AR session
   */
  private scheduleCleanup(): void {
    // Clean up after 3 seconds
    setTimeout(() => {
      this.cleanup();
    }, 3000);
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    if (this.modelViewer && document.body.contains(this.modelViewer)) {
      document.body.removeChild(this.modelViewer);
    }
    this.modelViewer = null;
  }

  /**
   * Check if AR is supported on current device
   */
  public static async isARSupported(): Promise<boolean> {
    try {
      // Create temporary model-viewer to check AR support
      const tempViewer = document.createElement(
        "model-viewer"
      ) as ModelViewerElement;
      tempViewer.style.display = "none";
      document.body.appendChild(tempViewer);

      // Wait a moment for initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      const supported = tempViewer.canActivateAR;

      // Cleanup
      document.body.removeChild(tempViewer);

      return supported;
    } catch {
      return false;
    }
  }
}

/**
 * Utility function to quickly activate AR for a model
 */
export async function activateARForModel(modelPath: string): Promise<void> {
  const viewer = new ARViewer(modelPath);
  await viewer.activateAR();
}

/**
 * Initialize AR button functionality
 */
export function initializeARButton(
  buttonSelector: string,
  modelPath: string
): void {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(buttonSelector) as HTMLButtonElement;

    if (!button) {
      console.warn(`AR button not found: ${buttonSelector}`);
      return;
    }

    button.addEventListener("click", async () => {
      try {
        // Show loading state
        button.disabled = true;
        const originalText = button.textContent || "Zobraz u mě doma";
        button.textContent = "Loading AR...";

        // Activate AR
        await activateARForModel(modelPath);

        // Restore button state
        button.disabled = false;
        button.textContent = originalText;
      } catch (error) {
        console.error("AR activation failed:", error);

        // Show error state
        button.disabled = false;
        const currentText = button.textContent || "";
        button.textContent = currentText.replace("Loading AR...", "AR Failed");

        // Reset text after 2 seconds
        setTimeout(() => {
          const buttonText = button.textContent || "";
          if (buttonText.includes("AR Failed")) {
            button.textContent = "Zobraz u mě doma";
          }
        }, 2000);
      }
    });
  });
}
