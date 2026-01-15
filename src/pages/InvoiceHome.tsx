import React, { useCallback, useState } from "react";
import { Button } from "../components/ui/Button";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { StatCard } from "../components/dashboard/StatCard";
import { ActionCard } from "../components/dashboard/ActionCard";
import { InvoiceList } from "../components/invoice/InvoiceList";
import { ActivityList } from "../components/invoice/ActivityList";
import { createInvoice } from "../utils/api";
import { invoiceDetails } from "../data/sample";
import {
  BeneficiaryIcon,
  SettingsIcon,
} from "../components/icons/SidebarIcons";

type InvoiceHeaderProps = {
  creating: boolean;
  createError: string | null;
  onCreate: () => Promise<void> | void;
};

function InvoiceHeader({
  creating,
  createError,
  onCreate,
}: InvoiceHeaderProps) {
  return (
    <>
      <header className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-[32px] font-neue-medium font-medium">Invoice</h1>
        </div>

        <div className="flex w-full items-center gap-4 md:w-1/2">
          <Button
            type="button"
            size="lg"
            className="w-1/2 border-[#E3E6EF] py-4 text-sm uppercase"
            variant="secondary"
            pill
          >
            See what’s new
          </Button>
          <Button
            type="button"
            size="lg"
            className="w-1/2 py-4 text-sm uppercase"
            pill
            disabled={creating}
            onClick={onCreate}
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </div>
      </header>

      {createError && <p className="mt-2 text-sm text-danger">{createError}</p>}
    </>
  );
}

function InvoiceStatsSection() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-4">
      <StatCard
        title="Total Paid"
        value="$4,120,102.76"
        tag={
          <span className="rounded-pill bg-success/15 px-2 py-1 text-xs font-medium text-text-dark_gray">
            1,299
          </span>
        }
      />
      <StatCard
        title="Total Overdue"
        value="$23,000.13"
        tag={
          <span className="rounded-pill bg-danger/15 px-2 py-1 text-xs font-medium text-text-dark_gray">
            13
          </span>
        }
      />
      <StatCard
        title="Total Draft"
        value="$12,200.00"
        tag={
          <span className="rounded-pill bg-gray-200 px-2 py-1 text-xs font-medium text-text-dark_gray">
            08
          </span>
        }
      />
      <StatCard
        title="Total Unpaid"
        value="$87,102.00"
        tag={
          <span className="rounded-pill bg-warning/15 px-2 py-1 text-xs font-medium text-text-dark_gray">
            06
          </span>
        }
      />
    </section>
  );
}

function InvoiceActionsSection() {
  return (
    <section className="mt-6">
      <h2 className="text-[20px] font-neue-medium font-medium">
        Invoice Actions
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        <ActionCard
          icon={<img src="/money.png" className="h-20 w-20" />}
          active={true}
          title="Create New Invoice"
          description="Create new invoices easily"
        />

        <ActionCard
          icon={<SettingsIcon className="h-20 w-20" />}
          title="Change Invoice settings"
          description=" Customise your invoices"
        />
        <ActionCard
          icon={<BeneficiaryIcon className="h-20 w-20" />}
          title="Manage Customer list"
          description="Add and remove customers"
        />
      </div>
    </section>
  );
}

type MobileSidebarOverlayProps = {
  open: boolean;
  onClose: () => void;
};

function MobileSidebarOverlay({ open, onClose }: MobileSidebarOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-50 h-full w-[260px] bg-white shadow-2xl">
        <Sidebar className="h-full w-full" />
      </div>
    </div>
  );
}

export default function InvoiceHome() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [invoiceListRefreshKey, setInvoiceListRefreshKey] = useState(0);

  const handleCreateInvoice = useCallback(async () => {
    if (creating) return;

    setCreateError(null);
    setCreating(true);

    try {
      const now = new Date();
      const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

      await createInvoice({
        ...invoiceDetails,
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: now.toISOString().slice(0, 10),
        dueDate: due.toISOString().slice(0, 10),
      });

      setInvoiceListRefreshKey((key) => key + 1);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create invoice";
      setCreateError(message);
    } finally {
      setCreating(false);
    }
  }, [creating]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[300px_1fr]">
      {/* Desktop sidebar */}
      <Sidebar className="hidden lg:block" />

      {/* Mobile sidebar overlay */}
      <MobileSidebarOverlay
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <main className="bg-bg-background">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <div className="container mx-auto px-4 py-7 lg:px-8">
          <InvoiceHeader
            creating={creating}
            createError={createError}
            onCreate={handleCreateInvoice}
          />

          <InvoiceStatsSection />

          <InvoiceActionsSection />

          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <InvoiceList refreshKey={invoiceListRefreshKey} />
            <ActivityList />
          </section>
        </div>
      </main>
    </div>
  );
}
