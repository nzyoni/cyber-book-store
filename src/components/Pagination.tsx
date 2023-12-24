import { SearchRequest } from "@/app/api/books/utils";
import React, { useMemo, useState } from "react";

interface IPagination {
  currentPage: number;
  pageSize: number;
  pageAmount: number;
  onPageChange({ page, pageSize }: { page: number; pageSize?: number }): void;
}

const pageSizeOptions: SearchRequest["pageSize"][] = [10, 25, 50, 100];

export const Pagination: React.FC<IPagination> = ({
  currentPage,
  pageSize,
  pageAmount,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      Items per page
      <select
        className="page-size-select"
        value={pageSize}
        onChange={(e) => onPageChange({ page: 1, pageSize: +e.target.value })}
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <a
        href="#"
        className={`previous-page ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          onPageChange({ page: currentPage - 1 });
        }}
      >
        Previous
      </a>
      <a
        href="#"
        className={`next-page ${currentPage >= pageAmount ? "disabled" : ""}`}
        onClick={() => {
          onPageChange({ page: currentPage + 1 });
        }}
      >
        Next
      </a>
    </div>
  );
};
