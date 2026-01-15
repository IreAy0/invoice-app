import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { InvoiceItem } from "./InvoiceItem";
import type { InvoiceSummary } from "../../types";
import { fetchInvoiceSummaries } from "../../utils/api";
import { Spinner } from "../ui/Spinner";
import { useSocket } from "../../socket";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";

type Group = {
  label: string;
  items: InvoiceSummary[];
};

type InvoiceListProps = {
  refreshKey?: number;
};

export function InvoiceList({ refreshKey = 0 }: InvoiceListProps) {
  const [items, setItems] = useState<InvoiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const newInvoice = useSocket<{ summary: InvoiceSummary }>("invoice:created");

  useEffect(() => {
    let mounted = true;
    fetchInvoiceSummaries() 
      .then((data) => mounted && setItems(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  useEffect(() => {
    if (newInvoice?.summary) {
      setItems((prev) => [newInvoice.summary, ...prev]);
    }
  }, [newInvoice]);

  const groups = useMemo<Group[]>(() => {
    if (!items.length) return [];

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    const map = new Map<string, InvoiceSummary[]>();
    for (const invoice of items) {
      const key = invoice.dueDate.slice(0, 10);
      const arr = map.get(key) ?? [];
      arr.push(invoice);
      map.set(key, arr);
    }

    const entries = Array.from(map.entries()).sort((a, b) =>
      a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0
    );

    return entries.map(([key, groupItems]) => {
      const date = new Date(key);
      const labelDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const isToday = key === todayKey;
      return {
        label: isToday ? `Today - ${labelDate}` : labelDate.toUpperCase(),
        items: groupItems,
      };
    });
  }, [items]);

  return (
    <Card
      className="bg-white p-6 md:p-8"
      aria-label="Recent invoices"
      aria-busy={loading}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-[20px] font-medium text-text">Recent Invoices</h3>
        <Button
          variant="secondary"
          size="sm"
          pill
          className="h-11 rounded-[999px] border border-gray-200 bg-white px-6 text-xs font-semibold uppercase tracking-[0.08em] !text-main_blue-100 hover:bg-gray-50"
        >
          View all invoices
        </Button>
      </div>

      {loading && (
        <div className="mt-6 flex items-center justify-center">
          <Spinner label="Loading invoices..." />
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-danger/10 p-3 text-sm text-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {groups.length === 0 ? (
            <p className="mt-4 text-sm text-[#8F95A3]">
              There are no invoices yet. Create your first invoice to see it
              listed here.
            </p>
          ) : (
            <div className="space-y-8">
              {groups.map((group) => (
                <section
                  key={group.label}
                  aria-label={group.label}
                  className="space-y-4"
                >
                  <h4 className="pl-1 text-xs font-medium font-neue-medium text-[#1F1F23] uppercase">
                    {group.label}
                  </h4>
                  <div className="pl-4 divide-y divide-gray-200">
                    {group.items.map((s) => (
                      <InvoiceItem
                        key={s.id}
                        data={s}
                        onClick={() => {
                          setSelectedId(s.id);
                          setDetailsOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </>
      )}

      <InvoiceDetailsModal
        open={detailsOpen}
        id={selectedId}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedId(null);
        }}
      />
    </Card>
  );
}
