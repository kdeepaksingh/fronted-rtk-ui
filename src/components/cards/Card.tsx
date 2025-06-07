import { CardHeader, Card as UICard } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { ExpandButton } from "../buttons/ExpandButton";
import type { CardHeaderProps } from "@mui/material/CardHeader";

export const Card = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <UICard {...props}>
      <div className="py-4 px-8">{children}</div>
    </UICard>
  );
};

interface ExpandCardHeaderProps extends CardHeaderProps {
  expand: boolean;
  className?: string;
  actions?: React.ReactNode[];
}

export const ExpandCardHeader = (props: ExpandCardHeaderProps) => {
  const { expand, className, actions = [], ...other } = props;
  const expandClasses = expand
    ? " bg-gray-50 border-b border-ui-border-color"
    : "";

  return (
    <CardHeader
      {...other}
      titleTypographyProps={{
        variant: "subtitle2",
      }}
      className={`${expandClasses} ${className} cursor-pointer !py-1`}
      action={[
        ...actions,
        <ExpandButton expand={expand} key={"expand"} color="inherit">
          <ExpandMore />
        </ExpandButton>,
      ]}
    />
  );
};

export default Card;

// import React, { useState } from "react";
// import { Card, ExpandCardHeader } from "../components/Card"; // adjust path as needed
// import { Typography, Collapse } from "@mui/material";

// const DemoCardComponent: React.FC = () => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded((prev) => !prev);
//   };

//   return (
//     <Card>
//       <ExpandCardHeader
//         title="Expandable Card"
//         expand={expanded}
//         onClick={handleExpandClick}
//       />

//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <Typography variant="body2" className="mt-2 text-gray-700">
//           This is the expanded content of the card. You can place any custom content here like text, forms, or other components.
//         </Typography>
//       </Collapse>
//     </Card>
//   );
// };

// export default DemoCardComponent;
