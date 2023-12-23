import { useState, useMemo } from "react";

export const defaultPagination = {
  page: 1,
  pageSize: 10,
};

export const usePagination = ({ totalItems }: { totalItems: number }) => {
  const [currentPage, setCurrentPage] = useState(defaultPagination.page);
  const [pageSize, setPageSize] = useState(defaultPagination.pageSize);

  const pageAmount = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [pageSize, totalItems]
  );

  const handlePageChange = ({
    page: newPage,
    pageSize: newPageSize,
  }: {
    page: number;
    pageSize?: number;
  }) => {
    if (newPageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    } else if (newPage > 0 && newPage <= pageAmount) {
      setCurrentPage(newPage);
    }
  };

  return { currentPage, pageSize, pageAmount, handlePageChange };
};
