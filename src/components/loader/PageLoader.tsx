import React from "react";
import { CircularProgress, LinearProgress } from "@mui/material";
import Condition from "../commons/Condition";
import Translate from "../typography/Translate";
import { RouterUtils } from "../../utils/RouterUtils";
import colors from "../../color";

interface PageLoaderProps {
  loading?: boolean;
  children?: React.ReactNode;
  type?: "CircularProgress" | "LinearProgress";
  title?: string;
  className?: string;
  props?: Record<string, any>;
  showLogo?: boolean;
  appendChildren?: boolean;
}

export const PageLoader = ({
  loading = true,
  children,
  type = "CircularProgress",
  title = "Loader.Loading",
  className = "",
  props = {},
  showLogo,
  appendChildren = true,
}: PageLoaderProps) => (
  <>
    <style>
      {`
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .jump-animation {
          animation: jump 0.6s ease-in-out infinite;
        }
      `}
    </style>

    <Condition show={loading}>
      <div className={`flex items-center justify-center p-8 min-h-screen -mt-12 ${className}`}>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <Condition show={showLogo}>
              <img
                alt="EMP LOGO"
                src={`${RouterUtils.AssestUrl}/svg/emp.svg`}
                className="jump-animation h-12"
              />
            </Condition>
          </div>

          <div>
            <Condition show={type === "CircularProgress"}>
              <CircularProgress
                sx={{ color: colors["ui-orange"] }}
                size={40}
                {...props}
              />
            </Condition>

            <Condition show={type === "LinearProgress"}>
              <LinearProgress
                sx={{ backgroundColor: colors["ui-orange"] }}
                className="mb-2"
                {...props}
              />
            </Condition>
          </div>

          <div className="mt-2 text-base font-medium">
            <Translate dataKey={title} />
          </div>
        </div>
      </div>
    </Condition>

    {(appendChildren && children) || null}
  </>
);

export default PageLoader;
