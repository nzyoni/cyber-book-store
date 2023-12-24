import React from "react";
import { BookItem } from "@/components/types";
import { PurchaseModal } from "./Modal";

export const Cart: React.FC<{ items: BookItem[] }> = ({ items }) => {
  return (
    items.length > 0 && (
      <>
        <div className="cart">
          <PurchaseModal
            books={items}
            control={<button className="cart-button">📦</button>}
          />
          <div className="cart-bubble">{items.length}</div>
        </div>
      </>
    )
  );
};
