import { Fade, Paper, Popper, Backdrop } from "@mui/material";

export const MaterialUIPopper = ({
  children,
  anchorEl,
  open = false,
}: {
  children: React.ReactNode;
  anchorEl: HTMLElement | null;
  open?: boolean;
}) => {
  return (
    <>
      <Popper
        placement="bottom-start"
        disablePortal={true}
        anchorEl={anchorEl}
        open={open}
        transition
        sx={{ zIndex: 1200 }}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: anchorEl,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="!rounded">{children}</Paper>
          </Fade>
        )}
      </Popper>
      <Backdrop open={open} className="z-[99]" invisible={true} />
    </>
  );
};
