import React from "react";
import { StatusBadge } from "../ui/Badge";
import { InvoiceSummary } from "../../types";
import { formatCurrency } from "../../utils/format";

interface Props {
  data: InvoiceSummary;
  onClick?: () => void;
}

export function InvoiceItem({ data, onClick }: Props) {
  const isInteractive = Boolean(onClick);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isInteractive}
      className="grid w-full grid-cols-[1.5fr,1fr,auto] items-center gap-4 rounded-xl py-3 pl-1 pr-2 text-left transition hover:bg-white hover:shadow-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main_blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FC]"
      aria-label={`Invoice ${data.number}, due on ${new Date(
        data.dueDate
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`}
    >
      <div className="text-sm font-neue-medium font-medium text-text-dark_gray">
        <div>Invoice</div>
        <div>{data.number}</div>
      </div>
      <div>
        <div className="text-xs font-normal uppercase tracking-[0.16em] text-[#666F77] font-neue">
          Due date
        </div>
        <div className="font-neue-medium font-medium text-text-body">
          {new Date(data.dueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="text-right">
        <div className="font-neue-medium text-medium font-semibold text-text-dark_gray">
          {formatCurrency(data.amount)}
        </div>
        <div className="mt-1">
          <StatusBadge status={data.status} />
        </div>
      </div>
    </button>
  );
}
