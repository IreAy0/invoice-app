import React from "react";
import { Card } from "../ui/Card";

export function StatCard({
  title,
  value,
  tag,
}: {
  title: string;
  value: string;
  tag?: React.ReactNode;
}) {
  const [integerPart, decimalPart] = value.split(".");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-5">
          <div>
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.3334 16.6666H31.6667C35 16.6666 36.6667 15 36.6667 11.6666V8.33331C36.6667 4.99998 35 3.33331 31.6667 3.33331H28.3334C25 3.33331 23.3334 4.99998 23.3334 8.33331V11.6666C23.3334 15 25 16.6666 28.3334 16.6666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.33337 36.6666H11.6667C15 36.6666 16.6667 35 16.6667 31.6666V28.3333C16.6667 25 15 23.3333 11.6667 23.3333H8.33337C5.00004 23.3333 3.33337 25 3.33337 28.3333V31.6666C3.33337 35 5.00004 36.6666 8.33337 36.6666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.34"
                  d="M10 16.6666C13.6819 16.6666 16.6667 13.6819 16.6667 9.99998C16.6667 6.31808 13.6819 3.33331 10 3.33331C6.31814 3.33331 3.33337 6.31808 3.33337 9.99998C3.33337 13.6819 6.31814 16.6666 10 16.6666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.34"
                  d="M30 36.6666C33.6819 36.6666 36.6667 33.6819 36.6667 30C36.6667 26.3181 33.6819 23.3333 30 23.3333C26.3181 23.3333 23.3334 26.3181 23.3334 30C23.3334 33.6819 26.3181 36.6666 30 36.6666Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="text-xs text-text-body uppercase font-neue space-x-2 flex items-center">
            <span>{title}</span>

            <span>{tag}</span>
          </div>
          <div className="stat-value mt-1 flex items-baseline gap-1">
            <span>{integerPart}</span>
            {decimalPart && (
              <span className="text-sm align-super text-text-body">.{decimalPart}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
