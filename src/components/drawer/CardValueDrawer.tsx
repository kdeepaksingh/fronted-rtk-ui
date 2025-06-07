import { useState } from "react";
import { Chip } from "@mui/material";
import { ValueDrawer } from "./ValueDrawer";

export const CardValueDrawer = ({
  title = "",
  value = "",
  data = [],
  dataKey,
}: {
  title?: string;
  value?: string;
  data?: Array<Record<string, unknown>>;
  dataKey: string;
}) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Chip
        clickable
        onClick={() => setOpen(true)}
        label={
          <div className="flex items-center gap-2">
            <div className="text-xs ">{title}:</div>

            <div className="font-bold ">{value}</div>
          </div>
        }
      ></Chip>
      {(data.length && (
        <ValueDrawer
          open={open}
          onClose={onClose}
          data={data.map((item) =>
            Object.fromEntries(
              Object.entries(item).map(([key, value]) => [key, String(value)])
            )
          )}
          dataKey={dataKey}
        />
      )) ||
        null}
    </>
  );
};
