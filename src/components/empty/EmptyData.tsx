import { CircularProgress } from "@mui/material";

import type { ReactNode } from "react";
import Condition from "../commons/Condition";
import Icon from "../icon/Icon";
import Translate from "../typography/Translate";

interface EmptyDataProps {
  icon?: string;
  text?: string;
  loadingText?: string;
  children?: ReactNode;
  onEmptyIcon?: boolean;
  h?: string;
  loading?: boolean;
  center?: boolean;
}

export const EmptyData = ({
  icon = "EmptyData",
  text = "",
  loadingText = "Loader.Loading",
  children,
  onEmptyIcon = true,
  h = "h-36",
  loading = false,
  center = false,
}: EmptyDataProps) => (
  <div className={`flex ${h} items-center justify-center flex-row w-full`}>
    <div className={`${center && "flex justify-center items-center flex-col"}`}>
      <Condition show={onEmptyIcon && !loading}>
        <Icon name={icon} style={{ height: 50, width: 50 }} />
      </Condition>
      <Condition show={loading}>
        <CircularProgress size={20} color={"primary"} />
      </Condition>
      <div className="text-sm ">
        <Condition show={!loading}>
          <Translate dataKey={text} />
        </Condition>
        <Condition show={loading}>
          <Translate dataKey={loadingText} />
        </Condition>
      </div>
    </div>
    <Condition show={!loading}>
      <div className="ml-2">{children}</div>
    </Condition>
  </div>
);

export default EmptyData;
