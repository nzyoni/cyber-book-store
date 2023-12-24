import { BookSearchResult } from "@/components/types";

const urls = {
  books: ({
    searchTerm,
    startIndex,
    maxResults,
  }: {
    searchTerm?: string;
    startIndex: number;
    maxResults: number;
  }) => {
    const searchQuery = searchTerm ? `cyber+${searchTerm}` : "cyber";
    return `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}&startIndex=${startIndex}`;
  },
};

export type searchRequest = {
  searchTerm?: string;
  page: number;
  pageSize: 10 | 25 | 50 | number;
};

export const apiLimits = {
  maxResults: 40,
};

export const singleSearchBooks = async ({
  searchTerm,
  startIndex = 0,
  maxResults = 10,
}: {
  searchTerm?: string;
  startIndex: number;
  maxResults: number;
}): Promise<BookSearchResult> => {
  const booksUrl = urls.books({
    startIndex,
    maxResults,
    searchTerm,
  });
  const res = await fetch(booksUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

const calcStatIndex = (page: number, pageSize: number) => (page - 1) * pageSize;

const searchBooks = async ({
  page,
  pageSize,
  searchTerm = "",
}: searchRequest): Promise<BookSearchResult> => {
  if (pageSize < apiLimits.maxResults) {
    return singleSearchBooks({
      searchTerm,
      startIndex: calcStatIndex(page, pageSize),
      maxResults: pageSize,
    });
  } else {
    const totalPages = Math.ceil(pageSize / apiLimits.maxResults);
    const requests = [];
    const relativeStart = calcStatIndex(page, pageSize);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const startIndex =
        relativeStart + calcStatIndex(currentPage, apiLimits.maxResults);
      const maxResults =
        currentPage < totalPages
          ? apiLimits.maxResults
          : pageSize - (totalPages - 1) * apiLimits.maxResults;
      requests.push(singleSearchBooks({ searchTerm, startIndex, maxResults }));
    }

    const results: BookSearchResult[] = await Promise.all(requests);
    const books: BookSearchResult = {
      items: results.map((result) => result.items).flat(),
      totalItems: results[0].totalItems,
    };

    return books;
  }
};

export const booksApiService = {
  searchBooks,
};
