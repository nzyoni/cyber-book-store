import { BookCatalog } from "@/components/BookCatalog";
import { booksApiService } from "@/services/books.api.service";
import React from "react";

const initialParams = { page: 1, pageSize: 10 };

export default async function Home() {
  const results = await booksApiService.searchBooks(initialParams);

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h2>Cyberpedia</h2>
        <BookCatalog initialData={results} />
      </div>
    </main>
  );
}
