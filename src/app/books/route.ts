import type { NextApiRequest, NextApiResponse } from "next";
import { BookSearchResult } from "@/components/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const options = await request.json();

  const result = await searchBooks(options);

  return Response.json(result);
}

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

export type SearchRequest = {
  searchTerm?: string;
  page: number;
  pageSize: 10 | 25 | 50 | number;
};

export const apiLimits = {
  maxResults: 40,
};

export const searchBooksGoogleApi = async ({
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

export const searchBooks = async ({
  page = 1,
  pageSize = 10,
  searchTerm = "",
}: SearchRequest): Promise<BookSearchResult> => {
  if (pageSize < apiLimits.maxResults) {
    const results = await searchBooksGoogleApi({
      searchTerm,
      startIndex: calcStatIndex(page, pageSize),
      maxResults: pageSize,
    });

    return {
      items: results.items || [],
      totalItems: results.totalItems,
    };
  } else {
    const totalPages = Math.ceil(pageSize / apiLimits.maxResults);
    const requests = [];
    const relativeStartIndex = calcStatIndex(page, pageSize);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const startIndex =
        relativeStartIndex + calcStatIndex(currentPage, apiLimits.maxResults);
      const maxResults =
        currentPage < totalPages
          ? apiLimits.maxResults
          : pageSize - (totalPages - 1) * apiLimits.maxResults;
      requests.push(
        searchBooksGoogleApi({ searchTerm, startIndex, maxResults })
      );
    }

    const results: BookSearchResult[] = await Promise.all(requests);
    const booksSearchResult: BookSearchResult = {
      items: results
        .map((result) => result.items)
        .flat()
        .filter((result) => Boolean(result)),
      totalItems: results[0].totalItems,
    };

    return booksSearchResult;
  }
};
