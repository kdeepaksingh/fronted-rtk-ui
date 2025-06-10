import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Text from "../../components/typography/Text";
import Url from "../../components/constants/Url";

export const SkiptoMainContent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const pageURLs =navigate(Url.Home);

  return (
    <div>
      {pageURLs.includes(pathname) && (
        <HashLink to={"#home"}>
          <Text
            text="Skip to main content"
            icon="VolumeUp"
            size={14}
            color="primary"
            className="font-semibold cursor-pointer"
          />
        </HashLink>
      )}
    </div>
  );
};
export default SkiptoMainContent;
