/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, Controller } from "react-hook-form";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import EmptyData from "../empty/EmptyData";

type CheckBoxListProps<T> = {
  name: string;
  data: T[];
  dataKey: keyof T;
  className?: string;
};

export const CheckBoxList = <T extends Record<string, any>>({
  name,
  data = [],
  dataKey,
  className = "",
}: CheckBoxListProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { value = [], onChange } }) => {
        const handleToggle = (item: T) => {
          const isChecked = value.includes(item[dataKey]);
          if (isChecked) {
            onChange(value.filter((val: any) => val !== item[dataKey]));
          } else {
            onChange([...value, item[dataKey]]);
          }
        };

        return (
          <List dense className={className}>
            {data.length > 0 ? (
              data.map((item, i) => (
                <ListItem
                  key={i}
                  disablePadding
                  className="px-2"
                  onClick={() => handleToggle(item)}
                >
                  <Checkbox
                    edge="start"
                    checked={value.includes(item[dataKey])}
                    tabIndex={-1}
                    disableRipple
                    className="!py-1 !px-3 m-0"
                  />
                  <ListItemText>{item[dataKey]}</ListItemText>
                </ListItem>
              ))
            ) : (
              <EmptyData text={"Dummy.Notification.NoDataFound"} />
            )}
          </List>
        );
      }}
    />
  );
};

export default CheckBoxList;
