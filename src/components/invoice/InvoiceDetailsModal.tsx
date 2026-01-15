import React, { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Dropdown } from "../ui/Dropdown";
import { Spinner } from "../ui/Spinner";
import { ActivityItem } from "./ActivityItem";
import { formatCurrency } from "../../utils/format";
import { fetchInvoiceDetails } from "../../utils/api";
import type { Activity, InvoiceDetailsData } from "../../types";
import { CheckmarkIcon } from "../icons/CheckmarkIcon";
import { activities } from "../../data/sample";
import { useSocket } from "../../socket";

interface Props {
  open: boolean;
  id: string | null;
  onClose: () => void;
}

export function InvoiceDetailsModal({ open, id, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InvoiceDetailsData | null>(null);
  const [activityFeed, setActivityFeed] = useState<Activity[]>(activities);

  const socketActivity = useSocket<Activity>("invoice:activity");

  useEffect(() => {
    if (!open || !id) return;
    setLoading(true);
    setError(null);
    fetchInvoiceDetails(id)
      .then((d) => {
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [open, id]);

  useEffect(() => {
    if (!socketActivity) return;
    setActivityFeed((prev) => {
      if (prev.some((a) => a.id === socketActivity.id)) return prev;
      return [socketActivity, ...prev];
    });
  }, [socketActivity]);

  return (
    <Modal
      open={open}
      title="Invoice details"
      onClose={onClose}
      hideHeader
      contentClassName="w-full max-w-[85vw]  max-h-[80vh] bg-white p-0 shadow-2xl rounded-[32px]"
    >
      <div className="flex max-h-[70vh] flex-col bg-white rounded-[32px] relative overflow-y-auto">
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <Spinner label="Loading invoice..." />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-2xl border border-gray-200 w-[420px] p-6 text-center">
              <h2 className="text-lg font-semibold">
                Couldn{"'"}t load invoice
              </h2>
              <p className="mt-2 text-sm text-danger">{error}</p>
              <button
                className="mt-4 rounded-full bg-[#003EFF] px-6 py-2.5 text-sm font-semibold text-white"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* Floating close button, outside the card edge like the design */}
            <button
              onClick={onClose}
              className="absolute -top-5 -right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-card focus-visible:focus-ring"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#1F1F23"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Header Section */}
            <div className="border-b border-gray-200  pt-6 pb-4 sm:pt-8 sm:pb-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-start">
                <div className="flex-1 pr-12">
                  <h1 className="text-[28px] font-bold leading-tight text-[#1F1F23] font-neue-medium">
                    Invoice - {data.invoiceNumber}
                  </h1>
                  <p className="mt-1 text-sm text-[#666F77]">
                    View the details and activity of this invoice
                  </p>
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-[24px] border border-[rgba(0,62,255,0.2)] bg-[#F2FBFF] px-4 py-2.5 text-[10px] leading-4 font-neue-medium font-medium uppercase tracking-[0.06em] text-[#003EFF]">
                      Partial Payment
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-main_blue-100 hover:bg-gray-50 transition-colors">
                    Download as PDF
                  </button>
                  <button className="rounded-full bg-main_blue-100 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#0035DD] transition-colors focus-visible:focus-ring">
                    Send Invoice
                  </button>
                  <Dropdown
                    button={
                      <span className="text-sm font-semibold uppercase tracking-wider text-[#1F1F23]">
                        More
                      </span>
                    }
                    items={[
                      {
                        id: "duplicate",
                        label: "Duplicate Invoice",
                        onSelect: () => {},
                      },
                      {
                        id: "share",
                        label: "Get sharable link",
                        onSelect: () => {},
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Reminders Section */}
            <div className="mt-6">
              <div className="box-border flex items-center gap-6 rounded-[24px] border border-[#E3E6EF] px-6 py-6">
                <span className="flex items-center text-[12px] leading-4 font-normal tracking-[0.07em] uppercase text-[#666F77]">
                  Reminders
                </span>
                <div className="flex flex-wrap items-start gap-3">
                  {[
                    { text: "14 days before due date", checked: true },
                    { text: "7 days before due date", checked: true },
                    { text: "3 days before due date", checked: true },
                    { text: "24 hrs before due date", checked: false },
                    { text: "On the due date", checked: false },
                  ].map((reminder) => (
                    <button
                      key={reminder.text}
                      type="button"
                      aria-pressed={reminder.checked}
                      className={`box-border inline-flex items-center gap-2 rounded-full text-[14px] font-medium leading-[17px] tracking-[-0.27px] px-4 py-3 transition-colors ${
                        reminder.checked
                          ? "bg-[#E6FFF0] text-[#373B47] border border-transparent"
                          : "bg-white text-[#373B47] border border-[#E3E6EF] hover:bg-gray-50"
                      }`}
                    >
                      {reminder.text}
                      {reminder.checked && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6FFF0] text-[#2DB260]">
                          <CheckmarkIcon className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col gap-6 py-6  lg:flex-row">
              {/* Left Column - Invoice Details */}
              <div className="flex-1 p-4  space-y-6 border border-gray-200 rounded-[40px] ">
                {/* Sender & Customer Section */}
                <div className="rounded-[40px] bg-[#FCDDEC] p-8 shadow-card flex flex-col">
                  <div className="flex flex-col gap-8 md:flex-row  md:items-start">
                    {/* Sender */}
                    <div className="w-full max-w-[298px] space-y-4">
                      <div className="text-[12px] leading-[15px] font-neue-medium font-medium uppercase tracking-[0.07em] text-text-body">
                        Sender
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white text-base font-neue-medium font-semibold text-[#1F1F23]">
                          {data.sender.name
                            .split(" ")
                            .map((part) => part.charAt(0))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <div className="text-[16px] font-neue-medium font-medium text-[#1F1F23]">
                            {data.sender.name}
                          </div>
                          <div className="text-[12px]  font-neue text-text-body">
                            {data.sender.phone}
                          </div>
                          <div className="text-[12px] font-neue text-text-body">
                            {data.sender.address}
                          </div>
                          <div className="text-[12px] font-neue text-text-body">
                            {data.sender.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="w-full max-w-[298px] space-y-4 md:max-w-[152px]">
                      <div className="text-[12px] leading-[15px] font-neue-medium font-medium uppercase tracking-[0.07em] text-text-body">
                        Customer
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <div className="text-[16px] font-neue-medium font-medium text-[#1F1F23]">
                          {data.customer.name}
                        </div>
                        <div className="text-[12px] leading-[15px] font-neue text-text-body">
                          {data.customer.phone}
                        </div>
                        <div className="text-[12px] leading-[19px] font-neue text-text-body">
                          {data.customer.address}
                        </div>
                        <div className="text-[12px] leading-[19px] font-neue text-text-body">
                          {data.customer.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="mt-6 flex flex-col gap-2">
                    <div className="text-[12px] leading-[15px] font-neue-medium font-medium uppercase tracking-[0.07em] text-text-body">
                      Invoice details
                    </div>
                    <div className="flex flex-wrap justify-between gap-4">
                      <div className="flex w-[120px] flex-col gap-1">
                        <span className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Invoice no
                        </span>
                        <span className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          {data.invoiceNumber}
                        </span>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <span className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Issue date
                        </span>
                        <span className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          {new Date(data.issueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <span className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Due date
                        </span>
                        <span className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          {new Date(data.dueDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <span className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Billing currency
                        </span>
                        <span className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          {data.billingCurrency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items + Totals Section */}
                <div className=" bg-white p-6 ">
                  <div className="mb-4 flex items-center gap-8">
                    <h3 className="text-base font-medium text-[#1F1F23] font-neue-medium">
                      Items
                    </h3>
                    <div className="h-px flex-1 bg-[#E1E4ED]" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <tbody>
                        {data.items.map((it, idx) => (
                          <tr key={idx} className="align-top">
                            <td className="py-2.5 pr-4">
                              <div className="text-sm font-normal font-neue  text-[#1F1F23]">
                                {it.name}
                              </div>
                              <div className="mt-1 text-xs leading-snug text-text-gray_3">
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium
                              </div>
                            </td>
                            <td className="py-2.5 pr-4 text-center align-middle text-sm text-[#1F1F23]">
                              {it.qty}
                            </td>
                            <td className="py-2.5 pr-4 text-right align-middle text-sm text-[#1F1F23]">
                              {formatCurrency(it.price)}
                            </td>
                            <td className="py-2.5 text-right align-middle text-sm font-medium text-[#1F1F23]">
                              {formatCurrency(it.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals block stacked vertically with side‑by‑side label/amount rows */}
                  <div className="mt-6 flex justify-end">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[#B7BDCF]">
                          Subtotal
                        </span>
                        <span className="text-sm font-medium text-[#1F1F23]">
                          {formatCurrency(data.subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[#B7BDCF]">
                          Discount (2.5%)
                        </span>
                        <span className="text-sm font-medium text-[#1F1F23]">
                          {formatCurrency(data.discount)}
                        </span>
                      </div>
                      <div className="pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium font-neue-medium uppercase text-[#1F1F23]">
                            Total Amount Due
                          </span>
                          <span className="text-[22px] font-bold text-[#1F1F23]">
                            {formatCurrency(data.totalDue)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information and Note */}
                <div className="grid grid-cols-1 gap-4 m">
                  {/* Payment Information */}
                  <div className="box-border flex flex-col items-start gap-2 rounded-[24px] border border-[#E3E6EF] bg-white px-6 py-4">
                    <div className="text-[12px] leading-[15px] font-neue-medium font-medium uppercase tracking-[0.07em] text-[#697598]">
                      Payment Information
                    </div>
                    {/* Details grid that wraps into a second row gracefully */}
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-3">
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Account name
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          {data.sender.name}
                        </div>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Account number
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          1234567890
                        </div>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          ACH routing no
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          021000021
                        </div>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Bank name
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          First National Bank
                        </div>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Bank address
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          123 Market Street, San Francisco, CA
                        </div>
                      </div>
                      <div className="flex w-[120px] flex-col gap-1">
                        <div className="text-[10px] leading-5 font-normal tracking-[0.08em] uppercase text-[#666F77]">
                          Account type
                        </div>
                        <div className="text-[12px] leading-5 font-neue-medium font-medium text-[#1F1F23]">
                          Checking
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F6F8FC] p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8F95A3] mb-2">
                      Note
                    </div>
                    <div className="text-sm text-[#666F77] ">{data.note}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Invoice Activity */}
              <div className="w-full flex-shrink-0 lg:w-[450px] ">
                <h3 className="text-base font-semibold text-[#1F1F23] font-neue-medium">
                  Invoice Activity
                </h3>
                <div className="mt-4 space-y-4 pr-1 lg:max-h-[calc(95vh-220px)] lg:overflow-y-auto">
                  {activityFeed.map((activity, index) => (
                    <ActivityItem
                      key={activity.id}
                      a={activity}
                      isLast={index === activityFeed.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
