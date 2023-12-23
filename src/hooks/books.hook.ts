"use client";
import { BookItem } from "@/app/types";
import { booksApiService, searchRequest } from "@/services/books.api.service";
import { useCallback, useEffect, useState } from "react";

export const useBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<BookItem[]>();
  const [total, setTotal] = useState<number>(0);

  const fetchBooks = useCallback(
    async (
      options: searchRequest = {
        page: 1,
        pageSize: 10,
      }
    ) => {
      setIsLoading(true);
      try {
        const booksResponse = await booksApiService.searchBooks(options);
        console.log("s", booksResponse);
        setBooks(booksResponse.items);
        setTotal(booksResponse.totalItems);
      } catch (eror) {
        // throw error/ show empty state
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  return { fetchBooks, isLoading, books, total };
};
