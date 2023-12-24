import { BookItem } from "@/components/types";
import React, { useState } from "react";
import { PurchaseModal } from "./Modal";

interface BookTileProps {
  book: BookItem;
  onAddToCart(book: BookItem): void;
  isInCart: boolean;
}

export const BookTile: React.FC<BookTileProps> = ({
  book,
  onAddToCart,
  isInCart,
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
        {isInCart ? "Remove from" : "Add to"} cart
      </button>
    </div>
  );
};

export const BookCover: React.FC<{ imageUrl: string; title: string }> = ({
  imageUrl,
  title,
}) => {
  const [loaded, setLoaded] = useState(false);

  return imageUrl ? (
    <div>
      <div style={!loaded ? { display: "block" } : { display: "none" }}>
        {skeletonImage}
      </div>
      <img
        className="book-cover"
        src={imageUrl}
        alt={title}
        onLoad={() => setLoaded(true)}
      />
    </div>
  ) : (
    <div className="book-cover empty-book-cover">No Cover Available</div>
  );
};
const skeletonImage = (
  <div className="skeleton-cover">
    <div className="skeleton-cover-overly" />
  </div>
);
export const SkeletonTile = () => {
  return (
    <div className="book-tile">
      {skeletonImage}
      <h4>-----------</h4>
      <button disabled>Add to cart</button>
    </div>
  );
};
