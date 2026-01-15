import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface Props {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  hideHeader?: boolean;
}

export function Modal({
  open,
  title,
  onClose,
  children,
  contentClassName,
  hideHeader,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    const first = ref.current?.querySelector<HTMLElement>(
      "[tabindex],button,a,input,select,textarea"
    );
    first?.focus();
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center flex-col justify-center bg-black/30 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute top-4 right-2 md:top-6 md:right-16 bg-white rounded-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="h-9 w-9 rounded-xl hover:bg-gray-100 focus-visible:focus-ring"
        >
          ✕
        </button>
      </div>
      <div
        ref={ref}
        className={clsx("card w-[560px] max-w-[90vw] p-6", contentClassName)}
      >
        {!hideHeader && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="h-9 w-9 rounded-xl hover:bg-gray-100 focus-visible:focus-ring"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
