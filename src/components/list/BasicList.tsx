/* eslint-disable @typescript-eslint/no-unused-vars */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Condition from "../commons/Condition";
import EmptyData from "../empty/EmptyData";

export const BasicList = ({
  data = [],
  dataKey = "",
  className = "",
  onClick = (_d: never) => {},
  setPosition = (_e: React.MouseEvent) => {},
  position = -1,
}) => {
  const hasData = data.length > 0;

  return (
    <div>
      <List dense className={className}>
        <Condition show={!hasData}>
          <EmptyData text={"Dummy.Notification.NoDataFound"} />
        </Condition>
        <Condition show={hasData}>
          {data?.map((d, i) => (
            <ListItem
              key={i}
              disablePadding
              className={`px-2 cursor-pointer ${
                position === i && "bg-upag-light"
              }`}
              onClick={() => onClick(d)}
              onMouseEnter={(e) => setPosition(e)}
            >
              <ListItemText>{d[dataKey]}</ListItemText>
            </ListItem>
          ))}
        </Condition>
      </List>
    </div>
  );
};

export default BasicList;
