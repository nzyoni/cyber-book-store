import { BookItem, BookSearchResult } from "../components/types";
import {
  apiLimits,
  booksApiService,
  singleSearchBooks,
} from "../services/books.api.service";
import * as booksApiFile from "../services/books.api.service";

const emptyBookResult = {
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
  totalItems: 0,
};
const _singleSearchBooks = jest.spyOn(booksApiFile, "singleSearchBooks");

describe("books api", () => {
  beforeAll(() => {
    _singleSearchBooks.mockResolvedValue(emptyBookResult as BookSearchResult);
  });

  beforeEach(() => {
    // Reset the spy before each test
    _singleSearchBooks.mockClear();
  });

  test("searchBooks should call fetch once when page-size <= api-max-reuslts", () => {
    booksApiService.searchBooks({ page: 1, pageSize: apiLimits.maxResults });

    expect(singleSearchBooks).toHaveBeenCalledTimes(1);
    expect(singleSearchBooks).toHaveBeenCalledWith({
      startIndex: 0,
      maxResults: apiLimits.maxResults,
      searchTerm: "",
    });
  });

  test("searchBooks should call fetch more than one when page-size > api-max-reuslts", () => {
    const offset = 10;

    booksApiService.searchBooks({
      page: 1,
      pageSize: apiLimits.maxResults + offset,
    });

    expect(singleSearchBooks).toHaveBeenCalledTimes(2);
    expect(singleSearchBooks).toHaveBeenCalledWith({
      startIndex: 0,
      maxResults: apiLimits.maxResults,
      searchTerm: "",
    });
    expect(singleSearchBooks).toHaveBeenCalledWith({
      startIndex: apiLimits.maxResults,
      maxResults: offset,
      searchTerm: "",
    });
  });
});
