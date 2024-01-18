import { SearchRequest } from "@/app/api/books/utils";
import { BookSearchResult } from "@/components/types";

const searchBooks = async (
  options: SearchRequest
): Promise<BookSearchResult> => {
  try {
    const response = await fetch(`/api/books`, {
      method: "post",
      body: JSON.stringify(options),
    });

    return response.json();
  } catch (error) {
    // log error to some 3rd party service
    throw error;
  }
};
export const booksApiService = {
  searchBooks,
};
