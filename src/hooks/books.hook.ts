"use client";
import { SearchRequest } from "@/app/api/books/utils";
import { BookItem } from "@/components/types";
import { booksApiService } from "@/services/books.api.service";
import { useCallback, useState } from "react";

export const useBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<BookItem[]>();
  const [total, setTotal] = useState<number>(0);

  const fetchBooks = useCallback(
    async (
      options: SearchRequest = {
        page: 1,
        pageSize: 10,
      }
    ) => {
      setIsLoading(true);
      try {
        const booksResponse = await booksApiService.searchBooks(options);
        setBooks(booksResponse.items);
        setTotal(booksResponse.totalItems);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Couldn't fetch books, please try again");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  return { fetchBooks, isLoading, books, total };
};
