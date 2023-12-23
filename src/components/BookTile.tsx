import { BookItem } from "@/app/types";
import React from "react";
import { PurchaseModal } from "./Modal";
import { PurchaseForm } from "./PurchaseForm";

interface BookTileProps {
  book: BookItem;
}

export const BookTile: React.FC<BookTileProps> = ({ book }) => {
  const { title, imageLinks, authors } = book.volumeInfo;
  const imageUrl = imageLinks?.thumbnail;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "white",
        padding: "1em",
        borderRadius: "15px",
      }}
    >
      <PurchaseModal
        book={book}
        control={<BookCover imageUrl={imageUrl} title={title} />}
      />
      <h4>{title}</h4>
    </div>
  );
};

export const BookCover: React.FC<{ imageUrl: string; title: string }> = ({
  imageUrl,
  title,
}) => {
  return imageUrl ? (
    <div>
      <img className="book-cover" src={imageUrl} alt={title} />
    </div>
  ) : (
    <div className="book-cover empty-book-cover">No Cover Available</div>
  );
};
