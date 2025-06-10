import type { KeyboardEvent } from "react";

export class CommonUtils {
  static isEnterKey = (e: KeyboardEvent<HTMLDivElement>) => {
    return [13, "Enter"].includes(e.key || e.keyCode || e.which);
  };
  static toggleFullscreen = (element: HTMLElement): boolean => {
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ("mozRequestFullScreen" in element) {
        (
          element as HTMLElement & { mozRequestFullScreen?: () => void }
        ).mozRequestFullScreen?.();
      } else if ("webkitRequestFullscreen" in element) {
        (
          element as HTMLElement & { webkitRequestFullscreen?: () => void }
        ).webkitRequestFullscreen?.();
      } else if ("msRequestFullscreen" in element) {
        (
          element as HTMLElement & { msRequestFullscreen?: () => void }
        ).msRequestFullscreen?.();
      }

      return true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen
      ) {
        (
          document as Document & { mozCancelFullScreen?: () => void }
        ).mozCancelFullScreen?.();
      } else if (
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen
      ) {
        (
          document as Document & { webkitExitFullscreen?: () => void }
        ).webkitExitFullscreen?.();
      } else if (
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen
      ) {
        (
          document as Document & { msExitFullscreen?: () => void }
        ).msExitFullscreen?.();
      }

      return false;
    }
  };
}
