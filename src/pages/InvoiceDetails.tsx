import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Dropdown } from "../components/ui/Dropdown";
import { formatCurrency } from "../utils/format";
import { ActivityList } from "../components/invoice/ActivityList";
import { Modal } from "../components/ui/Modal";
import { Spinner } from "../components/ui/Spinner";
import { useParams } from "react-router-dom";
import { fetchInvoiceDetails } from "../utils/api";
import { InvoiceDetailsData } from "../types";

export default function InvoiceDetailsPage() {
  const [openShare, setOpenShare] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [d, setD] = useState<InvoiceDetailsData | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { id = "1023494 - 2304" } = useParams();

  useEffect(() => {
    let mounted = true;
    fetchInvoiceDetails(id)
      .then((data) => {
        if (mounted) setD(data);
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Failed to load";
        setError(message);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner label="Loading invoice..." />
      </div>
    );
  }

  if (!d) {
    return null;
  }
  if (error) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="card w-[420px] p-6 text-center">
          <h2 className="text-lg font-semibold">Couldn’t load invoice</h2>
          <p className="mt-2 text-sm text-danger">{error}</p>
          <a
            href="/"
            className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 font-semibold text-white"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr]">
      {/* Desktop sidebar */}
      <Sidebar className="hidden lg:block" />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 h-full w-[260px] bg-white shadow-2xl">
            <Sidebar className="h-full w-full" />
          </div>
        </div>
      )}

      <main className="min-h-screen">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <div className="mx-auto max-w-6xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-semibold">
                Invoice - {d.invoiceNumber}
              </h1>
              <p className="text-sm text-text-soft">
                View the details and activity of this invoice
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary">Download as PDF</Button>
              <Button>Send Invoice</Button>
              <Dropdown
                button={<span>More ▾</span>}
                items={[
                  {
                    id: "dup",
                    label: "Duplicate Invoice",
                    onSelect: () => alert("Duplicate"),
                  },
                  {
                    id: "share",
                    label: "Get sharable link",
                    onSelect: () => setOpenShare(true),
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "14 days before due date",
              "7 days before due date",
              "3 days before due date",
              "24 hrs before due date",
              "On the due date",
            ].map((t) => (
              <button
                key={t}
                className="rounded-pill border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100 focus-visible:focus-ring"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-primary/5 p-4">
                  <div className="text-xs text-text-soft">Sender</div>
                  <div className="mt-2 font-semibold">{d.sender.name}</div>
                  <div className="text-sm text-text-soft">{d.sender.phone}</div>
                  <div className="text-sm text-text-soft">
                    {d.sender.address}
                  </div>
                  <div className="text-sm text-text-soft">{d.sender.email}</div>
                </div>
                <div className="rounded-2xl bg-primary/5 p-4">
                  <div className="text-xs text-text-soft">Customer</div>
                  <div className="mt-2 font-semibold">{d.customer.name}</div>
                  <div className="text-sm text-text-soft">
                    {d.customer.phone}
                  </div>
                  <div className="text-sm text-text-soft">
                    {d.customer.address}
                  </div>
                  <div className="text-sm text-text-soft">
                    {d.customer.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 p-4 text-sm md:grid-cols-4">
                <div>
                  <div className="text-text-soft">Invoice No</div>
                  <div className="font-semibold">1023023010</div>
                </div>
                <div>
                  <div className="text-text-soft">Issue Date</div>
                  <div className="font-semibold">
                    {new Date(d.issueDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-text-soft">Due Date</div>
                  <div className="font-semibold">
                    {new Date(d.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-text-soft">Billing Currency</div>
                  <div className="font-semibold">{d.billingCurrency}</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-text-soft">
                      <th className="pb-2 pr-4">Items</th>
                      <th className="pb-2 pr-4">Qty</th>
                      <th className="pb-2 pr-4">Price</th>
                      <th className="pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {d.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-3 pr-4">{it.name}</td>
                        <td className="py-3 pr-4">{it.qty}</td>
                        <td className="py-3 pr-4">
                          {formatCurrency(it.price)}
                        </td>
                        <td className="py-3">{formatCurrency(it.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div />
                <div className="space-y-1 rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-soft">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(d.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-soft">Discount (2.5%)</span>
                    <span className="font-semibold">
                      {formatCurrency(d.discount)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">Total Amount Due</span>
                    <span className="text-[20px] font-bold">
                      {formatCurrency(d.totalDue)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="text-xs text-text-soft">
                    Payment Information
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-text-soft">Account Name</div>
                      <div className="font-semibold">1023023010</div>
                    </div>
                    <div>
                      <div className="text-text-soft">Account Number</div>
                      <div className="font-semibold">March 30th, 2023</div>
                    </div>
                    <div>
                      <div className="text-text-soft">ACH Routing No</div>
                      <div className="font-semibold">May 19th, 2023</div>
                    </div>
                    <div>
                      <div className="text-text-soft">Bank Name</div>
                      <div className="font-semibold">USD ($)</div>
                    </div>
                    <div>
                      <div className="text-text-soft">Bank Address</div>
                      <div className="font-semibold">1023023010</div>
                    </div>
                    <div>
                      <div className="text-text-soft">Account Number</div>
                      <div className="font-semibold">March 30th, 2023</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="text-xs text-text-soft">Note</div>
                  <div className="mt-2 text-sm">{d.note}</div>
                </div>
              </div>
            </Card>

            <ActivityList />
          </div>
        </div>
      </main>

      <Modal
        open={openShare}
        title="Sharable Link"
        onClose={() => setOpenShare(false)}
      >
        <p className="text-sm text-text-soft">Copy and share this link:</p>
        <div className="mt-3 flex items-center gap-2">
          <input
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            readOnly
            value={`https://example.com/invoice/${encodeURIComponent(
              d.invoiceNumber
            )}`}
            aria-label="Sharable link"
          />
          <Button
            variant="secondary"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://example.com/invoice/${encodeURIComponent(
                  d.invoiceNumber
                )}`
              )
            }
          >
            Copy
          </Button>
        </div>
      </Modal>
    </div>
  );
}
