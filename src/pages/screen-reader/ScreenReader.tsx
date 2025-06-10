import { useNavigate } from "react-router-dom";
import Url from "../../components/constants/Url";
import { CommonUtils } from "../../utils/CommonUtils";
import Text from "../../components/typography/Text";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";

export const ScreenReader = () => {
  const navigate = useNavigate();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  return (
    <div className="flex">
      <div
        className="flex mx-0 sm:mx-3 items-center cursor-pointer"
        onClick={() => navigate(Url.ScreenReaderAccess)}
        onKeyUp={(e) => {
          if (CommonUtils.isEnterKey(e)) {
            navigate(Url.ScreenReaderAccess);
          }
        }}
        tabIndex={0}
      >
        <Text
          text={"Link.ScreenReaderAccess"}
           icon="VolumeUp"
          size={14}
          color="primary"
          className="font-semibold cursor-pointer"
        />
      </div>
      <div
        onClick={() => {
          setOpenFeedbackModal(true);
        }}
        onKeyUp={(e) => {
          if (CommonUtils.isEnterKey(e)) {
            setOpenFeedbackModal(true);
          }
        }}
        className="cursor-pointer"
        tabIndex={0}
      >
        <div className="flex mx-2 items-center cursor-pointer">
          <Text
            text={"Link.Feedback"}
            icon="Feedback"
            size={14}
            color="primary"
            className="font-semibold cursor-pointer"
          />
        </div>
      </div>
      <FeedbackForm
        open={openFeedbackModal}
        onClose={() => setOpenFeedbackModal(false)}
      />
    </div>
  );
};
export default ScreenReader;
