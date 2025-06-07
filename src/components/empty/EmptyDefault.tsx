import Icon from "../icon/Icon";
import Translate from "../typography/Translate";

export const EmptyDefault = () => (
  <div className="flex justify-center items-center flex-col text-sm h-48">
    <div className="text-gray-600">
      <Icon name={"EmptyData"} />
    </div>
    <div className="mt-2">
      <Translate dataKey={"Dummy.Notification.NoDataFound"} />
    </div>
  </div>
);
