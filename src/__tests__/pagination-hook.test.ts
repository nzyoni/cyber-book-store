import { renderHook, act } from "@testing-library/react";
import { defaultPagination, usePagination } from "../hooks/pagination.hook";

describe("usePagination hook", () => {
  test("should initialize with default values", () => {
    const totalItems = 11;
    const { result } = renderHook(() => usePagination({ totalItems }));

    expect(result.current.currentPage).toBe(defaultPagination.page);
    expect(result.current.pageSize).toBe(defaultPagination.pageSize);
    expect(result.current.pageAmount).toBe(
      Math.ceil(totalItems / defaultPagination.pageSize)
    );
  });

  test("should not change upon invalid values", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 11 }));
    act(() => {
      result.current.handlePageChange({ page: 0 });
    });

    expect(result.current.currentPage).toBe(defaultPagination.page);

    act(() => {
      result.current.handlePageChange({ page: 20 });
    });

    expect(result.current.currentPage).toBe(defaultPagination.page);
  });

  test("should handle page change", () => {
    const totalItems = 100;
    const { result } = renderHook(() => usePagination({ totalItems }));

    act(() => {
      result.current.handlePageChange({ page: 2 });
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handlePageChange({ page: 5, pageSize: 25 });
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(25);
    expect(result.current.pageAmount).toBe(Math.ceil(totalItems / 25));
  });
});
