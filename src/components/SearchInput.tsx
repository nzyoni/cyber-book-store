import React from "react";
import { useMemo } from "react";

export const debounceTimeout = 250;
type AnyFunction = (...args: any[]) => any;

const debounce = (callback: AnyFunction): AnyFunction => {
  let timeoutId: NodeJS.Timeout;

  function debouncedFn(...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, debounceTimeout);
  }

  return debouncedFn;
};

export const SearchInput = ({
  onChange,
}: {
  onChange(value: string): void;
}) => {
  const debounceOnChange = useMemo(() => debounce(onChange), [onChange]);

  return (
    <div>
      <input
        className="search-input"
        placeholder="Search for a book"
        onChange={(e) => debounceOnChange(e.target.value)}
      />
    </div>
  );
};
