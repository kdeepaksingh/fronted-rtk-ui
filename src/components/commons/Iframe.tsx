import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Zoom } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import PageLoader from "../loader/PageLoader";
import Translate from "../typography/Translate";
import Condition from "./Condition";
import { CommonUtils } from "../../utils/CommonUtils";
import type { RootState } from "../../store/store";

interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  title?: string;
  showFocusMode?: boolean;
}

export const Iframe: React.FC<IframeProps> = ({
  title = "EMP MNG",
  showFocusMode = true,
  ...rest
}) => {
  const iframeZoomLevel = useSelector(
    (state: RootState) => state.global.iframeZoomLevel // update based on your state structure
  );

  const [loading, setLoading] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const iRef = useRef<HTMLIFrameElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const resizeIframe = () => {
    setLoading(false);
  };

  useEffect(() => {
    const iframe = iRef.current;
    const fullscreenListener = () => {
      if (!document.fullscreenElement) {
        setFullScreen(false);
      }
    };

    if (iframe) {
      iframe.onload = resizeIframe;
    }

    document.addEventListener("fullscreenchange", fullscreenListener);

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", resizeIframe);
      }
      document.removeEventListener("fullscreenchange", fullscreenListener);
    };
  }, []);

  const toggleFullScreen = () => {
    setFullScreen(CommonUtils.toggleFullscreen(zoomRef.current as HTMLElement));
  };

  return (
    <div
      className={`relative h-full ${isFullScreen ? "bg-white p-4" : ""}`}
      ref={zoomRef}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <PageLoader
        loading={loading}
        className="!min-h-full !p-0 !m-0 bg-white rounded"
      />

      <iframe
        title={title}
        {...rest}
        ref={iRef}
        style={{
          ...(loading ? { display: "none" } : {}),
          ...(rest.style || {}),
          zoom: iframeZoomLevel,
        }}
      />

      <Condition show={!loading && showFocusMode}>
        <div
          className={`absolute ${
            !isFullScreen ? "bottom-2 right-3" : "top-1 w-full text-center"
          } hidden md:block`}
        >
          <Zoom in={showZoom} unmountOnExit>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={toggleFullScreen}
              className="!text-xxxs !min-h-0"
              disableElevation
            >
              <Condition show={isFullScreen}>
                <VisibilityOff className="mr-1 !text-xs" />
                <Translate dataKey="Typo.ExitFocusMode" />
              </Condition>
              <Condition show={!isFullScreen}>
                <Visibility className="mr-1 !text-xs" />
                <Translate dataKey="Typo.FocusMode" />
              </Condition>
            </Button>
          </Zoom>
        </div>
      </Condition>
    </div>
  );
};

export default Iframe;

// import { useSelector, useDispatch } from "react-redux";
// import type { RootState, AppDispatch } from "../store"; // adjust import path
// import { setIframeZoomLevel } from "../store/slices/globalSlice";

// // inside component
// const zoomLevel = useSelector((state: RootState) => state.global.iframeZoomLevel);
// const dispatch = useDispatch<AppDispatch>();

// // Example to update zoom level:
// dispatch(setIframeZoomLevel(1.25));
