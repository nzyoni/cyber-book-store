import { BookItem } from "@/app/types";
import { PurchaseModal } from "./Modal";

export const Cart: React.FC<{ items: BookItem[] }> = ({ items }) => {
  return (
    <div className="cart">
      <PurchaseModal
        books={items}
        control={<button className="cart-button">📦</button>}
      />
      <div className="cart-bubble">{items.length}</div>
    </div>
  );
};
