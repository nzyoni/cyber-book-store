import { BookSearchResult } from "../components/types";
import {
  apiLimits,
  booksApiService,
  searchBooksGoogleApi,
} from "../services/books.api.service";
import * as booksApiFile from "../services/books.api.service";

const bookResult = {
  items: [
    {
      volumeInfo: {
        title: "cyber-book",
        imageLinks: {
          thumbnail: "",
        },
      },
    },
  ],
  totalItems: 1,
};
const _searchBooksGoogleApi = jest.spyOn(booksApiFile, "searchBooksGoogleApi");

describe("books api", () => {
  beforeAll(() => {
    _searchBooksGoogleApi.mockResolvedValue(bookResult as BookSearchResult);
  });

  beforeEach(() => {
    // Reset the spy before each test
    _searchBooksGoogleApi.mockClear();
  });

  test("searchBooks - Single fetch for small page size", () => {
    booksApiService.searchBooks({ page: 1, pageSize: apiLimits.maxResults });

    expect(searchBooksGoogleApi).toHaveBeenCalledTimes(1);
    expect(searchBooksGoogleApi).toHaveBeenCalledWith({
      startIndex: 0,
      maxResults: apiLimits.maxResults,
      searchTerm: "",
    });
  });

  test("searchBooks - Multiple fetches for large page size", () => {
    const offset = 10;

    booksApiService.searchBooks({
      page: 1,
      pageSize: apiLimits.maxResults + offset,
    });

    expect(searchBooksGoogleApi).toHaveBeenCalledTimes(2);
    expect(searchBooksGoogleApi).toHaveBeenCalledWith({
      startIndex: 0,
      maxResults: apiLimits.maxResults,
      searchTerm: "",
    });
    expect(searchBooksGoogleApi).toHaveBeenCalledWith({
      startIndex: apiLimits.maxResults,
      maxResults: offset,
      searchTerm: "",
    });
  });
});
