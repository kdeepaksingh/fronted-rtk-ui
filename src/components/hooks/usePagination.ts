import { useState } from "react";

export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = (): T[] => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    maxPage,
  };
};

export default usePagination;

// const items = [/* your data here */];
// const itemsPerPage = 10;

// const {
//   currentData,
//   currentPage,
//   maxPage,
//   next,
//   prev,
//   jump,
// } = usePagination(items, itemsPerPage);
