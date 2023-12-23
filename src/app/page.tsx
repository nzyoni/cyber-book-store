import { BookCatalog } from "@/components/BookCatalog";
import React from "react";

export default async function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h2>Cyberpedia</h2>
        <BookCatalog />
      </div>
    </main>
  );
}

/* todo
    initial loading state with skeleton books by the page number
    make header sticky

    tests
    1. searchBooks functionality with the hasbeencalled with
    2. debounce
    3. pagination hook? 
*/
