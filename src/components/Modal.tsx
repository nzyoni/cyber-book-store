import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "react";
import { PurchaseForm } from "./PurchaseForm";
import { BookItem } from "@/components/types";
import React from "react";

interface IModal {
  books: BookItem[];
  control: React.ReactNode;
}
// Based on Floating-ui library example - Dialog
// https://floating-ui.com/docs/dialog
export const PurchaseModal: React.FC<IModal> = ({ books, control }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        style={{ width: "fit-content" }}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {control}
      </div>
      {isOpen && (
        <FloatingOverlay
          lockScroll
          style={{
            display: "grid",
            background: "rgba(0, 0, 0, 0.8)",
            placeItems: "center",
          }}
        >
          <FloatingFocusManager context={context}>
            <div
              style={{
                background: "white",
                padding: "2em",
                borderRadius: "0.75em",
                position: "relative",
              }}
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              <button
                style={{ position: "absolute", top: "1em", right: "1em" }}
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
              <PurchaseForm books={books} onSubmit={() => setIsOpen(false)} />
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
};
