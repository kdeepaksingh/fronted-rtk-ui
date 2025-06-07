import Condition from "../commons/Condition";
import StringToHtml from "./StringToHtml";
import Translate from "./Translate";

interface TextCardProps {
  title?: string;
  description?: string;
  translate?: boolean | number;
}

export const TextCard = ({
  title = "",
  description = "",
  translate = false,
}: TextCardProps) => {
  return (
    <div>
      <div className="text-xs text-upag-black uppercase ">
        <Translate dataKey={title} />
      </div>
      <div className="text-sm text-upag-black font-semibold">
        <Condition show={!!translate}>
          <Translate dataKey={description} />
        </Condition>
        <Condition show={!translate || translate === -1}>
          <StringToHtml text={description || "--"} />
        </Condition>
      </div>
    </div>
  );
};
