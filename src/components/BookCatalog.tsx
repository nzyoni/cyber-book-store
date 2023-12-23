"use client";

import { BookTile, SkeletonTile } from "./BookTile";
import { useBooks } from "@/hooks/books.hook";
import { Pagination } from "./Pagination";
import { useEffect, useMemo, useState } from "react";

import { SearchInput } from "./SearchInput";
import { usePagination } from "@/hooks/pagination.hook";
import React from "react";

export const BookCatalog = () => {
  const { books, total, isLoading, fetchBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentPage, pageSize, pageAmount, handlePageChange } = usePagination(
    { totalItems: total }
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    handlePageChange({ page: 1 });
  };

  useEffect(() => {
    fetchBooks({ page: currentPage, pageSize, searchTerm });
  }, [currentPage, pageSize, searchTerm]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchInput onChange={handleSearch} />
        {isLoading && books && <div className="loader"></div>}

        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          pageAmount={pageAmount}
          onPageChange={handlePageChange}
        />
      </div>
      {isLoading && !books && (
        <div className="tiles-container">
          {Array.from({ length: pageSize }).map((_, index) => {
            return <SkeletonTile />;
          })}
        </div>
      )}
      {!isLoading && !books && (
        <div>No books found, tryo to search something else </div>
      )}
      {books && (
        <div className="tiles-container">
          {books?.map((book, index) => (
            <BookTile key={`${index}-${book.id}`} book={book} />
          ))}
        </div>
      )}

      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          pageAmount={pageAmount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
