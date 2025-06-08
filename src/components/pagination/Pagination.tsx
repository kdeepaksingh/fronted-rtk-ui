import React from "react";
import { Pagination as UIPagination } from "@mui/material";
import type { PaginationProps } from "@mui/material";

type CustomPaginationProps = {
  count?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
} & PaginationProps;

export const Pagination: React.FC<CustomPaginationProps> = ({
  count = 5,
  onChange = () => {},
  ...props
}) => {
  return (
    <UIPagination
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={onChange}
      className="py-3"
      {...props}
    />
  );
};

export default Pagination;
