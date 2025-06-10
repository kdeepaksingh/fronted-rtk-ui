import Link from "../../../components/anchor/Link";
import Url from "../../../components/constants/Url";
import Icon from "../../../components/icon/Icon";
import Text from "../../../components/typography/Text";
import Translate from "../../../components/typography/Translate";
import ScreenReader from "../../screen-reader/ScreenReader";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="bg-sky-100 border-b-[2px] border-b-[#b47d7d] flex items-center gap-1 py-1 px-1">
        {/* <Link onClick={() => navigate(Url.Home)}> */}
          <Icon
            name="EmpMngIcon"
            className="w-[50px] h-[50px] ml-[5px] mr-[5px]"
          />
          <div className="text-[10px] w-48">
            <Translate dataKey="Typo.HomeIconDesc" htmlContent />
          </div>
        {/* </Link> */}
        <div className="w-full flex justify-end gap-4 pr-4 mb-2">
          <Text
            text={"Link.SkipToMainContent"}
            size={14}
            color="primary"
            className="font-semibold cursor-pointer"
          />
          <ScreenReader />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
