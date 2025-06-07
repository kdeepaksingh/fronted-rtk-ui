import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { MaterialUIPopper } from "../popover/MaterialUIPopper";

export const InlineConfirm = ({
  children,
  onConfirm = () => {},
  action = "delete",
  reset = 0,
}: {
  children: React.ReactNode;
  onConfirm?: () => void;
  action?: string;
  reset?: number;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [reset]);

  return (
    <>
      <div ref={ref} onClick={() => setOpen((ps) => !ps)}>
        {children}
      </div>
      <MaterialUIPopper anchorEl={ref.current} open={open}>
        <div className="bg-red-500 rounded text-white">
          <div className="text-sm px-4 py-2">
            Please confirm your action to <b className="capitalize">{action}</b>{" "}
            or cancel?
          </div>
          <div className="flex justify-end gap-2 px-4 py-2 w-full">
            <div>
              <Button
                size="small"
                onClick={() => setOpen(false)}
                className="!min-h-0 !text-xxs "
                color="inherit"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                size="small"
                className="!min-h-0 !text-xxs !text-upag-danger"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                color="inherit"
                variant="contained"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </MaterialUIPopper>
    </>
  );
};

// import InlineConfirm from "./components/InlineConfirm"; // adjust the path

// const MyComponent = () => {
//   const handleDelete = () => {
//     console.log("Item deleted!");
//     // Perform delete logic here
//   };

//   return (
//     <div className="p-4">
//       <InlineConfirm onConfirm={handleDelete} action="delete">
//         <button className="bg-red-500 text-white px-4 py-2 rounded">
//           Delete Item
//         </button>
//       </InlineConfirm>
//     </div>
//   );
// };

// export default MyComponent;
