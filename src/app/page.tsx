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
    1- shopping cart

    nice 2 have
    make header sticky
    style item per row
    style input a bit
*/
