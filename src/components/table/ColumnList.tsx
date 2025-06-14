/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllSearchColumns,
  setSearchColumns,
} from "../../features/table/searchSlice";
import Condition from "../commons/Condition";
import Translate from "../typography/Translate";

interface ColumnListProps {
  multiple?: boolean;
}

export const ColumnList: React.FC<ColumnListProps> = ({ multiple = true }) => {
  const dispatch = useDispatch();
  const { searchColumns, searchableColumns } = useSelector(
    (state: RootState) => state.search
  );

  const handleChange = (e: any) => {
    const value = e.target.value;
    dispatch(setSearchColumns(multiple ? value : [value]));
  };

  return (
    <>
      <Select
        onChange={handleChange}
        renderValue={(selected: any) => {
          if (!multiple) {
            const item =
              searchableColumns.find((i) => i.field === selected) || {};
            return item.headerName || item.field || "None";
          }
          const length = selected.length;
          if (length === 0) return "None";
          if (searchableColumns.length === length) return "All Columns";
          return `Columns (${length})`;
        }}
        multiple={multiple}
        value={multiple ? searchColumns : searchColumns?.[0] || ""}
        variant="standard"
        className="!pl-2 -ml-2 !pb-0 before:hidden after:hidden focus:bg-transparent !bg-transparent !border-l border-upag-border-color"
        size="small"
        sx={{ maxWidth: 100 }}
      >
        <Condition show={multiple}>
          <div className="!p-1 bg-white sticky top-0 flex items-center z-10 border-b">
            <ButtonGroup
              className="!w-full text-xxs justify-center"
              variant="contained"
              size="small"
              disableElevation
            >
              <Button
                className="!text-xxs !min-h-[auto] !rounded-e-none !leading-tight"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setAllSearchColumns());
                }}
                disabled={searchableColumns.length === searchColumns.length}
              >
                <Translate dataKey={"Action.SelectAll"} />
              </Button>
              <Button
                className="!text-xxs !min-h-[auto] !rounded-s-none !leading-tight"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setSearchColumns([]));
                }}
                disabled={searchColumns.length === 0}
              >
                <Translate dataKey={"Action.ClearAll"} />
              </Button>
            </ButtonGroup>
          </div>
        </Condition>

        {searchableColumns.map(({ headerName, field }) => {
          const label = headerName || field;
          return (
            <MenuItem key={label} value={field} dense divider>
              <Checkbox
                checked={searchColumns.includes(field)}
                size="small"
                className="!p-0 !pr-2"
              />
              <ListItemText
                primary={<Translate dataKey={label} htmlContent />}
              />
            </MenuItem>
          );
        })}
      </Select>
      <Divider flexItem orientation="vertical" className="!mr-2 !py-0" />
    </>
  );
};
