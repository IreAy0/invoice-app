import React from "react";
import { Activity } from "../../types";

interface Props {
  a: Activity;
  isLast?: boolean;
}

export function ActivityItem({ a, isLast }: Props) {
  const date = new Date(a.timestamp);
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const timeLabel = isToday
    ? `Today, ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`
    : date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

  return (
    <div className="flex items-start gap-4 isolate">
      <div className="flex flex-col items-center">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#7879F1] text-white">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="8"
              r="3.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M5.25 18.5C5.25 15.7386 8.079 14 12 14C15.921 14 18.75 15.7386 18.75 18.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {!isLast && (
          <div className="mt-2 h-[60px] w-px bg-[#E3E6EF]" aria-hidden="true" />
        )}
      </div>

      <div className="flex-1 space-y-1">
        <div className="text-[18px] leading-[22px] font-neue-medium font-medium text-black">
          {a.title}
        </div>
        <div className="text-[14px] leading-[22px] tracking-[0.003em] text-[#697598]">
          {timeLabel}
        </div>
        {a.subtitle && (
          <div className="mt-2 inline-flex max-w-full rounded-2xl bg-[#F6F8FA] px-4 py-3">
            <p className="text-[14px] leading-[22px] tracking-[0.003em] text-[#697598]">
              {a.subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
