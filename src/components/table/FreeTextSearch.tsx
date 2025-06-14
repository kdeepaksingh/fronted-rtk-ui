import { OutlinedInput } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import FormValidationUtils from "../../utils/FormValidationsUtils";
import { setSearchText } from "../../features/table/searchSlice";
import Translate from "../typography/Translate";
import { ColumnList } from "./ColumnList";

interface FreeTextSearchProps {
  disableSearchColumns?: boolean;
  multiple?: boolean;
  disableSearch?: boolean;
}

export const FreeTextSearch: React.FC<FreeTextSearchProps> = ({
  disableSearchColumns = false,
  multiple = true,
  disableSearch = false,
}) => {
  const dispatch = useDispatch();
  const { searchText, searchColumns } = useSelector(
    (state: RootState) => state.search
  );
  const [isFocused, setFocused] = useState(false);

  const disabled = useMemo(() => !searchColumns.length, [searchColumns]);

  return (
    <motion.div animate={{ width: isFocused ? 300 : 250 }}>
      <div className="flex">
        <div className="flex-grow data-search">
          <OutlinedInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              const value = FormValidationUtils.removeTag(e.target.value);
              dispatch(setSearchText(value));
            }}
            value={searchText}
            inputProps={{
              disabled: disabled || disableSearch,
            }}
            endAdornment={
              !disableSearchColumns ? (
                <div className="!-mr-3">
                  <ColumnList multiple={multiple} />
                </div>
              ) : null
            }
            size="small"
            placeholder={Translate({
              dataKey: "Placeholder.FilterTable",
              textOnly: true,
            })}
            className="w-full !text-xs"
            color="primary"
          />
        </div>
      </div>
    </motion.div>
  );
};
