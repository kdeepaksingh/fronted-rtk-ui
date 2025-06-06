import { Button } from "@mui/material";
import Translate from "../typography/Translate";

export const AdditionalContent = ({ onClick = () => {} }) => {
  return (
    <div className="mt-4 bg-ui-light absolute bottom-0 w-full">
      <Button variant={"text"} onClick={onClick} className="w-full" fullWidth>
        <Translate dataKey={"Action.Add"} />
      </Button>
    </div>
  );
};

export default AdditionalContent;
