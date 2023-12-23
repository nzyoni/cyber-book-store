import { BookItem } from "@/app/types";
import React from "react";
import { PurchaseModal } from "./Modal";

interface BookTileProps {
  book: BookItem;
  onAddToCart(book: BookItem): void;
  isSelected: boolean;
}

export const BookTile: React.FC<BookTileProps> = ({
  book,
  onAddToCart,
  isSelected,
}) => {
  const { title, imageLinks } = book.volumeInfo;
  const imageUrl = imageLinks?.thumbnail;

  return (
    <div className="book-tile">
      <PurchaseModal
        books={[book]}
        control={<BookCover imageUrl={imageUrl} title={title} />}
      />
      <h4>{title}</h4>
      <button onClick={() => onAddToCart(book)}>
        {isSelected ? "Remove from" : "Add to"} cart
      </button>
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

export const SkeletonTile = () => {
  return (
    <div className="book-tile">
      <div className="skeleton-cover">
        <div className="skeleton-cover-overly" />
      </div>
      <h4>-----------</h4>
      <button disabled>Add to cart</button>
    </div>
  );
};
