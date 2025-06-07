import { IconButton, styled } from "@mui/material";

interface ExpandButtonProps {
  expand: boolean;
  [key: string]: unknown;
}

export const ExpandButton = styled((props: ExpandButtonProps) => {
  return <IconButton {...props} component="button" />;
})(
  ({
    theme,
    expand,
  }: {
    theme: import("@mui/material/styles").Theme;
    expand: boolean;
  }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  })
);
