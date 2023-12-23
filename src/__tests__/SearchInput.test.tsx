import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { SearchInput, debounceTimeout } from "../components/SearchInput";

jest.useFakeTimers();
const onChangeMock = jest.fn();

describe("SearchInput component", () => {
  test("calls onChange only once within debounce timeout", () => {
    const { getByPlaceholderText } = render(
      <SearchInput onChange={onChangeMock} />
    );
    const input = getByPlaceholderText("Search for a book");

    fireEvent.change(input, { target: { value: "First search" } });
    fireEvent.change(input, { target: { value: "Second search" } });
    fireEvent.change(input, { target: { value: "Third search" } });

    act(() => {
      jest.advanceTimersByTime(debounceTimeout - 50);
    });

    expect(onChangeMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Third search");
  });
});
