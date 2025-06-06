import { InputLabel as Label } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from "../tooltip/Tooltip";
import Translate from "../typography/Translate";

interface InputLabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
  params?: Record<string, any>;
  className?: string;
  tooltip?: string;
}

export const InputLabel = ({
  label,
  required = false,
  htmlFor = "",
  params = {},
  className,
  tooltip = ""
}: InputLabelProps) =>
  (label && (
    <Label
      className={`capitalize !font-normal !leading-8  -mb-2 ${className}`}
      htmlFor={htmlFor}
      shrink
    >
      <Translate dataKey={label} params={params} required={required} />
     {tooltip &&  <Tooltip title={tooltip}><InfoOutlinedIcon/></Tooltip>}
    </Label>
  )) ||
  null;

export default InputLabel;
