"use client";

import { BookTile, SkeletonTile } from "./BookTile";
import { useBooks } from "@/hooks/books.hook";
import { Pagination } from "./Pagination";
import { useCallback, useEffect, useState } from "react";

import { SearchInput } from "./SearchInput";
import { usePagination } from "@/hooks/pagination.hook";
import React from "react";
import { BookItem } from "@/app/types";
import { Cart } from "./Cart";

export const BookCatalog = () => {
  const { books, total, isLoading, fetchBooks } = useBooks();
  const [cart, setCart] = useState<BookItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentPage, pageSize, pageAmount, handlePageChange } = usePagination(
    { totalItems: total }
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      handlePageChange({ page: 1 });
    },
    [setSearchTerm, handlePageChange]
  );

  useEffect(() => {
    fetchBooks({ page: currentPage, pageSize, searchTerm });
  }, [currentPage, pageSize, searchTerm, fetchBooks]);

  return (
    <div>
      <div className="search-bar">
        <SearchInput onChange={handleSearch} />
        {isLoading && books && <div className="loader"></div>}
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          pageAmount={pageAmount}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="tiles-container">
        {/* Initial Loading */}
        {isLoading &&
          !books &&
          Array.from({ length: pageSize }).map((_, index) => {
            return <SkeletonTile key={index} />;
          })}
        {/* No results */}
        {!isLoading && !books && (
          <div>No books found, try to search something else </div>
        )}
        {/* Results */}
        {books &&
          books?.map((book, index) => (
            <BookTile
              key={`${index}-${book.id}`}
              book={book}
              isSelected={Boolean(cart.find((_book) => _book.id === book.id))}
              onAddToCart={(book: BookItem) => {
                if (cart.find((_book) => _book.id === book.id)) {
                  setCart((prev) =>
                    prev.filter((_book) => _book.id !== book.id)
                  );
                } else {
                  setCart((prev) => [...prev, book]);
                }
              }}
            />
          ))}
      </div>

      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          pageAmount={pageAmount}
          onPageChange={handlePageChange}
        />
      )}
      <Cart items={cart} />
    </div>
  );
};
