import { Divider, Card as UICard } from "@mui/material";
import { isString } from "lodash";
import Text from "../typography/Text";
import Condition from "../commons/Condition";

interface LightCardProps {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  divider?: boolean;
  className?: string;
  [key: string]: unknown;
}

export const LightCard = ({
  title,
  children,
  divider = false,
  className,
  ...props
}: LightCardProps) => {
  return (
    <UICard {...props} className="!shadow-none bg-white h-full">
      <div className={`py-5 px-5 h-full ${className}`}>
        <Condition show={!!(title && isString(title))}>
          <Text
            text={isString(title) ? title : undefined}
            size={13}
            className="font-semibold"
          />
        </Condition>
        <Condition show={!!(title && !isString(title))}>{title}</Condition>

        {divider && <Divider className="!border-blue-07" sx={{ my: "10px" }} />}
        <div>{children}</div>
      </div>
    </UICard>
  );
};

export default LightCard;

// import React from "react";
// import LightCard from "../components/LightCard"; // adjust import path

// const ExampleLightCard: React.FC = () => {
//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <LightCard title="User Info" divider>
//         <p className="text-sm text-gray-600 mb-2">Name: John Doe</p>
//         <p className="text-sm text-gray-600">Email: john@example.com</p>
//       </LightCard>
//       <LightCard
//         title={
//           <div className="text-lg text-blue-700 font-bold">Profile Summary</div>
//         }
//         divider
//       >
//         <p className="text-sm">Custom header with ReactNode</p>
//       </LightCard>
//     </div>
//   );
// };

// export default ExampleLightCard;
