import { http, HttpResponse, delay } from "msw";
import { invoiceDetails, summaries } from "../data/sample";
import type { InvoiceSummary } from "../types";

let summariesStore: InvoiceSummary[] = [...summaries];

export const handlers = [
  http.get("/api/invoices", async () => {
    await delay(600);
    return HttpResponse.json(summariesStore);
  }),
  http.get("/api/invoices/:id", async ({ params }) => {
    await delay(600);
    return HttpResponse.json({
      ...invoiceDetails,
      invoiceNumber: `${params.id}`,
    });
  }),
  http.post("/api/invoices", async ({ request }) => {
    await delay(800);
    const body = (await request.json()) as {
      invoiceNumber?: string;
      dueDate?: string;
      totalDue?: number;
    };
    const newId = String(Date.now());
    summariesStore = [
      {
        id: newId,
        number: body.invoiceNumber ?? newId,
        dueDate: body.dueDate ?? new Date().toISOString(),
        amount: body.totalDue ?? 0,
        status: "PENDING",
      },
      ...summariesStore,
    ];
    return HttpResponse.json({ id: newId });
  }),
];
