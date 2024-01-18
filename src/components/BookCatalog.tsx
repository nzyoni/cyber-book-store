"use client";

import { BookTile, SkeletonTile } from "./BookTile";
import { Pagination } from "./Pagination";
import { useCallback, useState } from "react";

import { SearchInput } from "./SearchInput";
import { usePagination } from "@/hooks/pagination.hook";
import React from "react";
import { BookItem, BookSearchResult } from "@/components/types";
import { Cart } from "./Cart";
import { useFetchBooks } from "@/hooks/useFetchBooks";

export const BookCatalog: React.FC<{ initialData: BookSearchResult }> = ({
  initialData,
}) => {
  const [cart, setCart] = useState<BookItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentPage, pageSize, pageAmount, handlePageChange } = usePagination(
    { totalItems: initialData.totalItems }
  );

  const { data, isLoading } = useFetchBooks({
    page: currentPage,
    pageSize,
    searchTerm,
    initialData,
  });

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      handlePageChange({ page: 1 });
    },
    [setSearchTerm, handlePageChange]
  );

  const toggleItemInCart = useCallback(
    (book: BookItem) => {
      if (cart.find((_book) => _book.id === book.id)) {
        setCart((prev) => prev.filter((_book) => _book.id !== book.id));
      } else {
        setCart((prev) => [...prev, book]);
      }
    },
    [cart, setCart]
  );

  const books = data?.items;
  return (
    <div>
      <div className="search-bar">
        <SearchInput onChange={handleSearch} />
        {isLoading && books && <div className="loader" />}
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
          books === undefined &&
          Array.from({ length: pageSize }).map((_, index) => {
            return <SkeletonTile key={index} />;
          })}

        {/* Results - Books */}
        {books &&
          books?.map((book, index) => (
            <BookTile
              key={`${index}-${book.id}`}
              book={book}
              isInCart={Boolean(cart.find((_book) => _book.id === book.id))}
              onAddToCart={toggleItemInCart}
            />
          ))}
      </div>

      {/* No results */}
      {!isLoading && books?.length === 0 && (
        <div style={{ textAlign: "center" }}>
          No books found, try to search something else{" "}
        </div>
      )}

      <Cart items={cart} />
    </div>
  );
};
