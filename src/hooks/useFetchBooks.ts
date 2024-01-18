import { SearchRequest } from "@/app/api/books/utils";
import { BookItem, BookSearchResult } from "@/components/types";
import { booksApiService } from "@/services/books.api.service";
import { useQuery } from "react-query";

export const useFetchBooks = ({
  page,
  pageSize,
  searchTerm,
  initialData,
}: SearchRequest & { initialData: BookSearchResult }) => {
  const query = useQuery<BookSearchResult>({
    queryKey: ["books", { page, pageSize, searchTerm }],
    queryFn: (params) => {
      return booksApiService.searchBooks({
        page,
        pageSize,
        searchTerm,
      });
    },
    // initialData,
    refetchOnWindowFocus: false,
  });

  return query;
};
