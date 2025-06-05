import { ButtonGroup as BtnGroup } from "@mui/material";
import Translate from "../typography/Translate";
import MainButton from "./MainButton";

type Action = {
  text: string;
  [key: string]: any;
};

interface ButtonGroupProps {
  actions?: Action[];
}

export const ButtonGroup = ({ actions = [] }: ButtonGroupProps) => {
  return actions.map((props, index) => {
    if (typeof props !== "object" || props === null) return null;
    return (
      <BtnGroup key={`${index}`} className="last:-mr-2">
        <MainButton {...props} key={`${index}`} className="!mr-1">
          <Translate dataKey={props.text} />
        </MainButton>
      </BtnGroup>
    );
  });
};

export default ButtonGroup;
