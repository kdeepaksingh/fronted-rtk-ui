import Link from "../../../components/anchor/Link";
import Url from "../../../components/constants/Url";
import Icon from "../../../components/icon/Icon";
import Text from "../../../components/typography/Text";
import Translate from "../../../components/typography/Translate";
import { AccessibilityTools } from "../../screen-reader/AccessibilityTools";
import ScreenReader from "../../screen-reader/ScreenReader";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";

const TopHeader = ({
  setMode,
}: {
  setMode: (mode: "light" | "dark") => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="bg-sky-100 border-b-[2px] border-b-[#b47d7d] flex items-center justify-between py-1 px-1">
        {/* Make Link contents inline with gap */}
        <Link
          onClick={() => navigate(Url.Home)}
          className="flex items-center gap-2"
        >
          <Icon
            name="EmpMngIcon"
            className="w-[50px] h-[50px] ml-[5px] mr-[5px]"
          />
          <div className="text-[10px] whitespace-nowrap">
            <Translate dataKey="Typo.HomeIconDesc" htmlContent />
          </div>
        </Link>

        <div className="flex items-center gap-4 pr-4">
          <Text
            text={"Link.SkipToMainContent"}
            size={14}
            color="primary"
            className="font-semibold cursor-pointer"
          />
          <ScreenReader />
          <DarkModeToggle setMode={setMode} />
          <AccessibilityTools />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
